---
title: create a newsletter rss feed, bluesky rate-limit, and a caido docker setup
date: 2025-05-14
draft: true
tags:
  - newsletter
  - rss
  - docker
  - caido
  - bluesky
  - rate-limit
---
I'm *trying* to follow the [inbox zero](https://marriott.byu.edu/magazine/feature/inbox-zero) method while still staying up-to-date with what's going on with the cybersecurity world (an impossible task, but one can try). Newsletters are a slight problem... as you don't always have the time to sit down and read through it or the articles linked to from within it the minute it comes in. Generally, most emails can be addressed or scheduled to be addressed within a few minutes of receiving them, except for newsletters (in my experience), as the priority for them is rock bottom when compared to anything else you need to execute that day.

So I've been building an RSS feed instead. It contains:
- High signal personal application security blogs.
- Company-sponsored application security blogs.
- Application security write-up / news aggregators.
	- Via sites like HackerNews, Medium, Reddit, etc.

And

- **Newsletters**

That last bullet point is a little more interesting. Most of the items either already have a pre-existing RSS or Atom feed, or they could be tied in with an [RSSHub](https://rsshub.app) script. Newsletters aren't as easy, but I found a super-cool tool called [Kill The Newsletter](https://kill-the-newsletter.com). This tool provides you an email with a UUID address (`rjnvruvneuwii3j42@kill-the-newsletter.com`), and a link to an RSS feed to subscribe to, which will pass along the emails the address receives (`https://kill-the-newsletter.com/feeds/rjnvruvneuwii3j42.xml`). 

The main issues with Kill The Newsletter are:
- A public email address with an "open / public" auth-model based on holding a UUID.
- This UUID is also embedded throughout the generated RSS feed.


---

## caido with docker-compose

It's a [super easy setup](https://docs.caido.io/guides/user_guide/docker) (*honestly*), a round of applause to the Caido team for:

1. Providing such good documentation, with such an easy setup.
2. Making such a lightweight and fast application, while allowing users to a lot of great feature access **for free**!


---

## let's do it in temporal instead -- but with ai

### trying it with perplexity

Using Perplexity's Deep Research, I thought I'd give it a shot to create the workflow, end-to-end, and see how quickly I'd need to take over the reigns. Turns out -- very quick! Here's the prompt:

```
Create a golang temporal flow that gathers an rss feed from a provided GitHub URL that contains an exported OPML, parses it, gets the posts from only the previous day, and posts them one-by-one throughout the day at even timeframes to bluesky via the XRPC Atproto API. Explain each step as if you were teaching a newbie a course on temporal and the bluesky atprotocol
```

Not the best prompt ever, but not terrible. Here's the Perplexity output:

![](images/Building%20a%20Temporal%20Workflow%20in%20Go%20for%20RSS%20Feed%20Pr.pdf)

Right off the bat, it wants me to grab a library for OPML files that was last updates... 11 years ago. I'm usually not a huge critique of libraries that are feature complete and only receive an update or two a year, but man, 11 years is a *gap*. So I'm definitely not going to do that, but maybe I can still use the general outline it creates?


### trying it with amp

**TL;DR:** Amp was actually pretty great. It did make a few mistakes that made it not execute correctly, but honestly... those ones were more due to my prompt skills and knowing exactly what to ask for.

