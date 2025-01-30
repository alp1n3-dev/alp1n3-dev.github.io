---
title: "banning any ip that acts sus using a web app"
date: "2025-01-26"
tags:
    - bots
    - crawlers
    - defense
    - waf
    - scraping
draft: true
---

## ban their ip (for a bit)

Bots, crawlers, and the like the are becoming a scourge on the web. In general it can be hard to tell if an OpenAI crawler is just trying to steal to your content, or DoS your 2GB RAM Digital Ocean Droplet, let alone attempt to identify scanning infrastructure looking for a vulnerability in your app (unless it's blowing your doors down w/ injection payloads).

It's fine to enforce some rules on the server you're running. There was a popular HackerNews article the other day where a person's *entire* RSS feed was getting re-scraped 10 times a day by an overzealous RSS reading app. It ignored the 304 Not-Modified response, and then the 429 Too-Many-Requests error, so it got IP banned. **Fair enough**.

The demand for tooling to fight back against these bots scrapers is higher than ever. In July of 2024 Cloudflare [announced](https://blog.cloudflare.com/declaring-your-aindependence-block-ai-bots-scrapers-and-crawlers-with-a-single-click/) additions and changes to their tooling; `Bot Fight Mode` and `AI Scrapers and Crawlers`.

Since some of these services might not exactly be approved and are just running on IPs that are rotated around VPS services, I don't think it'd be the best idea to ban them long-term unless there's proof they're being permanently utilized maliciously. An initial IP ban of two weeks seems fair.

Below are some of my wild ideas, with potentially negative consequences for an application that I haven't considered yet, that I intend to implement in Go(lang) and test out on a public-facing server w/ no CDN.

- [x] **Phase 1:** Planning (also known as this post).
- [ ] **Phase 2:** Create a dead simple blog w/ an RSS reader that has a login page to access blog stats.
- [ ] **Phase 3:** Host it publicly with zero protections on a Digital Ocean Droplet. Log all requests & responses.
- [ ] **Phase 4:** Implement the protections via middleware. Host app publicly. Log all requests, responses, and IP bans along with their info.
- [ ] **Phase 5:** Analyze the results.

Ofc **use a WAF for a standard application** (along w/ whatever else is approved / needed for your unique situations), this is just for experimentation and is in **no way** a direct recommendation of things to implement in prod. I'm certainly not the expert in WAFs, as at this point in time I've never dug into / configured them past the "set it and forget it" portion of a previous hobby project.

The overall focus of this is more on rules that can dynamically target anomalous activity, not just grep for specific words that have been collected en masse by a business like AWS. View it as a *context-aware WAF experiment*.

> ⚠️ **Don't do this in prod plz**

### performing non-gui actions, or taking actions out of order



### accessing disallowed user ids

For this you're essentially trying to catch them either crawling random pages that come back from caches / archives / search results, or they're testing for IDOR / MFLAC vulnerabilities. **Neither is wanted**. If the userID is referenced in the URL or request body, you might have functionality that is used *only* by the user, but still references their userID, despite it being stored in something like the JWT.

For example, if a user might edit their post by sending a POST to:
```http
POST /editProfile/5598
Host: example.com
```

If the users are only supposed to have this functionality to do it to their own profile, then it'd be "pretty sus" if a request comes in with user 5598's JWT attempting to edit the profile information of user 5602.

There was an article I read a while back that mentioned how it's easier to keep the lines between these functions more easily defined on the backend by building a completely separate function instead of attempting to add an "admin-only" mode into the existing "editProfile" function. It could be something like:

- `/admin/editProfile/5598`
- `/adminEditProfile/5598`

And on. That way things like access controls and logging are clearly defined.

### modifying their jwt

Attempting to modify a JWT isn't an "oopsie" that a standard user will stumble into. I could see potentially sending an expired one, or none at all, depending on how many hops and services are between the user and the app, but modifying one? Super sus.

There's a few different types of "standard" attacks against JWTs, so I'd say it would take a few modification attempts before lowering the IP's reputation to requiring a ban. These are things like attempting to change the contents and removing / changing the signature.

In some Go walkthroughs, the normal setup for processing JWTs seems to be:

1. Verify it.
2. Extract the claims.

During *Verification* a lot of the recommended patterns I've been seeing are the EZPZ blog post type; so they verify it, and if verification fails they return a 401 Unauth error: `http.StatusUnauthorized`. Then they'll move onto looking at the claims. I'd say we can go (haha) deeper at that point and see exactly **why** it's not valid, so that we can react to that information.

The [Parse](https://pkg.go.dev/github.com/golang-jwt/jwt/v5#Parse) function from `golang-jwt` can return several different errors which can be parsed using `errors.Is`. They are:

- `jwt.ErrTokenMalformed` == Does not appear to be a parsable token.
- `jwt.ErrTokenSignatureInvalid` == Invalid signature.
- `jwt.ErrTokenExpired` & `jwt.ErrTokenNotValidYet` == Expired or not active yet.





### is missing the header that's generated client-side

Interestingly enough AWS has multiple interesting documents that are useful for this rule, and others:

- [Rate limit the requests that are missing a specific header](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rate-based-example-limit-missing-header.html).
- [Blocking requests that don't have a valid AWS WAF token](https://docs.aws.amazon.com/waf/latest/developerguide/waf-tokens-block-missing-tokens.html)
- [AWS WAF Fraud Control account creation fraud prevention (ACFP) rule group](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-acfp.html)
- [AWS WAF Bot Control rule group](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-bot.html)


### accessing post-authN pages w/o a jwt



### cycling user-agents / using a headless browser



### no / anomalous mouse movement

*Evan Winslow* from Stanford wrote a paper titled [Bot Detection via Mouse Mapping](https://cs229.stanford.edu/proj2009/Winslow.pdf) that does a great job diving into this topic.


### putting non-compliant data into parameters / sending non-existent parameters

Let's say a request to view a PDF goes to `/viewReport=8099.pdf`. Like a good application, this PDF's name is controlled by the backend. If any variation comes through, reputation points can be deducted, eventually leading to an IP ban. This could be things like:

- `/viewReport=80'99.pdf`
- `/viewReport=test8099.pdf`
- `/viewReport=8099.exe`

These requests should all be generated by the client's application in this instance, so there's no good reason that the file extension or naming convention should be tampered with.

### hitting /robots.txt then proceeding to hit disallowed pages

Let's say you've got as specific endpoint in robots.txt that is marked as disallowed. For this example, lets called it `/dont-access-you-will-be-banned`. A lot of the AI research corps that are mass-scraping content for training data to enrich their business are flagrantly ignoring robots.txt, even leveraging it to have more pages to scrape. Having an endpoint in the disallowed section of your robots.txt that is specifically and clearly marked "don't access this" and isn't used for anything legitimate in the actual application should result in an instant IP ban. This is known as a honeypot.

The other pages that are marked as disallowed but are then attempted to be accessed should result in a "ding" to their reputation score. Too many dings and the IP gets banned.

### whitelist known good user-agents instead of relying on a blocklist

Chrome, Edge, Firefox, Safari, Brave... and we've covered 95% of browsers used. Each of these has a maintained history of user-agents. This means you don't need to subscribe to 10 different OSS lists with newly updated user-agents associated with scrapers or bots, you can just whitelist the ones you want to consider friendly.

Starting out, all of them could be whitelisted back to a specific time's user-agent. If you want to dial it in, just make it only allow user-agents popularly used in the last 3-5 years. To stay up-to-date on the newest ones being utilized nefariously, log each IP that's banned along with the user-agent it uses and create a chart that shows the most popular user-agents being utilized by abusive services. Keep in mind, most tools can just set their own user-agent, so if the "attacker" has changed the defaults to a normal user-agent, this can't be relied on by itself to detect and stop them.

### add a randomized captcha, and add a captcha to intensive / sensitive functionality



### enforce a rate-limit. if it ignores the rate limit == ban



### utilize geo-ip blocking



### check if it accepts cookies

Some bots accept cookies, some don't. If the same IP is hitting your site over and over again and isn't taking the tracking cookie, ban it. Measure a timeframe of, let's say 30 seconds, and if the site gets hit more than 5 times in 30 seconds and each request is from the same IP requiring a new cookie each time, throw it into the abyss.

### requesting pages that have zero chance of existing

This gets a little more into blocking mass-scanner territory, but a lot of scanners will just blast domains with popular endpoints and hope they get lucky. For example, if you're running a React site and you get a few hits for endpoints that end in `.php`, you know they have no business being on your site, as in this example it isn't in our tech stack.

### lazy load the site's data

Doing things like waiting for the user to scroll-down, waiting for certain scripts to execute, etc. can all make fragile bots break or reveal themselves through looped requests. It can even potentially outright withhold the data if the bot never scrolls down / performs the needed action.

### put everything behind authN



### analyze anomalous data

A lot of these points can be summed up by this sections title. They're either:

1) Looking for sus actions.
2) Trying to trick them into performing sus actions.

Each site is different, and you'll understand the application's flows and normal usage patterns. Detections can be built around them. Here are some questions you can ask:

- In what order are specific endpoints in a flow supposed to be requested?
- What's the average number of times this endpoint is requested by a single user in the standard session?
- Are there any oddities in the requests from the sessions that are using the site abnormally? Extra characters, headers, newlines, leftover whitespace, etc.

### of course, you can scan for known payloads

I'm not including this though, as grep'ing against SecLists isn't productive for this experiment, as this is supposed to focus on bots, scrapers, crawlers, etc.

---



## reputation points and your waf



### how owasp coraza does it



---

## Resources & Tooling

- [Cloudflare]()
- [OWASP Coraza]()
- [Caddy]()

## References

- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
