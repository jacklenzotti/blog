---
title: "SDXL Game Sprite Generation Pipeline with LORA"
date: "2026-03-24"
excerpt: "Having a model draw bad art is hard.  Having a model copy my art is easy."
image: "/post-images/elephant.png"
draft: false
---

# SDXL Game Sprite Generation Pipeline with LORA

Stable Diffusion XL (SDXL), trained on countless amounts art scraped from the web, copied from books, and stolen from talented people is good.  Real good. Except at drawing fingers.  SDXL can create photorealistic art of almost anything assuming you have the $3000 dollars needed for enough RAM to run it.

One thing that SDXL is not good at, though, is being bad at art.  These models are optimized, at every layer, to produce beautiful output. Everything SDXL has ever learned has been about "good" art.  Realistic photos, paintings on sunsets, Dilbert.  Asking it to create "bad" art is like asking Picasso to paint with his left hand (I'm assuming he was right handed for this metaphor).  He will probably still do a pretty good job at it.

If I want it to make bad art, I do not need Picasso, I just need myself.

## The Problem With Off-the-Shelf Models

Because I am opportunistically lazy, I spent a few days prompting NanoBanana, Gemini, base SDXL, community loras/checkpoints to see what I could accomplish by speaking better words to the machine (prompt engineering).  Models really overestimate what a four year old is able to accomplish.

The model is trying to help. It has been trained to produce quality output, and it is doing exactly that. When I asked for a doodle of a cat, it gave me the best cat it could.

![Gemini's attempt at a "simple doodle of a cat"](/post-images/gemini_cat.png)

The answer was a custom LORA trained on a curated set of my own work.

## Collecting Training Data

My training set was my own artwork: 34 images (mirrored to 68 for training) drawn in Procreate, sharing a consistent aesthetic. Simple flat linework. Simple colors. Easy silhouettes. Awful line work.

Subjects were focused on animals with some simple objects like fruits, sticks, trees, etc mixed in.

![Hand-drawn monkey](/post-images/handdrawn_monkey.png)
![Hand-drawn kangaroo](/post-images/handdrawn_kangaroo.png)
![Hand-drawn bush](/post-images/handdrawn_bush.png)

## Captioning

My captions followed a template:

```
[trigger_word], [subject], [key visual properties], [style]
```

`doodlezoo, frog, a frog with round flat body, four stick legs, wide round head, two large dot eyes on top, wide mouth, creature, character, hand-drawn doodle, grayscale, top-down view, white background`

## Training with SimpleTuner

I used [SimpleTuner](https://github.com/bghira/SimpleTuner) to train the LORA as it was easy to get going on macOS and pretty simple to use. 

**LORA rank and alpha:** I settled on rank 32, alpha 16. Lower rank (8–16) underfit on this dataset as the style wouldn't hold under varied prompts. Higher rank (64+) overfit quickly. The 2:1 ratio of rank to alpha is a common heuristic that worked well here.

**Learning rate:** 1e-4 for the LORA weights, cosine schedule with warmup. Set at 5e-4 before realizing it was too aggressive.

**Training:** Checkpoints were useful here to gauge.  Found overfitting happened relatively quickly.

First training run — base model on the left, LoRA output on the right:

![Step 100 — early training](/post-images/first_lora_step_100.png)
![Step 700 — picking up the linework](/post-images/first_lora_step_700.png)
![Step 1200 — style locked in](/post-images/first_lora_step_1200.png)

After refining the captions and adding some more examples:

![Second run, step 100](/post-images/second_lora_step_100.png)
![Second run, step 1200](/post-images/second_lora_step_1200.png)
![Second run, step 2400](/post-images/second_lora_step_2400.png)

The first raw output from the LoRA:

And the final game-ready sprites:

![Elephant](/post-images/elephant.png)
![Treefrog](/post-images/treefrog.png)
![Hedgehog](/post-images/hedgehog.png)
![Crab](/post-images/crab.png)
![Greyhound](/post-images/greyhound.png)

And it accidentally made the Velvet Underground cover:

![Banana](/post-images/banana.png)
