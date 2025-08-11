---
title: xss isn't that hard
date: 2025-07-29
tags:
  - xss
  - csp
  - gadgets
  - appsec
draft: true
---
90% of XSS situations are not as hard as you think. You might be getting smacked around by the CSP, or a sanitization filter, but by taking a step back, evaluating the app as a whole, and doing some quick googling (and maybe some AI help), the solution is right around the corner. Most of the time you won't need to go the full length of chaining a ton of different gadgets in a specific way to avoid the sanitization, as those are the 10% of situations. Even with a decent CSP config, most sites are one old library away from XSS.

## start small & increase small

The first step to most XSS injections is identifying that "break" one of two areas:

1. HTML
2. JavaScript

Something along that way of your user-input being passed from the client side to wherever the sink is went "poof", and ended up with broken tags, some nonsense JavaScript, or a combo of the two (assuming you're fuzzing inputs). For example, if it's ending up in HTML tags, start out with benign items that might normally be allowed for some custom editors:

1. `<p>test1</p>`
2. `<b>test2</b>`
3. `<i>test3</i>`

From there you can begin to escalate and map out what tags are allowed, and if scripting is allowed by itself, or within HTML tags. Fully understanding your attack surface is important, because it increases your surface area for potential routes later on. It doesn't take super long either!

1. `<img src=x onerror=alert(1)/>`
2. `<script>alert(1);</script>`

I like to top all of my searches off with a polyglot anyways, because even if it doesn't find XSS, it mind create some other kind of error that leads me in a different direction. It also tends to be my main approach for inducing JS errors, which is where I found XSS via input in the JS:

```js
javascript:/*--></title></style></textarea></script></xmp> <svg/onload='+/"`/+/onmouseover=1/+/[*/[]/+alert(42);//'>
```
## don't make assumptions

If you're seeing CSP blocks, don't automatically assume it's because of your attempts. It might just be the devs' work (oops!). This saves you from wasting time attempting to bypass policies that aren't even blocking you. If you want to try to bypass a CSP, you first need to know **exactly** why it's blocking you.


## extra reading

- [jorian woltjer xss](https://book.jorianwoltjer.com/web/client-side/cross-site-scripting-xss)
- [aszx87410 xss](https://github.com/aszx87410/beyond-xss)
- [owasp cheatsheets xss filter evasion](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)