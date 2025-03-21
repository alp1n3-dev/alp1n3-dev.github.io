---
title: "micro-context mastery: advanced prompting for deep llm analysis"
date: "2025-03-09"
tags:
  - llm
  - prompt design
draft: true
---

## the (alleged) v0 leak vs. anthropic's system prompts

A few days ago the newest prompts from Vercel's v0 were apparently [leaked](https://www.reddit.com/r/nextjs/comments/1j4awn1/full_leaked_v0_by_vercel_system_prompts_100_real/), sparking discussion on social media. They are **very large** when compared to other system prompts, and I thought it'd be interesting to compare Vercel's approach vs. [Anthropic's](https://docs.anthropic.com/en/release-notes/system-prompts#feb-24th-2025).

## prompt design

### quick lessons

1. [Google's Prompt Engineering Guide](https://ai.google.dev/gemini-api/docs/prompting-intro)
2. [Anthropic's System Prompts](https://docs.anthropic.com/en/release-notes/system-prompts#feb-24th-2025)

### a looking glass into your code

Think of how a SAST scanner works, like Semgrep or CodeQL; They track the input making its way from the source to the sink. Every function it touches, every modification that occurs, is analyzed. That's the same way to optimize for feeding your code into an LLM to get a form of assistance from it. **Context windows aren't infinite**, if its fed your entire codebase, its liable to get confused (_lost in the sauce_) and from there it can go off-track and provide you with responses that range from semi-relevant to completely useless.

It needs a small window into your program, and the affected components/functions it's being asked about. This means giving it **only what's relevant**. The function itself, the structs, the desired goals, and an example input and output along with an explanation. Some of these items are more important than others depending on what you need, as fixing a specific problem may not need knowledge of the overall functionality or output struct, meaning what's _really_ relevant needs to be selectively chosen in order to keep the model on task.

Forcing yourself into the small context window also forces you to more thoroughly understand exactly what's necessary to solve the problem, which in turn creates a better prompt, or even acts as a form of rubber-duck debugging, where you may end up realizing the fix yourself just from bouncing ideas off the llm.

## repos with leaked system prompts & prompt examples
