---
title: "Automating the Edit: Pipeline Insights from Zottware and Zottfiles"
date: "2026-05-04"
excerpt: "Building a high-retention automation engine using Remotion, AI agents, and ElevenLabs."
image: "/post-images/automation-cover.png"
draft: false
tags: ["automation", "remotion", "ai", "content-strategy", "elevenlabs"]
categories: ["devlog", "insights"]
---

I've always enjoyed short-form educational content—the kind that leaves you with a concrete takeaway in a few minutes. But breaking into an increasingly saturated space required finding the right fit: testing different topics, presentation styles, and platforms to see what actually resonates.

## The Tech Stack

The core of the automation engine relies on three main pillars:

- **Remotion**: Programmatic video creation in React, allowing for dynamic layouts and data-driven animations.
- **AI Agents**: Custom LLM-based scripts that research topics, draft engaging narratives, and format metadata.
- **ElevenLabs**: High-fidelity TTS (Text-to-Speech) that provides the "voice" of the channels without the need for a recording booth.

## Performance Analysis: A Tale of Two Channels

While the pipeline is unified, the performance data shows a fascinating split in how different audiences consume automated content.

### Zottfiles: The History Engine

Zottfiles focuses on historical deep dives and archival storytelling. This format is seeing strong, consistent growth across all platforms. The retention numbers are particularly healthy, likely due to the "high-value info" nature of the content which keeps viewers through the end of the video.

![Zottfiles YouTube retention](/post-images/zottfiles_youtube_view_percent.png)

As seen in the recent stats, content like the "CIA East Berlin Spying" story is driving significant engagement, with nearly 2,000 engaged views and a solid conversion to subscribers.

![Zottfiles Facebook views](/post-images/zottfiles_facebook_views.png)

### Zottware: The Younger Demographic

Zottware, which focuses on tech-centric and "hacker-style" content, has a different footprint. While it struggles to find a foothold on long-form platforms, it has seen explosive success on TikTok. 

![Zottware YouTube overview](/post-images/zottware_youtube_overview.png)

![Zottware YouTube data](/post-images/zottware_youtube_data.png)

## Lessons from Testing

The data from the last 28 days confirms a few key theories about what works in this saturated space:

- **Retention is King**: The 80% average view duration on Zottfiles indicates that the AI-generated scripts are successfully hitting the narrative beats required to keep humans interested.
- **Platform Fit**: Automated content isn't one-size-fits-all. Zottware's "TikTok success vs. Facebook/IG struggle" proves that the edit style needs to match the platform's median age and attention span.
- **The "Staircase" Growth**: You can see clear spikes in the data corresponding to when the algorithm "picks up" a specific automated post.

## What's Next?

The next iteration of the pipeline involves tighter integration between the procedural animation techniques used in my game dev projects and the Remotion renderer. I'm looking into auto-generating more complex 3D videos leveraging game engines and code.