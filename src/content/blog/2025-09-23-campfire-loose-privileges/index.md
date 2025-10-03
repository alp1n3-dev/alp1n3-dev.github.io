---
title: campfire's loose privileges
date: 2025-09-23
tags:
  - appsec
  - wapen
draft: true
---
## intro

## images can be seen by anyone (auth'd or unauth'd)

**Name:** Broken Access Control - Missing Function Level Access Control
**Severity:** Medium to High

**Description:** Any image shared in a private room can be seen by anyone with the link to the image due to the lack of access controls when viewing uploaded files. 

The site uses a randomized value in the URL that appears to be secure (I haven't looked into it). This could be comparable to a signed AWS link if there is was a reasonable expiration time for access.

![](images/CleanShot%202025-09-23%20at%2009.52.13@2x.png)
This has been evaluated as a vulnerability due to the presence of the login screen, and of the private room feature. It appears that these two intentionally placed barriers have been subverted by directly accessing the image.

**Minimally Viable HTTP Request for Success:**
```http
GET /rails/active_storage/disk/{{-ENTER-KEY-HERE-}}=--{{-ENTER-HERE--/{{-VALID-FILE-NAME-}}.{{-EXTENSION-}} HTTP/1.1
Host: thirsty_shockley.orb.local
```
*Replace the {{ bracketed }} text with valid information.*

**Results:**
![](images/CleanShot%202025-09-23%20at%2010.09.26@2x.png)

**URL Access Test Times:**
*This is to ensure it is not time-based.*
- 10 minutes - ACCESSIBLE
- 20 minutes - ACCESSIBLE
- 1 hour - ACCESSIBLE

## user enumeration via login page

**Description:** An unauthenticated user can validate what user's are currently registered with that Campfire instance because the server returns a different response size for valid vs. invalid email addresses.

