---
title: "setting up nushell in macOS"
date: "2025-04-04"
tags:
  - terminal
  - cli
  - nushell
  - ghostty
---

**Step #1: Download & start Nushell**

```bash
# Using Brew for MacOS.
brew install nushell

# Start Nushell.
nu
```

**Step #2: Set the default editor**

```bash
# Setting it to Vim.
$env.config.buffer_editor = "vi"
```

**Step #3: Open the config then add Brew to the $PATH**

```bash
# Opens Nushell's config file.
config nu

# Add the below to the config file.
$env.config.buffer_editor = "vi"
$env.path ++= ["/opt/homebrew/bin", "/opt/homebrew/sbin"]
```

**Step #4: Set Nushell as your new shell**

```bash
# Be sure to insert your username.
sudo chsh -s /opt/homebrew/bin/fish "$USER"
```

**Step #5: Quit, then verify it works**

```bash
# Kill terminal first. Then run:
brew list
```

---

If `brew list` is working you should be all good. Double-check your other environment variables, config files, and terminal plugins for anything that may need to be brought over, like aliases.
