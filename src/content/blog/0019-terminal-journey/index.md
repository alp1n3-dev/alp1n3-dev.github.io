---
title: "iterm2 -> warp -> hyper -> ghostty && goland -> zed -> vscode"
date: "2025-02-27"
tags:
  - tools
  - cli
  - terminal
  - zed
  - ghostty
  - homebrew
---

My [ghostty](https://ghostty.org), [zed](https://zed.dev), and [homebrew](https://brew.sh) configs can be found on [GitHub](https://github.com/alp1n3-eth/configs). 

Starting with iterm2 on my old 2013 MacBook Air (4GB RAM), back then I did everything I could to avoid needing to use the terminal. I could never remember the syntax and thought it was a pain learning the tooling. Over time, I came to appreciate it though, and this last year I've really ramped up my usage of CLI tools, as the level of flexibility and utility they offer can't be beat. During my ramp-up time recently I almost fell into the rabbit hole of reproducible builds, but luckily I avoided that (😅).

I found a simplified and easy to configure terminal in Ghostty. Installing themes was easy, the documentation was great (and the settings code itself is almost self-documenting), and it's fast. With Warp, it felt too heavy. It wasn't snappy, had too much GUI crud added on, and randomly there'd seen to be new features that would get advertised to you... which is the last thing I want in a terminal.

iTerm2 and Hyper were both good (I preferred Hyper over iTerm2 though), but getting them configured was a pain / not as easy as it could be. I stayed on Hyper the longest before arriving at Ghostty upon its v1.0 release.

I also recently ended up moving to VSCode from Zed... and we'll see how long this lasts but I don't see it lasting long. Starting out with JetBrain's GoLand, I wasn't happy with how illogical and scattered the settings felt, and it almost seemed as laggy as XCode, so switching to Zed was a breath of fresh air. A little while back I wanted specific features of different extensions that Zed didn't have, and Zed's AI assistant was just... not working at all, so I popped over to VSCode.

The experience has been... not great. The settings are all over the place, some things just can't be customized, for whatever reason (like the sidebar font size). It doesn't feel snappy / smooth, and I had to change a *ton* of stuff to get it to be less insanely annoying with code completions, pop-ups blocking areas I'm trying to edit, and a ton of other items. This level of frusteration made me go back and re-look at the thing in Zed that broke for me and I actually ended up fixing it, so one thing Zed could really use is some more error messages as I was getting like zero feedback on what was wrong, the AI assistant buttons just *wouldn't work*. 

Zed, for the most part, is like Ghostty. Simple, easy to configure, and fast. They both work out-of-the-box, and only require a few tweaks if you know *exactly* what you want out of your setup.