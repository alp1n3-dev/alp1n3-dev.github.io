---
title: "hunting for cves: just getting started"
date: "2025-04-23"
tags:
  - cve
  - methodology
  - bug-bounty
draft: true
---

## learn the hard way first

After my recent success submitting my first **public** vulnerability report (IDOR via pharmacy revealing patient records), I wanted to dive into hunting for CVEs in OSS projects. Up to this point, I'm used to a _much_ smaller scope, so I wasn't quite sure where to get started. So when I don't know exactly where to start, I slam my head against a wall for a little while to identify my vulnerable areas, then punch down into the revealed issues. In this instance, I spun up an instance of Forgejo and attempted file upload bypasses, 2FA bypasses, etc. and didn't have much luck. My end goal is to get a CVE in either a `go` package or application.

## what defines a cve?

Bypasses, injections, logic manipulation, breaking the guardrails, account takeovers, improper filtering or path normalization, etc. The list can go on and on. A good way to think about a lot of them is to ask the question: "Is it supposed to do that?". If the answer is "_no_", then you've probably got something to work with. **This usually involves deeply knowing the project and how the web works.**

## keep up to date on CVEs and just read, read, read

**CVE Sources:**

- [OSV](https://osv.dev/)
- [VulDB](https://vuldb.com)
-

Also, **make sure to find out how you'd** replicate the process. It's totally fine to not be grabbing a CVE every day/week/month, but when you're reading about them make sure to reverse engineer the PoC and create your own methodology on how you'd find or recognize those kinds of issues going forwards. No one can keep it all in their head, so note it down (that's why I have this GitHub pages blog).

## what's next

### finding projects you like

It's as simple as that. Look for OSS projects that you enjoy and/or use, and get a big list of them. Go to GitHub Advanced Search, pick a language you're familiar with (if you want a whitebox advantage, filter the stars between `2,000` to `40,000` (or lower to around `25,000`), and start jotting interesting projects down. You don't have to restrict yourself to _only_ OSS projects on GitHub though. Here's my list:

- Pocketbase
- Forgejo
- [Memos](https://github.com/usememos/memos)
- [Photoprism](https://github.com/photoprism/photoprism)
- [Glance](https://github.com/glanceapp/glance)
- [Transfer.sh](https://github.com/dutchcoders/transfer.sh)
- [Apache Answer](https://github.com/apache/answer)
- [Neosync](https://github.com/nucleuscloud/neosync)
- [planka](https://github.com/plankanban/planka)

Vulnerabilities can found anywhere, but I'm more comfortable doing it black-box, as I have a specific process, versus white-box, where I'm still developing that process. So each of the above projects are web apps that can be hosted locally via `docker`, or _should_ be easy to spin-up from a command. I'm sticking with simpler tools / releases as I really don't feel like fighting with infra at the moment (😂).

I do want to note that some tools have updates that won't have been applied to their docker containers yet, so make sure you test any vulnerability you find in both the docker container, and the latest experimental build, to ensure it hasn't already been patched. You can usually find instructions on how to build and run the application on your own machine, similar to [these docs](https://www.usememos.com/docs/contribution/development) for the memos app. If it's too much of a pain / very involved and you can't find any duplicate issues mentioning the vulnerability, I'd say to just go ahead and submit it.

### fork & run tools

I wouldn't want to let any easy low-hanging fruit by, so double-checking doesn't hurt. It also allows you to quickly become more familiar with their codebases and the potential package issues, sources/sinks, etc.

- semgrep (connect the forked repo via the web ui / cli tool)
- snyk (connect the forked repo via the snyk web ui)
- codeql (done via the forked repo in github)
- [trufflehog](https://github.com/trufflesecurity/trufflehog)
- [gitleaks](https://github.com/gitleaks/gitleaks)
- [grype](https://github.com/anchore/grype)

This can all probably be automated via a script later on, so I'll look into hooking them all up. Maybe via `n8n` would be the easiest option...

### check for pre-existing cves

The project should at least have 1 or 2 acknowledged CVEs. This is a good jumping point and shows that they respond to vulnerability disclosures, and also allows you to see if there can be a bypass found to the fixes that they implemented.

### read through their docs and api info

### use the app as different roles

This is to fully understand exactly what the purpose of the app is, the different functions it offers users, and the guardrails it has in place. Bypassing / abusing those guardrails almost always will mean a CVE-worthy vulnerability, even if it's a low.

### watch the app's traffic

See what libraries it uses, what is going on in the HTTP requests, what its JavaScript contains, etc.

### attack it

Fuzz, manipulate application logic, and use requests out of order and for things you shouldn't have access to. It's essentially a blackbox test at this point, so just go for it. A good jumping point methodology-wise if you don't have your own custom flow is to follow OWASP's Web Security Testing Guide (WSTG).

### vulnerability found

#### document your finding(s)

#### create a proof-of-concept and detection rules

**Detection Rule Mediums:**

- Nuclei Template
- Burp Suite BCheck

#### submit it to the responsible party

This might be:

- The project's author
- A specific email address listed in the project's repo (might involve PGP)
- DM via social media

### post-disclosure

Once the fix has been published and a CVE is assigned, feel free to post about it online to your blog, LinkedIn, or GitHub. Ensure the project knows you'll be doing this, as they may want to ensure there has been time for the fix to be published and implemented.

## case study - recent mattermost cves

## dupes will happen & rome wasn't built in a day

While writing this post and searching for my first CVE in `memo`, I _technically_ found one. It involved reading comments that are set to `private` as a user who didn't own the comment, and I thought I'd struck gold (despite it being low/medium severity). But alas, I went to the issues section to double-check and someone had filed it as a [bug](https://github.com/usememos/memos/issues/4622) two weeks beforehand (kudos to them!). Dupes happen, just keep going and forget about them. If it's been patched, ensure that the patch holds up and that a bypass isn't available.

In the [fix](https://github.com/usememos/memos/commit/a6be658f42607c78301ce063bbc0e4d54c4bfb3f) below, you'll see that they put in a check to make sure that the user is only able to see memo comments that are assigned a specific visibility in relation to the user who is attempting to view them.

```go
currentUser, err := s.GetCurrentUser(ctx)
 	if err != nil {
 		return nil, status.Errorf(codes.Internal, "failed to get user")
 	}
 	var memoFilter string
 	if currentUser == nil {
 		memoFilter = `visibility == "PUBLIC"`
 	} else {
 		memoFilter = fmt.Sprintf(`creator_id == %d || visibility in ["PUBLIC", "PROTECTED"]`, currentUser.ID)
 	}
 	memoRelationComment := store.MemoRelationComment
 	memoRelations, err := s.Store.ListMemoRelations(ctx, &store.FindMemoRelation{
 		RelatedMemoID: &memo.ID,
 		Type:          &memoRelationComment,
 		MemoFilter:    &memoFilter,
```

## further reading & resources:

-
