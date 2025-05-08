---
title: adding certs to macos keychain to access container apps
date: 2025-05-08
tags:
  - macos
  - keychain
  - certs
---
While messing around with the new Mac Mini I've been trying to learn more about Orbstack, Docker, Traefik, etc... It's been a little bit of a mess, but I'm getting the hang of it. One thing that needed fixing was the certs. 

I'm accessing these sites from invalid domain names, and they aren't meant to be accessible from the internet (yet), so I'm not going the Let's Encrypt route for most of them. This means they'll need to have these domains names mapped with their Tailscale IP address in your `/etc/hosts` file.

The next step is generating certs for them so that you don't get an annoying popup anytime you want to visit them. You can do this by running:

```bash
mkdir -p certs && openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -subj "/CN=< your app >.docker.localhost" -addext "subjectAltName = DNS:< your app >.docker.localhost"
```

Which will dump them in a handy `certs` folder next to your `docker-compose.yml` file. Take the produced cert.pem file and import it into your laptop's `Keychain Access`. Navigate to the new cert, then select `Trust`, then set `Always Trust` for the `When using this certificate` option.

Restart the browser for good measure, and you should be good to go (as long as your actual Docker container is configured correctly).
