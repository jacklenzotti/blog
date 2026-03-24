---
title: "Building a Sprite Generation Pipeline with LORA Fine-Tuning"
date: "2026-03-24"
excerpt: "How I trained a billion-parameter AI model to draw simple doodles — and why that's harder than it sounds."
draft: true
---

# Building a Sprite Generation Pipeline with LORA Fine-Tuning

Here's the pitch: I fine-tuned a state-of-the-art image generation model — trained on hundreds of millions of images, capable of producing photorealistic portraits and breathtaking landscapes — to draw wobbly little creatures with dot eyes and stubby legs. Like mine. Specifically, like *my* hand-drawn art.

It resisted every step of the way.

This is a post about training a custom LORA on SDXL to replicate a hand-drawn doodle style, building a ComfyUI inference pipeline, and wrangling the output into game-ready sprites. The technical parts are real. But the throughline is this: making a powerful AI model draw *badly* — or rather, draw with deliberate simplicity — is surprisingly hard work, and nobody warns you about that.

## The Problem With Off-the-Shelf Models

Before committing to training, I spent a few days prompting base SDXL and community checkpoints. The results were technically impressive and completely wrong for what I needed.

Base SDXL, when asked for a frog, will give you a frog. A *good* frog. Photorealistic. Glistening. Dimensional. The kind of frog a nature photographer would be proud of. I needed a frog with two dots for eyes and a body that looks vaguely like a circle someone drew with their non-dominant hand. These are very different frogs.

The deeper problem was consistency. Style would drift between subjects, proportions were unpredictable, and there was zero repeatability across sessions. For a game, every asset needs to feel like it came from the same world. If your frog and your mushroom look like they were drawn by different people in different decades, the whole thing falls apart.

The answer was a custom LORA fine-tuned on a curated set of my own drawings — the actual source of the style I was trying to replicate. Which meant I was about to teach a billion-parameter neural network to draw like me. For better or worse.

## Collecting Training Data

My training set was my own hand-drawn artwork: roughly 80–120 images sharing a consistent aesthetic. Simple flat linework. Limited palette. Clear silhouettes. Exaggerated, cartoonish proportions. Dot eyes. The kind of art that a child might look at and go "I could draw that" — which, honestly, is the point.

I rejected images that:
- Had complex backgrounds (the model needs to learn *style*, not "Jack draws near tables")
- Mixed rendering styles within a single image
- Had poor legibility at small sizes (these are sprites — they'll be tiny)

Once I had the set, I cropped and resized everything to 1024×1024 for SDXL.

Here's the part I found funny in retrospect: I'm using 1024×1024 resolution — the same resolution used to train models on oil paintings and studio photography — to teach an AI to replicate drawings that I made in about thirty seconds each. The infrastructure is wildly overqualified for the job. It's like hiring a Michelin-starred chef to learn your microwave burrito technique.

## Captioning

Good captions are more important than most people think. Weak captions lead to the model conflating your trigger word with unintended concepts. If you caption everything as just your trigger word, the model will absorb all the incidental details — the backgrounds, the particular way you lit something, whatever mug was on your desk — and bake them into the style concept.

I used a two-pass approach:
1. **Auto-caption** with a vision model (Florence-2 / BLIP-2) to generate a base description
2. **Manual review** to strip out irrelevant detail and inject consistent structure

My captions followed a template:

```
[trigger_word], [subject], [key visual properties], [style descriptor]
```

For example: `spritestyle, small frog character, green, round body, large eyes, flat shading, game sprite`

The auto-captions were instructive. Florence-2 would look at my drawings and describe them with complete sincerity: *"a simple cartoon illustration of a green frog with large circular eyes."* Which is accurate. But it would also sometimes add things like *"minimalist style"* or *"child-like drawing"* — the AI, bless it, had correctly identified what it was looking at.

Keeping anatomy explicit in captions is important because you want the model to learn "this is what a frog looks like in this style" rather than "whenever I see a frog I should draw it like this specific frog." The distinction matters when you start generating creatures that weren't in your training set.

## Training with SimpleTuner

I used [SimpleTuner](https://github.com/bghira/SimpleTuner) rather than Kohya's scripts. SimpleTuner has better SDXL support and more sensible defaults for LORA rank/alpha tuning. It also handles the SDXL dual-text-encoder setup correctly without manual patching.

Key config decisions:

**LORA rank and alpha:** I settled on rank 32, alpha 16. Lower rank (8–16) underfit on this dataset — the style wouldn't hold under varied prompts. Higher rank (64+) overfit quickly. The 2:1 ratio of rank to alpha is a common heuristic that worked well here.

**Learning rate:** 1e-4 for the LORA weights, cosine schedule with warmup. I burned through a couple of runs at 5e-4 before realizing it was too aggressive — the loss would crater fast but outputs were muddy.

**Steps:** ~3000 steps on 100 images. I checkpointed every 500 steps and evaluated each one.

**Batch size:** 1 on an M-series Mac (MPS backend). Gradient accumulation of 4 to simulate a larger effective batch.

There's something philosophically strange about watching a training run for a model learning your own art style. The loss curves look the same as any other fine-tuning job. The checkpointing intervals are the same. But what's actually happening is that a model is slowly internalizing *how I draw* — and it's doing so with far more computational horsepower than I've ever applied to any drawing in my life. By the end, it would draw in my style more consistently than I do. My hand is shaky. My proportions drift. The model is perfectly consistent. I've created a version of myself that's a better artist than I am, and I'm not sure how to feel about that.

### PEFT vs. Kohya Format

This one caught me off guard. SimpleTuner saves LORA weights in **PEFT format** (the HuggingFace standard), while ComfyUI expects **Kohya format**. They're structurally different — key names, how rank is stored, how the scaling factor is applied.

If you load a PEFT LORA directly into ComfyUI, it silently fails: the weights are ignored and you get pure base model outputs. The tell is that your trigger word has zero effect.

The fix: convert with the `convert_lora_to_kohya.py` script bundled with PEFT, or use the dedicated converter in Kohya's toolkit. After conversion, double-check a few key tensor names to confirm the format is right before spending GPU cycles on inference.

### MPS Numerical Stability

Running on Apple Silicon (MPS backend) introduced a subtle issue: occasional NaN loss spikes, especially early in training. The root cause is that some operations in SDXL's attention mechanism don't have numerically stable MPS implementations in older PyTorch versions.

Mitigations that helped:
- **Gradient clipping** at 1.0 (SimpleTuner flag: `--max_grad_norm 1.0`)
- **bf16 mixed precision** instead of fp16 — bf16 has a wider dynamic range and is less prone to overflow on MPS
- **Warmup steps** (100–200) to let the optimizer stabilize before the learning rate climbs

If you see NaN loss, don't just lower the learning rate — check your precision settings first.

## Overfitting Detection

In most fine-tuning contexts, overfitting means the model memorizes your training data instead of generalizing. For a style LORA, overfitting has a particular flavor: the model stops understanding the *style* and starts obsessively reproducing specific training images. You ask for a bear and get something that looks like your frog but brown.

The easiest diagnostic: **unconditional outputs** (empty prompt or negative-only). An overfit LORA bleeds the training style into unconditional generation — your training images appear even with no prompt guidance. A well-trained LORA should produce fairly generic outputs without the trigger word, and snap sharply into style when you add it.

Secondary signal: novel subjects. Show it something it never saw in training. If it draws a coherent creature in your style, good. If it draws something that suspiciously resembles the frog again, you've gone too far.

I found the 2000–2500 step checkpoint to be the sweet spot. By 3000 steps the style was starting to bleed — and because my style is deliberately simple, "overfitting" here meant the outputs were getting *too consistent*, too faithful to specific drawings. Which is a strange problem. I had to stop training before the model got too good at being me.

## ComfyUI Inference Pipeline

With a validated checkpoint, I built a ComfyUI workflow for batch generation:

1. **Load SDXL base** + converted Kohya LORA at weight 0.8–0.9
2. **Positive prompt structure:**
   ```
   spritestyle, [subject], [anatomy cues], simple background, flat shading, game sprite, clean linework
   ```
3. **Negative prompt:**
   ```
   realistic, photo, 3d render, complex background, gradient, shadow, noise, text, watermark, blurry, detailed texture
   ```
4. **Sampler:** DPM++ 2M Karras, 30 steps, CFG 7.0
5. **Resolution:** 1024×1024 for generation, then resize to target sprite size

The negative prompt is where the philosophical tension lives. Read it again: `realistic, photo, 3d render... detailed texture`. I am spending tokens — compute cycles — explicitly telling one of the most powerful image generation models available to *not be good*. To not render fur accurately. To not add depth. To resist its training.

The model wants to help. It has been trained on the entire internet's worth of beautiful images, and its deepest instinct is to produce something beautiful. I keep telling it no.

### Prompt Engineering Details

**Explicit anatomy cues.** Small sprites are unforgiving — if you don't tell the model what limbs a creature has, it'll guess. Adding `four legs, stubby tail, round head` prevents the anatomical horror that base models generate when left to their own devices at small sizes. Without guidance, SDXL will confidently invent a plausible-seeming creature and it will be wrong in specific ways that are hard to describe but immediately obvious.

**Trigger word placement.** Put the trigger word first. The text encoder attention is highest at the start of the prompt — your style identifier should be the dominant signal, not an afterthought. If you put it at the end, the model hears "frog" first and starts rendering a frog before it remembers you wanted a simple one.

**Controlling background.** Even with `simple background` in the prompt, I got inconsistent results until I added `white background, isolated subject`. The model has seen a lot of "simple backgrounds" in training — gradients, textures, soft bokeh — and its interpretation of "simple" is more generous than mine. `White background` leaves less room for interpretation. For sprite use, you want clean separation anyway; it makes masking trivial in post.

## Seed Sweeping for Variant Selection

Rather than hand-picking seeds, I automated variant generation: for each subject prompt, I'd generate 16–32 images across a range of seeds, then do a single review pass to select the best 2–3 candidates. This gave me optionality without burning time babysitting individual generations.

I wrote a small Python script that:
1. Takes a prompt and seed range as input
2. Hits the ComfyUI API (it exposes a REST interface)
3. Saves outputs in a grid image for fast review

The grid view made it obvious which seeds produced consistent anatomy and which went weird. And "weird" has a specific meaning here: weird usually means the model tried to add detail. A seed that yielded something too textured, too dimensional, too *good* — discard it. I'm looking for the seeds where the model successfully suppressed its own instincts.

## 3-Tone Cleanup Pipeline

Raw model outputs needed post-processing to become game-ready sprites. My target art style uses exactly three tones: a highlight, a midtone, and a shadow — plus transparent background. This is common in pixel/sprite aesthetics and makes assets easy to recolor at runtime.

The cleanup pipeline:

1. **Background removal** — `rembg` with the `u2net` model. Handles most sprites cleanly.
2. **Color quantization** — reduce to N colors using k-means on the pixel values (OpenCV / PIL). I found N=6–8 was a good intermediate before final reduction.
3. **3-tone reduction** — map quantized colors to the three target tones based on perceived luminance. Shadows → dark tone, midtones → mid, highlights → light.
4. **Edge cleanup** — light erosion + manual review for aliasing artifacts.
5. **Export** — PNG with transparency, power-of-two dimensions for game engine texture atlasing.

This ran as a batch script — feed it a directory of raw outputs, get a directory of cleaned sprites. The cleanup step is also doing some of the simplification work that the generation step couldn't fully achieve. The model produces outputs with some tonal variation even under heavy negative prompting; the quantization step flattens that back down to the palette I actually want. Two rounds of fighting complexity. The pipeline is thorough.

## What I'd Do Differently

**More diverse training data.** I prioritized style cohesion over subject diversity — my drawings are stylistically consistent but they're of a limited range of subjects. The LORA struggled a bit on body shapes it hadn't encountered. More varied subjects at the same style level would have helped generalization.

**Automated overfitting metrics.** I was checkpointing and manually evaluating by eye. A simple CLIP score comparing outputs to training images could have flagged style bleed automatically rather than relying on my subjective sense of "that looks too much like my frog."

**Training resolution.** 1024×1024 is SDXL's native resolution and I used it without questioning whether it made sense. For flat cartoon sprites, 512×512 would probably have been fine — and trained faster. The model's high-frequency detail machinery is genuinely overkill for dot eyes and flat fills.

## The Result

The pipeline works. New subjects take roughly 20–30 minutes end-to-end: write the prompt, sweep seeds, pick candidates, run cleanup, done. The LORA transfers the style to subjects it never saw in training, which was the real test. It's not just interpolating between training images — it's internalized the style well enough to apply it to anything.

The part I still think about: the model draws in my style more faithfully than I do. My originals have the charming inconsistency of things made by a human in a hurry. The model is perfectly consistent. Perfectly patient. It will produce my style on demand, at scale, indefinitely — and it's arguably better at it than I am.

I spent weeks convincing a state-of-the-art AI to draw simple doodles. The AI spent that time becoming the world's foremost expert on drawing simple doodles like me. We both got what we wanted, I think.

For a solo developer, the leverage is real: once the pipeline is running, the marginal cost per new asset is low enough that it changes what's possible. The upfront investment is worth it. Just be prepared for the experience of arguing with a machine that wants, sincerely, to draw you a beautiful realistic animal — and having to explain, again, that you want the dot eyes.
