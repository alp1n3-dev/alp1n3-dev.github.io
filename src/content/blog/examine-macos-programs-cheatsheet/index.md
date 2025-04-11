---
title: "examining programs on macos with nushell cheatsheet"
date: "2025-04-05"
tags:
  - malware analysis
  - reverse engineering
  - macos
  - nushell
  - troubleshooting
drafts: true
---

_I'm currently trialing Nushell, so the `err>` bit might need to be corrected for other shells._

**Delete all of the directories in `~/Library/` that have "pixelmator" in their name:**

```bash
 rg --files ~/Library/ err> /dev/null | rg 'pixelmator[^/]*' err> /dev/null
```

**Compare the hashes of three files:**

```bash
md5 'File1.dmg' 'File2.dmg' 'File3.dmg'
```

**Extract a file with 7-Zip:**

```bash
7z x 'File1.dmg'
```
