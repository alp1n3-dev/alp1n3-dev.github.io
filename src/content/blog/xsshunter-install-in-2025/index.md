---
title: xss hunter install in 2025
date: 2025-05-14
draft: true
tags:
  - homelab
  - docker
  - cloudflare
---
I'm getting some tooling setup in my `dev0` homelab environment and wanted to expose some of them publicly (*a little scary*). It's been a minute since I've had to host anything publicly that's running alongside / running on the same hardware that applications meant to be kept offline / private are, but I'm willing to give it a shot! And luckily there's nothing mission critical running on the homelab... I mean unless some hackers REALLY want to see my RSS feeds (😂).

I'm still not 100% confident in my ability with Traefik (I have yet to go through the course and docs), so I'm going to take the easy way out and use Docker + Cloudflare tunnels to point at the port. I've already tested it out by exposing my Uptime Kuma instance for a little while, and it seemed to work nicely! Cloudflare has made the setup very easy, and while my domain was purchased from Porkbun, I use Cloudflare as a [reverse proxy / DNS provider](https://developers.cloudflare.com/fundamentals/setup/manage-domains/add-site/). Here's the [official doc](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/) I followed to set up the tunnel.