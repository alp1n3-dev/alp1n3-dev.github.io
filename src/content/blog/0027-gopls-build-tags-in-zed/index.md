---
title: "fixing gopls build tags in zed for mage"
date: "2025-03-27"
tags:
  - go
  - zed
  - ide
---

## problem

On my journey of learning Go I've started to use Mage for handy things like running end-to-end tests (don't yell at me... I know), and automating the build process (including code formatting, just to make sure). I ran into the problem that `gopls` just _stops working_ if there's no correlating build tag, which is recommended to use with `gopls`.

**Example [Magefile](https://magefile.org):**

```go
//go:build mage

package main

import (
    "github.com/magefile/mage/sh"
)

// Runs go mod download and then installs the binary.
func Build() error {
    if err := sh.Run("go", "mod", "download"); err != nil {
        return err
    }
    return sh.Run("go", "install", "./...")
}
```

Kicking off the troubleshooting journey, I first made sure I was up-to-date:

```bash
brew update &&
brew upgrade
```

## solution

The update didn't fix it, but man I had some ooooolllllddd packages. It turns out this is a pretty common issue (build tags not playing nice with `gopls` by default) and requires some manual intervention. Most of the solutions I ran into when initially Googling around where centered around VSCode, but luckily I stumbled on one for [Zed](https://github.com/zed-industries/zed/issues/4660).

Opening my `settings.json` located in `~/.config/zed` I added the following entry:

```json
"lsp": {
  "gopls": {
    "initialization_options": {
      "buildFlags": ["-tags=mage"]
    }
  }
}
```

That fixed it!
