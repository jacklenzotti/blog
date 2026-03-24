---
title: "Building a Sprite Generation Pipeline with LORA Fine-Tuning"
date: "2026-03-24"
excerpt: "How I trained a custom art style LORA on SDXL using SimpleTuner, built a ComfyUI inference pipeline, and turned model outputs into game-ready sprites."
draft: true
---

# Building a Sprite Generation Pipeline with LORA Fine-Tuning

I've been working on a sprite-based game and needed a consistent, recognizable art style across hundreds of assets — creatures, objects, tiles. Hand-drawing everything wasn't on the table. So I went down the rabbit hole of fine-tuning a LORA on SDXL, building a ComfyUI inference pipeline, and writing post-processing automation to turn raw model outputs into game-ready sprites. Here's what I learned.

## The Problem With Off-the-Shelf Models

Before committing to training, I spent a few days prompting base SDXL and community checkpoints. The results were inconsistent in ways that mattered: style drift between subjects, unpredictable proportions, anatomical chaos on small sprites, and zero repeatability across sessions. Consistency is non-negotiable in a game — if your frog and your mushroom don't feel like they belong in the same world, the whole thing falls apart.

The answer was a custom LORA fine-tuned on a curated set of reference images that defined the style I was after.

## Collecting Training Data

I gathered roughly 80–120 reference images that shared a coherent aesthetic: simple flat linework, limited palette, clear silhouettes, exaggerated proportions. Quality over quantity — noisy training data is worse than less data.

I rejected images that:
- Had complex backgrounds that would confuse the model about what was "style" vs. "content"
- Mixed rendering styles within a single image
- Had poor legibility at small sizes (these are sprites — they'll be tiny)

Once I had the set, I cropped and resized everything to 1024×1024 for SDXL.

## Captioning

Good captions are more important than most people think. Weak captions lead to the model conflating your trigger word with unintended concepts — if you caption everything as just your trigger word, the model will bake in backgrounds, lighting, and incidental details you don't want.

I used a two-pass captioning approach:
1. **Auto-caption** with a vision model (Florence-2 / BLIP-2) to generate a base description
2. **Manual review** to strip out irrelevant detail and inject consistent structure

My captions followed a template:

```
[trigger_word], [subject], [key visual properties], [style descriptor]
```

For example: `spritestyle, small frog character, green, round body, large eyes, flat shading, game sprite`

Keeping subject anatomy explicit in captions helps the model learn the difference between "frog anatomy" and "spritestyle" — which matters when you're generating creatures the model has never seen in training.

## Training with SimpleTuner

I used [SimpleTuner](https://github.com/bghira/SimpleTuner) rather than Kohya's scripts. SimpleTuner has better SDXL support and more sensible defaults for LORA rank/alpha tuning. It also handles the SDXL dual-text-encoder setup correctly without manual patching.

Key config decisions:

**LORA rank and alpha:** I settled on rank 32, alpha 16. Lower rank (8–16) underfit on this dataset — the style wouldn't hold under varied prompts. Higher rank (64+) overfit quickly. The 2:1 ratio of rank to alpha is a common heuristic that worked well here.

**Learning rate:** 1e-4 for the LORA weights, cosine schedule with warmup. I burned through a couple of runs at 5e-4 before realizing it was too aggressive — the loss would crater fast but outputs were muddy.

**Steps:** ~3000 steps on 100 images. I checkpointed every 500 steps and evaluated each one.

**Batch size:** 1 on an M-series Mac (MPS backend). Gradient accumulation of 4 to simulate a larger effective batch.

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

The easiest way to spot overfitting in a style LORA: look at **unconditional outputs** (empty prompt or negative-only). An overfit LORA will "bleed" the training style into unconditional generation — you'll see your training images echoed back even with no prompt guidance. A well-trained LORA should produce fairly generic outputs without the trigger word, and snap sharply into style when you add it.

Secondary signal: check how the LORA handles subjects it never saw in training. If every animal starts looking like the same frog you overfit on, that's a problem. If novel subjects inherit the style cleanly with correct anatomy, you're in good shape.

I found the 2000–2500 step checkpoint to be the sweet spot. By 3000 steps I was starting to see style bleed.

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

### Prompt Engineering Details

A few things that made a big difference:

**Explicit anatomy cues.** Small sprites are unforgiving — if you don't tell the model what limbs a creature has, it'll guess. Adding `four legs, stubby tail, round head` prevents the anatomical horror that base models generate when left to their own devices at small sizes.

**Trigger word placement.** Put the trigger word first. The text encoder attention is highest at the start of the prompt — your style identifier should be the dominant signal, not an afterthought.

**Controlling background.** Even with `simple background` in the prompt, I got inconsistent results until I added `white background, isolated subject`. For sprite use, you want clean separation — it makes cutout/masking trivial in post.

## Seed Sweeping for Variant Selection

Rather than hand-picking seeds, I automated variant generation: for each subject prompt, I'd generate 16–32 images across a range of seeds, then do a single review pass to select the best 2–3 candidates. This gave me optionality without burning time babysitting individual generations.

I wrote a small Python script that:
1. Takes a prompt and seed range as input
2. Hits the ComfyUI API (it exposes a REST interface)
3. Saves outputs in a grid image for fast review

The grid view made it obvious which seeds produced consistent anatomy and which went weird.

## 3-Tone Cleanup Pipeline

Raw model outputs needed post-processing to become game-ready sprites. My target art style uses exactly three tones: a highlight, a midtone, and a shadow — plus transparent background. This is common in pixel/sprite aesthetics and makes assets easy to recolor at runtime.

The cleanup pipeline ran as follows:

1. **Background removal** — `rembg` with the `u2net` model. Handles most sprites cleanly.
2. **Color quantization** — reduce to N colors using k-means on the pixel values (OpenCV / PIL). I found N=6–8 was a good intermediate before final reduction.
3. **3-tone reduction** — map quantized colors to the three target tones based on perceived luminance. Shadows → dark tone, midtones → mid, highlights → light.
4. **Edge cleanup** — light erosion + manual review for aliasing artifacts.
5. **Export** — PNG with transparency, power-of-two dimensions for game engine texture atlasing.

This ran in a batch script — feed it a directory of raw outputs, get a directory of cleaned sprites. Turnaround was fast enough that the review step was the bottleneck, not processing.

## What I'd Do Differently

**More diverse training data.** I prioritized style cohesion over subject diversity, which meant the LORA struggled on certain body shapes it hadn't seen. More varied subjects — even at the same style level — would have helped generalization.

**Automated overfitting metrics.** I was checkpointing and manually evaluating. A simple CLIP score comparing outputs to training images could have flagged overfitting automatically.

**Training resolution.** I trained at 1024×1024 (full SDXL res). In retrospect, 512×512 might have been better for sprite art — the model's high-frequency detail machinery is overkill for flat cartoon assets, and lower res trains faster.

## The Result

The pipeline generates consistent, style-coherent sprites across a wide range of subjects. New creatures take about 20–30 minutes end-to-end: write the prompt, sweep seeds, pick candidates, run cleanup, done.

The LORA transferred the style robustly to subjects it had never seen in training — that was the key validation. It wasn't just memorizing the training images; it had genuinely learned the style as a generalizable concept.

Fine-tuning a custom LORA for a game art pipeline turned out to be one of the higher-leverage technical investments I've made on this project. The upfront cost is real, but the ongoing marginal cost per new asset is low enough that it changes what's possible for a solo developer.
