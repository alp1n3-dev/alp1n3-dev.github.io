---
title: "adding umami analytics to an astro github pages site"
date: "2025-02-01"
tags:
  - analytics
  - astro
  - github
---

I'm **super** new to [Astro](https://astro.build), but wanted to finally jump over to "maintaining" my own blog instead of fully relying on a platform for a CMS, domain, etc., so this has been a very fast crash course for me figuring out exactly how it works. Luckily I'm using a super sick template called [Astro Milidev](https://github.com/bartoszlenar/astro-milidev), and the creator has left some great notes for getting started.

Overall, it was super EZ to setup and only took a few hours to get used to how Astro works. The hours wasn't even necessary, but I ended up tweaking and testing some small things. One of the items I wanted was _site analytics_. Most users were recommending Google Analytics, but I'm not a Google fanboy, so I went with another option that was brought up: [Umami](https://umami.is).

The default CSP for Astro does **not** like including outside resources by default. The recommended way to include Umami is:

```html
<script
  async
  src="https://cloud.umami.is/script.js"
  data-website-id="insert id here"
></script>
```

The quick and easy way around that is to just download the hosted JS file and include it in your site, like in the `<head>`.

```bash
$ cat Head.astro

[TRUNCATED]
<script async defer data-website-id="insert id here">
  !(function () {
    "use strict";
    ((t) => {
      const {
          screen: { width: e, height: a },
          navigator: { language: r },
          location: n,
          document: i,
          history: s,
[TRUNCATED]
```

The Astro docs have a section on [loading external scripts](https://docs.astro.build/en/guides/client-side-scripts/#load-external-scripts), but it didn't work by itself. You might have better luck using the `server.headers` [config option](https://docs.astro.build/en/reference/configuration-reference/#serverheaders), but I didn't end up testing it since my problem was fixed by embedding the JS.

I'm not super happy w/ the way the headers and CSP are currently, so I'll be revisiting it soon and _hopefully_ updating this post.

Diving deeper into it, these would be the two places I'd start (along with the resources mentioned within the comments of them):

- [Reddit - How To Implement Content Security Policy (CSP) Headers For Astro](https://www.reddit.com/r/astrojs/comments/1g4o4pp/comment/lsdngi5/)
- [Reddit - Astro CSP Headers](https://www.reddit.com/r/astrojs/comments/1g4o4pp/comment/lsdngi5/)
