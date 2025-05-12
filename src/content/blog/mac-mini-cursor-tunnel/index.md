---
title: mac mini cursor tunnel
date: 2025-05-05
tags:
  - cursor
  - vscode
  - tunnel
  - macos
---
I ran into some issues:

1. Connecting to the tunnel using GitHub auth.
2. Connecting to the tunnel with Cursor.
3. Keeping the tunnel live.

Recently I started playing around with Cursor, as I thought I'd give it a shot. Since I'm going to have to use VSCode for some things, I might as well try one of the forks that just received a [NINE BILLION DOLLAR VALUATION](https://news.ycombinator.com/item?id=43895516) (*WHAT IS HAPPENING?*). 

---

## connecting to the tunnel using github auth

```bash
cursor tunnel
```

Then click on any link produced by the output and sign in with your GitHub account / select your preferred method of authentication.
## connecting to the tunnel with cursor and keeping it live

I made the mistake of thinking that the VSCode fork (Cursor) was compatible with VSCode tunnels... and I was wrong. It's a [known issue](https://github.com/getcursor/cursor/issues/1191), and the workaround is to just use Cursor to run the tunnel, not a default deployment of VSCode. 

Since I'm using it on a Mac Mini Homelab, I run it as a [service](https://code.visualstudio.com/docs/remote/tunnels#_how-can-i-ensure-i-keep-my-tunnel-running):

```bash
cursor tunnel service install
```

My backup in the case that doesn't work (for whatever reason) is:

```bash
cursor tunnel --no-sleep
```

Ensure you're running it with `cursor` instead of `code` if you are indeed using Cursor on your dev machine / laptop.

---

That's it! Hopefully it stays live. Let me know if you run into any issues or weird edge cases.
