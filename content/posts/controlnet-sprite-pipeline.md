---
title: "What Makes a Cow"
date: "2026-03-26"
excerpt: "Probably having four legs."
image: "/post-images/7legcow.png"
draft: false
tags: ["stable-diffusion", "controlnet", "comfyui", "godot", "gamedev", "lora"]
categories: ["devlog"]
---

# What Makes a Cow

Our LoRA has some winners.  It also thinks cows have five legs.  The style is holding across a wide variety of creatures and environments but the model has opinions about animal anatomy that don't match reality.

![A seven legged cow](/post-images/7legcow.png)

The other problem is post-processing.  After trying a few methods to enforce specific hex colors, I've decided that sampling the image for colors outside of our black ink strokes, and removing them all for a transparent background is most consistent.  Shaders can address color later.

## ControlNet for Structure

The LoRA doesn't know how many legs a cow should have.  That structural knowledge lives in the base SDXL model, and fine-tuning for style partially overwrites it.

ControlNet lets you condition generation on a reference image.  Feed it a stick figure with four legs, it generates a doodle with four legs.

Using `controlnet_union_promax.safetensors` with scribble conditioning, I drew crude stick-figure templates per archetype.  A quadruped is four lines, a rectangle, and a circle.  Six templates cover the majority of creatures because the LoRA and prompt handle species details.

## Strength Matters

At 0.5, the cow had four legs but lost its cow-ness.

At 0.3, the cow-ness came back.  Structure was still better than no ControlNet, but the model had freedom to add spots, ears, and whatever else makes a cow a cow.

![Comparison of ControlNet strengths](/post-images/cow-comparison.png)

## Not Everything Needs a Skeleton

The LoRA already draws amorphous creatures well.  Forcing a structural template on a jellyfish is fighting millions of years of evolution.

ControlNet is opt-in per archetype.  Quadrupeds, bipeds, insects get templates.  Fish, invertebrates, and blobs of jelly are skipped.

## What Stuck

**Archetype templates, not per-creature.**  One quadruped template works for wolves and cows.

**Anatomy in the prompt.**  "Four legs, two ears, one tail" alongside "thick black outlines, white background."

**Fix post-processing**  Better pixel manipulation beats fancier generation tools.

![A cowish cow](/post-images/cowish-cow.png)
