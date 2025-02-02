---
title: "0000 - fedora moves forward with forgejo as its new forge"
date: "2025-01-31"
tags:
  - linux
  - forge
---

In the Fedora [project discussion](https://discussion.fedoraproject.org/t/fedora-moves-towards-forgejo/139114/9) it looks like they're [moving forward](https://communityblog.fedoraproject.org/fedora-chooses-forgejo/) with [Forgejo](https://forgejo.org) as their new forge. Forgejo is a fork of Gitea and is **dead easy** to host, especially with Docker.

> The Fedora Council is pleased to announce that we have chosen Forgejo as the replacement for our git forge! That means you’ll see Forgejo powering our package sources (src.fedoraproject.org) as well as our general git forge (what pagure.io is today). It has been a long road to get here, and we cannot thank the Fedora community enough for your patience and support throughout.

I've personally never used a different forge than GitHub, setting it up and checking the UI and options out was a great experience as it is extremely intuitive to use and doesn't hog too much of the system's resources (_running in Docker on an M1 MacBook Air_). You can find the documentation link in its repo on [CodeBerg](https://codeberg.org/forgejo/forgejo), and the install instructions boil down to:

```bash
docker pull codeberg.org/forgejo/forgejo:10
```

Make sure to choose SQLite unless you have a db ready to go! It's written in Go too, which is pretty cool -- I've spent some time going through the code and it's been a great learning opportunity.
