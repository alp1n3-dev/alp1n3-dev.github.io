---
title: "do what i mean (dwim)"
date: "2025-03-04"
tags:
  - tools
  - cli
  - cast
---

Reading through the amazing resource known as the [CLI Guidelines](https://clig.dev) there was a link to a [post](http://www.catb.org/~esr/jargon/html/D/DWIM.html) titled "DWIM", short for "Do What I Mean". It's fun to reflect on how far the CLI has come in some ways, and how easy it is to potentially nuke your computer with it at the same time. I had a similar incident to the hacker in the story, where I accidentally formatted an entire drive while trying to recover backups from a completely separate one (_I'd blame myself more for user error on that one though_).

> In one notorious incident, Warren added a DWIM feature to the command interpreter used at Xerox PARC. One day another hacker there typed `delete _$` to free up some disk space. (The editor there named backup files by appending `$` to the original file name, so he was trying to delete any backup files left over from old editing sessions.) It happened that there weren't any editor backup files, so DWIM helpfully reported `\_$ not found, assuming you meant 'delete \*'`. **It then started to delete all the files on the disk!** The hacker managed to stop it with a Vulcan nerve pinch after only a half dozen or so files were lost.

> The disgruntled victim later said he had been sorely tempted to go to Warren's office, tie Warren down in his chair in front of his workstation, and then type delete \*$ twice.

---

It's definitely made me reflect more about building `cast` to be more human-centric, usable, and provide helpful (but limited) information to the user. Fuzz testing it in-depth to ensure no edge-case errors slip out is 100% a priority in order to make sure that users have no confusion surrounding any errors that crop up.
