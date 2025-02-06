---
title: "malicious iphone app scans your photo library for crypto recovery phrases"
date: "2025-02-06"
tags:
  - apple
  - ios
  - malware
  - crypto
  - mobile
---

A recent [article](https://9to5mac.com/2025/02/05/iphone-apps-on-app-store-malware-reads-screenshots/) from 9To5Mac covers a [report](https://securelist.com/sparkcat-stealer-in-app-store-and-google-play-2/115385/) from Kaspersky researchers that identified malicious apps in _both_ the Google Play and App Store, therefore impacting both Android and iPhone devices.

The iPhone app uses OCR to scan screenshots from the phone's photos library. My immediate question was "does this only affect users who grant the app full access to their photos?", as it would be pretty crazy to see a bypass to that blown for something so simple. Skimming through the report (most of it was about the Android version), I couldn't see a mention of it, but it did mention the hide-in-plain-site nature of it to assist in passing the app store review and the user's trust. If photos are utilized or meant to be taken by the app, it's not a reach to say most users would be fine allowing it full access to their photo library.

Once identified, the app will retrieve the photo and send it to the attacker's C2 server.
Kaspersky found that the malware communicated using a protocol implementation in Rust that they didn't recognize, which is interesting as back in 2024 I ran into a MacOS malware that was a **very strange** Rust / CPython combination, and I ended up giving up on it (I'm a hack @ reverse engineering).

I'll end this with ways to _most likely_ stay safe, since there doesn't seem to be too much information other than Kaspersky's report:

- Don't store seed phrases / recovery codes as a screenshot
  - This applies to recovery phrases for things like 2FA apps and password managers
- Don't download random apps.
- Restrict the permissions of the apps you do download.
  - Don't allow full access to the photos library, don't allow access to contacts, etc.

Past those things, there isn't a whole lot a person can do to combat against malicious apps existing in the app store other than staying vigilant.
