---
title: "Making Doodles Walk: Auto-Segmentation and Rigging for 2D Sprites"
date: "2026-03-24"
excerpt: "I spent weeks convincing an AI to draw simple doodles. Then I tried to make those doodles walk. This was a different kind of mistake."
draft: true
tags: ["gamedev", "animation", "ai", "pipeline", "indie"]
categories: ["devlog"]
---

# Making Doodles Walk: Auto-Segmentation and Rigging for 2D Sprites

So you've got your sprites. Flat, clean, three-tone, game-ready. The AI pipeline worked. You're holding a folder full of wobbly cartoon creatures with dot eyes and stubby legs, and they look pretty good. You let yourself feel briefly accomplished.

Then you remember they need to move.

This is the part nobody mentions when they're talking about procedural asset generation: generation is just step one. Making a static sprite feel alive is its own entire problem, with its own failure modes and its own flavor of arguing with software. The sprites don't animate themselves. Every little lumpy creature needs a walk cycle, an idle bounce, an attack wind-up. And the question is: how do you get from a flat PNG to a creature that can strut across a screen?

The honest answer is that I tried three or four different approaches before landing on something workable, and each approach taught me something I should probably have known going in. This is a post about that education.

## The Starting Point: Flat Images With an Opinion

My sprites came out of the generation pipeline as PNGs on transparent backgrounds. Three tones, clean edges, no internal structure that the computer knows about. To a game engine, these are just colored pixels — there's no concept of "the left leg" or "the head." That's a human reading. The machine sees a blob.

For simple animations — a whole-body hop, a spin, a squash-and-stretch — this is fine. You can animate the entire sprite as a single unit and get a lot of mileage out of it. I did this first, and it works better than you'd expect. A good bounce easing curve on a flat sprite reads surprisingly well, especially when the art is already simple enough that the viewer is filling in a lot of the detail themselves.

But some animations require parts to move independently. A walk cycle needs the legs to do different things than the body. An attack needs the arm to extend. You can fake some of this with whole-sprite tricks, but at some point you're doing more work to avoid the real problem than you would spend just solving it.

The real problem is: you need to cut the sprite into parts.

## The Naive Approach: Do It by Hand

My first instinct was to just open each sprite in Procreate, manually mask out the pieces — body, head, left arm, right arm, left leg, right leg — export them as separate layers, and call it done. For a small number of sprites, this is actually fine. You know what the parts are. You can see them. You have fine motor control. The work is tedious but not hard.

I made it through about six sprites before doing the math on how many total characters I needed and closing Procreate.

The problem with manual segmentation isn't that it's hard — it's that it scales terribly. Every new character is another hour of careful masking. Every revision to the base sprite means redoing the masks. The workflow I was building required a lot of sprites, and the vision of sitting down to mask several dozen cartoon creatures was not one I could sustain through sheer discipline.

There had to be a better way, which meant I was about to go down another rabbit hole.

## Enter SAM2

SAM2 — Meta's Segment Anything Model 2 — is a vision model that does automatic segmentation. You give it an image and it identifies distinct objects or regions within it. You can prompt it with point clicks ("segment the thing at this coordinate") or bounding boxes, or run it in automatic mode and let it find segments on its own.

The pitch was compelling: click on the head, get a mask. Click on the leg, get another mask. A few clicks per sprite instead of an hour of manual masking.

Here's where the particular absurdity of this project reveals itself: I spent weeks teaching an AI to draw simple, flat, limited-palette doodles — specifically optimized for clarity and clean separation — and now I was deploying a different AI to figure out where the parts were in those doodles. The simplicity I'd worked so hard to achieve was about to be SAM2's problem to interpret.

SAM2 is very good at segmenting realistic images. Photographs. Complex scenes. Things with texture gradients and shadow depth that tell the model "this surface ends here and a different surface begins." My sprites have essentially none of those cues. Three tones. Hard edges. No shadow information. The model has to reason about shape and contour alone.

The results were instructive. SAM2 in auto mode on a typical cartoon creature would identify the background (correct), the body (correct), and then make some increasingly creative decisions about what constituted a "part." It would confidently separate the left side of a creature from the right side along some internal line that made sense to it but not to me. It would sometimes segment individual dots of the eyes as their own regions. It would occasionally decide that the whole lower body was one segment and the whole upper body was another, which is a reasonable take but not quite what I was after.

Point-click prompting worked better. Clicking on the head would reliably extract the head. Clicking on a leg got the leg, usually. The quality was high enough to be useful — the masks were clean and the edges held up at game resolution.

But "better" still meant clicking on every part of every sprite. For ten creatures, that's manageable. For significantly more, you're back in "scales terribly" territory, just at a different rate. I'd traded an hour per sprite for fifteen minutes per sprite, which is an improvement but not the leverage I was looking for.

What actually helped was realizing that my sprites had more structure than a random image: they were all variations on the same anatomical template. Same general layout, same number of parts, same rough proportions. Which meant I could use a few well-annotated examples to inform how the rest should be segmented.

## The Semi-Automated Pipeline

What I ended up with was less "fully automatic" and more "semi-supervised with good tooling." The workflow:

1. **Cluster by body type.** Sort sprites by rough anatomy (quadrupeds together, bipeds together, etc.). Characters with the same general build can share a segmentation strategy.

2. **Annotate one example per cluster.** For a quadruped, manually define the six or seven parts once, carefully. This is the annotation investment — do it once, do it well.

3. **Propagate with SAM2.** Use the annotated example as a reference to guide segmentation of the rest of the cluster. For sprites that are stylistically consistent (mine are, by construction), the model transfers well. This is closer to SAM2's intended use case and the results were much more reliable.

4. **Review and fix.** Go through the outputs at 3x–4x zoom and fix any masks that went wrong. The failure modes were predictable enough that I could scan fast — mostly at limb junctions, where the model sometimes wasn't sure where a body ended and a leg began.

5. **Export as layered PNG or sprite sheets.** Each segment gets its own layer, named, in a consistent hierarchy.

For a creature with six parts, the total time after the initial cluster annotation dropped to two or three minutes per sprite. That's the leverage I needed.

## Rigging: The Part Where I Argued With Coordinate Systems

With segmented parts in hand, the next step was rigging — defining the bones, joints, and pivot points that control how parts move relative to each other. This is where animation actually happens: you position the bones, set keyframes, and the parts move in a way that (ideally) looks like your creature is alive.

I want to say clearly that I went into this part with confidence, and I want that on record so the next section lands appropriately.

2D rigging for sprite-based characters is conceptually simple. You define a skeleton — a hierarchy of bones, where each bone transforms its children. Attach parts to bones. Animate the bones. The body rotates at the hip, the leg follows, the foot pivots at its own joint. This is well-trodden ground. There are established tools. There are tutorials. I had done some of this before.

The first thing I encountered was pivot point hell. In 2D character rigs, the pivot point of each part needs to be at the joint — the shoulder, the hip, the knee. If the pivot is in the center of the sprite, the part rotates around its middle, which looks like a spinning rectangle instead of an arm swinging at the shoulder. Every part. Every joint. Placed by hand, in pixel coordinates.

With stylized cartoon art, this is trickier than it sounds. Where exactly is the shoulder of a creature that has a round body that sort of merges into its stubby arms with no clear anatomical separation? Where is the knee of a leg that's essentially a rectangle? The art that was so deliberately vague and simple during generation becomes a liability when you need to define exact articulation points. The dot eyes don't help you figure out where the neck is. They just look at you.

I spent more time than I'd like to admit placing pivot points.

The second thing I encountered was that my generated sprites, consistent as they are, still had enough variation between characters that a rig template I built for one character didn't directly transfer to the next. The proportions were similar but not identical. The arm of character B was longer than character A's. The head sat differently on the neck. Each rig needed individual adjustment.

This is solvable — you parameterize the rig and adjust the parameters per character rather than rebuilding from scratch. But it requires building the rig with that flexibility in mind from the beginning, which I didn't do for the first few characters, because I didn't know I'd need it.

The lesson I keep relearning in this project: the upfront investment in doing it right is almost always less than the eventual cost of doing it over.

## Walk Cycles: Comedy in Motion

Here's the thing about walk cycles for cartoon creatures: they're supposed to look funny. The whole aesthetic is loose and bouncy. Exaggerated timing. Secondary motion on every part. The Looney Tunes-style anticipation before an action, the overshoot on the landing. This style of animation is actually more forgiving than realistic animation — imprecision reads as charm rather than error.

In practice, though, creating a walk cycle for a creature with stubby dot-leg appendages requires making some decisions about biomechanics that I was not prepared for. Does the frog hop or stride? Does the four-legged thing do a trot or a diagonal gait? These are real questions that real animators know the answers to, and I am not a real animator.

I did what I always do when I lack expertise: I watched a lot of reference. Animal locomotion. Cartoon locomotion. Specifically cartoon versions of animal locomotion. The answer, I found, is that cartoon creatures often walk in a way that is anatomically impossible but emotionally correct. The frog's legs do something that no frog has ever done, but it reads as a frog walking because the timing and weight feel right.

"Timing and weight feel right" turned out to be the whole job. Everything else — the specific arc of the limb, the exact pixel offset on the bounce — was in service of convincing you that this little animated pixel blob had weight. That it was somewhere. That it existed in a physics.

Getting that feeling right on a character that was explicitly designed to be as simple as possible is its own kind of challenge. There's not much to work with. The silhouette is minimal. The parts are small. But it also means the animation can be minimal — a subtle read on a detailed character requires fine-grained movement, but a simple doodle conveys weight with just the bounce timing and a bit of squash on the landing. The simplicity I'd built into the sprites turned out to be an asset in animation, not a liability. Simple characters are forgiving. Every bounce reads clearly.

## What I'd Do Differently

**Design for rigging from the start.** The sprites look fine for static use, but I didn't think about joint placement when I was training the LORA or prompting for characters. A few small changes to the style — slightly more separation between body and limbs, clearer joint anatomy — would have made the rigging substantially easier. The generation pipeline and the rigging pipeline are not independent problems. Each should inform the other.

**Automate pivot point placement.** There are pose estimation models (OpenPose, MediaPipe) that can identify anatomical landmarks on simplified cartoon figures. I used my eyes and a lot of clicking. With some work, the landmark detection could seed the pivot points automatically and leave me with fine-tuning rather than ground-up placement. I know this now.

**Template rigs earlier.** My third character got a proper parameterized rig template. The first two have their own rigs that I'll eventually rebuild. The marginal time to do it right on character three versus just "fast" was maybe thirty minutes. The time I'll spend fixing the first two is more than that. The math is obvious in retrospect.

## Where It Landed

The pipeline works. Flat generated sprites go in, animated characters come out. The walk cycles are bouncy and unrealistic in a way that suits the art style. The characters feel like they belong in the same world, which was the whole goal — consistent style, consistent movement, consistent feel.

There's something gratifying about seeing a creature you drew (or, accurately: that an AI drew in a style you defined) actually walk somewhere. It has weight. It has personality. The dot eyes convey more expression in motion than they ever did in a still frame, because animation is interpretation — the timing of the bounce tells you how the character feels about where it's going.

The other thing I'll note: the debugging of animation problems is qualitative in a way that code debugging isn't. When a test fails, there's a stack trace. When a walk cycle feels wrong, you stare at it and say "something is off with the hip." Finding "something is off with the hip" is its own investigation, and the investigation tools are your eyes, your sense of timing, and a frame-by-frame scrubber.

I'm not sure which is harder. They're hard in different directions.

The creatures walk now. Next problem.
