---
title: "why i switched to go"
date: "2025-02-15"
tags:
  - go
  - python
  - opinion
---

[< _insert relevant xkcd comic here_ >](https://xkcd.com/1987/)

**TL;DR:** I switched because it's simple and compiles cross-platform easily. It uses less "magic" and it's pretty clear what something is doing, even for a newbie.

`Python` libraries, tooling, virtual environments, and the syntax itself felt like a mess. Going through college we mainly were using `C` then `C++`, but dipped our toes in the water with some `PHP` as well. `PHP` was definitely different than `C`, but they still shared _some_ things that at least felt semi-familiar / logical. Things where they just **worked**, without having to do some special configuration or add a specific function at the end of your file.

I created a few projects in college and modified some preexisting tools that were written in `Python`, but it was never a simple 0 -> 1 when it came to architecture, functions, and getting things to do what I wanted. With `Go`, I can make a lot of assumptions, and most of them are correct. The packages handle things as expected, there isn't some weird environment I have to screw with that breaks, and I haven't run into any packages that are meant to work cross-platform that run into issues when being run on Windows (even though I mainly use a Mac).

I'm 100% not even that good of a `Go` programmer, but each new topic and package I dive into just _clicks_ without too much effort, whereas with `Python` something could break due to what felt like a billion different reasons and it would take forever to track down. Everything from testing, to interacting with HTTP, to building an API, seems way more straightforward and standardized.

Of course this is my opinion and the tool should be used for the job. `Python` might click for others, and `Go` might not click for those same people -- which is totally fine! And I wouldn't imagine trying to write an ML/data-heavy app that relies on special GPUs and drivers in `Go` anyways. I think `Python` was a great intro to simpler programming, and `Go` sealed the deal for me. Even though this statement isn't fully accurate, I feel like `Go` took the parts of `C` that I enjoyed and made them a little simpler (especially concerning garbage collection).
