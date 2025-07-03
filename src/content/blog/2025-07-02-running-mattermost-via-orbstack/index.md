---
title: running mattermost via orbstack
date: 2025-07-02
tags:
  - docker
  - orbstack
  - containers
draft: false
---
I've been experimenting further with looking into recent [Go CVEs](https://pkg.go.dev/vuln/list) and had seen several across the last few months coming out of the [Mattermost repo](https://github.com/mattermost/mattermost). The Docker compose setup wasn't as plug-and-play as I've run into in the past, so some items had to be done differently as I was setting it up on an Intel Mac Mini. As a warning for those with M1 Macs -- it doesn't have a Docker image, so you'd have to build it yourself.

---

The two most helpful items I found are below:
- [Podman Mattermost Problems](https://forum.mattermost.com/t/install-via-docker-error-failed-to-load-configuration-could-not-create-config-file-open-mattermost-config-config-json-permission-denied/17810/3)
- [Orbstack UID](https://github.com/orbstack/orbstack/issues/427)

From the first link, I made the suggested edits to the two `security_opt` sections within the `.yml`, and noted the `chown` problem he was looking into. He ran specific Podman commands that aren't a 1:1 fit for Orbstack, which is what led me to the second URL. Apparently UID 501 is the "first created interactive user", which is also normally the admin user, on a Mac. So I used that to replace the `2000` value located within the recommended commands for the [Mattermost Docker setup](https://docs.mattermost.com/deploy/server/deploy-containers.html).

```bash
mkdir -p ./volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes}

sudo chown -R 501:501 ./volumes/app/mattermost
```

After that, I spun it up and didn't run into any further issues with the container crashing immediately due to permission issues. 

Who knows if there will be further fallout from the changes, but if I run into anything I'll come back here and update the post.

