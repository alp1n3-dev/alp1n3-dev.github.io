---
title: "nahamcon post-ctf review: web challenges"
date: 2025-05-25
draft: false
tags:
  - ctf
  - appsec
  - web
  - nahamcon
  - nahamsec
  - ctftime
  - review
---
## overview

**Wheeeeelllp I got wrecked.**

I participated in the CTF as a part of team this time (Nc{Cat}), which was super fun, and *we* ended up getting 6th place out of 2,900 teams (which is **awesome**)! I use *we* lightly though, as out of the 14,371 points, I contributed 50 (not for a lack of trying 😂). Which means I am indeed super rusty and I need to start hitting the books in an attempt to be better prepared for the next one.

I'd eventually like to be useful in all areas, but I want to go over what I messed up or missed this time in my dedicated area: web. My main weakness seems to be leveraging exploit chains (among other things ofc).

>[!warning] This is under active development. I haven't gotten through reviewing all of them yet, but will continually update it as I do.

---

## web challenge list

- Outcast
- My Third CTF
- My Second CTF
- My First CTF
- Method in the Madness
- SNAD
- NoSequel
- Advanced Screening
- TMCB
- Infinite Queue
- Access All Areas - review
- Talk Tuah
- Fuzzies (1-5)
- The Mission (1-6)

---

## challenges
### access all areas
**Tags:** #lfi #pdf #headlesschrome #directory-traversal #log-injection
**Reviewed:** ✅
#### Solution
**Arbitrary file read via Chrome's file download mechanism.**

1. Exploit LFI to view NGINX access logs.
2. Inject malicious JavaScript.
3. Use headless Chrome's specific behavior to access system files.

The core vulnerability existed as an LFI in the log viewing functionality (`GET /api/log.php?log=../../../../var/log/nginx/access.log`). No content discovery was needed for this parameter, which I found by reviewing my Caido logs (handy since I don't have Burp Pro for personal use).

![](images/CleanShot%202025-05-26%20at%2010.39.06@2x.png)
I received nothing back for some of the requests, but at the time I was also having some stability issues with high-rate parameter fuzzing and the web server, so I had chalked it up to a failure and stopped fuzzing, when in reality it *may* have been an indicator to push forward in that direction.

Once the LFI was discovered, I would have had to discover that the next step in the chain was the access logs for NGINX. The response's list that NGINX is in use, so I should have that noted down as a potential point of interest, along with the listed version (and whether or not that version info may need to be further interrogated).

![](images/CleanShot%202025-05-26%20at%2010.41.45@2x.png)

I haven't run into log poisoning in a while, and definitely am weak when it comes to attempting to exploit live "users" / bots using the app. My preference towards fully-reproducible exploits without any variation is definitely something to be worked on as well. 

I googled "`wstg nginx log poisoning`" to see if I could find some more info on how I should remember to approach this and got a billion answers back about LFI to RCE via log poisoning... so I guess I'm a little behind on the times (😂). 

The OWASP WSTG section on [LFI](https://github.com/OWASP/www-project-web-security-testing-guide/blob/master/v41/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion.md) includes quite a few good snippets:

![](images/CleanShot%202025-05-26%20at%2010.47.52@2x.png)
- The `log` parameter was being passed the `230525.log` file when first seen.
- The response had the header `Content-Type: application/pdf` meaning it was serving a PDF file.

Fuzzing the endpoint with an LFI wordlist, such as one from [PayloadAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/File%20Inclusion/Intruders/JHADDIX_LFI.txt), would have revealed access to the necessary logging endpoint. From there the mechanism used to deliver the PDF should be looked further into. This isn't direct LFI to the ability to read any files, the PDF is being generated somehow / somewhere, and it deserves getting looked into further.

A script, like the one cooked up by another CTF participant below, will reveal that it isn't being executed from within the context of `PDF.js`. `PDFViewerApplication` appears to be specific to `PDF.js`, so it would rule out different attack vectors.

```js
<script>if(typeof PDFViewerApplication!=='undefined'){ document.write('PDFViewerApplication exists'); } else { document.write('PDFViewerApplication not found'); }</script>
```

With something as powerful as LFI, several items should always be checked for:
- the flag itself
- access to web application source code
- access to web application or reverse proxy logs
- access to other valuable files on the server

Moving on from the LFI, the attack to gain further read capabilities would have most likely gone in the direction of RCE via PHP injection into the log files, except that would fail due to it being converted by a headless chrome instance, and not just being redisplayed in the browser by the web server itself. **But since headless chrome is doing the executing and viewing the PDF, PDF's can house arbitrary JavaScript.** Normally it leads to nothing more than self-XSS, but since it's an "internal user" viewing our arbitrary code, we can force them to execute it from within their context; on the server / from within its container.

Main vectors to note for injection:
- Parameters (URL or body)
- User agents
- Other headers

Proving initial working context can be down by testing different payloads, like the one below:

```js
<script>document.write('Location: '+window.location.href+'<br>Origin: '+window.origin)</script>
```

Which will output:

```
Location: file:///tmp/06ed2dccf248f89c8a7fe0ba9b687b39.html Origin: null
```

This points out the use of the `file://` protocol, which can be leveraged. Other protocols to keep in mind though:

- `php://`
- `zip://`
- `data://`
- Both `http://` AND `https://`

Since it hands over the protocol, it can be assumed that the headless chrome is allowed to potentially call other files on the system. These requests can be generated by JS. The `Origin` being set to `null` also indicates local file system access.

HTML and JS can both be injected in an attempt to access resources in similar scenarios. These are not full payloads that will work, but the main component of how `file://` can be utilized from within them:

- `iframe src="file:///flag.txt"` (iframe)
- `object data="file:///flag.txt"` (object tag)
- `xhr.open('GET', 'file:///flag.txt', false);` (XMLHttpRequest)

If the above fail, it can point you in the right direction to try further. They may be blocked by browser security (Same-Origin, stricter `file://` security boundaries, CORS, etc.):

- `Plugin/File not found`
- `Failed to fetch`
- `Failed to execute 'send'`

Luckily headless chrome (and headless browsers in general) run with relaxed security policies. One author from a writeup noted that it was due to being specifically chrome, but I'm not 100% sure that's the case, as the exploit script they used doesn't appear to use anything chrome-specific, it just happens that headless chrome is less hardened (bypassing the Same-Origin policy):

```js
<script> var a = document.createElement('a'); a.download = 'flag.txt'; a.href = 'file:///flag.txt'; document.body.appendChild(a); a.click(); document.write('Download triggered'); </script>
```

```js
// These are blocked by Same-Origin Policy 
fetch('file:///flag.txt')           // ❌ CORS blocked 
xhr.open('GET', 'file:///flag.txt') // ❌ CORS blocked 
// Download links bypass SOP restrictions 
a.href = 'file:///flag.txt'  // ✅ Works in headless context 
a.click()                    // ✅ Triggers download
```

Overall I agreed with the author's conclusions though, and summarized them here along with my own notes:
- PDF generation (frontend or backend) **cannot** be trusted, and if one is seen in a CTF, it's an immediate cause for suspicion.
- LFI vulnerabilities can lead to arbitrary file read through many different avenues, but XSS / HTML injection is a big one if another service is involved.
- Headless browsers have different security measures than normal browsers (usually weaker).
- There are many different ways and protocols to use to make requests in HTMl / JS context. The use of these protocols can also lead to bypassing some security measures (like the web server being blocked from accessing the flag, but the headless chrome instance being allowed to access it).

Launching headless chrome with weakened security and broader access does appear to be an explicit choice though:

```bash
# Often launched with relaxed security
chromium --headless --no-sandbox --disable-web-security --allow-file-access-from-files
```

- `--no-sandbox` - The sandbox hardens the headless instance and "removes unnecessary privileges from the processes that [don't need them](https://unix.stackexchange.com/questions/68832/what-does-the-chromium-option-no-sandbox-mean)".
- `--disable-web-security` - Disables CORS.
- `--allow-file-access-from-files` - Enables access to [local files](https://chrome-allow-file-access-from-file.com).

These are all popular flags in dev configurations though, as they're most likely testing files from their own machine, with no certs, that use JavaScript, so they'd prefer a smoother / easier means of testing while developing.
#### what i've done to remedy this

- Added an LFI payload list to my personal wordlist repo. 
- Added an XSS payload list to my personal wordlist repo.
- Reviewed an article by woFF titled "[Arbitrary file read tricks with headless browsers](https://medium.com/@woff/arbitrary-file-read-tricks-with-headless-browsers-eeebc2d9e5c8)", where they go over some techniques surrounding exploiting headless browsers. (Despite the misnomer about `view-source:file:///` vs `file:///`, I live in Burp mostly, so a page *appearing* blank isn't an issue.)
- Reviewed the exploit chain step-by-step.

Shoutout to `stuub` on the NahamSec Discord for the great write-up! 🙌 It was a fun read and I enjoyed reviewing it and taking notes.

---
## general tips
### a note on taking notes...

I was pretty sloppy with these challenges. On anything else I'd keep an in-depth folder of markdown files and screenshots, along with an excel sheet if it's something like an API / super complicated. Not sure why I didn't for the CTF challenges, but it really showed when I bounced between them without being able to retain a thing. 

**TAKE NOTES**.

## track the tech stack & narrow your scope down

With some of the challenges it was hard to know exactly where to look, especially with me knowing I had limited time (could only play for 4 hours one day, 4 hours the next). Figure out the things that are definitely NOT vulnerable or meant to be targeted, and cross them off your list.

This applies to tracking the tech stack of the website and the versions it runs. If a specific piece of tech is only vulnerable to an old CVE that doesn't apply to it's current version and it has not other available exploit chains / paths, cross it off the list as well.

---
