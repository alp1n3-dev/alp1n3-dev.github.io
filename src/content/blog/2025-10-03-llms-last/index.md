---
title: llms last
date: 2025-10-03
tags:
  - appsec
  - llm
  - ai
draft: false
---
I've seen more and more people recently going *straight* to LLMs for their answers, instead of just troubleshooting and Googling like the standard person would a year or two ago. The three biggest problems with this are:

1. Hallucinations
2. Edge Cases
3. Context Windows

I use "edge cases" pretty loosely here, as it refers more to cases that aren't the most popular. This may be a fix that's needed 1% of the time... or 40% of the time. If your problem is slightly less popular than the main answer it comes up with via its training data or from retrieving search results online, then you may continue to go deeply into a troubleshooting path that becomes more and more obscure with each response to the LLM. 

Since you're asking the LLM for help still at this depth of questioning, it generally means you aren't familiar with the topic at hand, so you don't know how deep you are, what the changes it's telling you to do **actually do**, and some things that the LLM tells you to do may not be easily reversible. Whether it's to a codebase or a server config, running blind is not recommended.

These all kind of go hand-in-hand. Hallucinations can be kicked up at any time, but I've noticed that the more of an edge-case your problem is, hallucinations begin to appear earlier in the conversation. A similar thing occurs with context windows; the longer the conversation, the more likely hallucinations start cropping up.

---

I say this all as someone whose been testing the tooling, chat apps, CLIs, local micro LLMs, etc. for a while now for my own personal projects. These usually are in areas like web app security, malware analysis, and devops. If I had instead run to the documentation and just buckled down on thoroughly reading it, I'd have spent 1 hours reading the documentation or other people's results and understanding the fix, instead of 2 hours troubleshooting with an LLM and just *maybe* finally having a fix that I don't understand.

**Save your time, RTFM, and don't be afraid to search for the necessary answer.**

