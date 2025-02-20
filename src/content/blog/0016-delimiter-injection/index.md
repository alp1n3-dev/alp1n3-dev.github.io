---
title: "delimiter injection"
date: "2025-02-16"
tags:
  - wapen
  - injection
draft: true
---

I was doing a PentesterLab challenge recently and ran into a source code review challenge that involved a delimiter injection vulnerability. Coming from the black / grey box side of things, it's not one that I normally run into, as unless the app is returning way too much data it could be easy to mistake as another vulnerability based on the situation, so I wanted to dive a little deeper into it.

The basic overview of delimiter injection is that
