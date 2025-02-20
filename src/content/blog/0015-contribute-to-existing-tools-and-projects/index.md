---
title: "contribute to existing tools & projects"
date: "2025-02-16"
tags:
  - oss
  - cybersecurity
  - tools
---

I understand why someone wants to create their own new version of something. There's tons of cases where I feel like the effort is totally acceptable, such as:

- Licensing issues with the main project.
- Practice projects to gain a deeper knowledge.
- Resume development.
- Disagreements with the main project on architecture / syntax / use / etc.
- Obvious limitations of the project's features / roadmap.
- Not knowing the best place to contribute.
- Etc. (I'm sure I'm missing some).

But just doing it without even a discussion or contribution to an originating project is a little strange to me, as it has the potential to fragment the contributions, knowledge, and user base of other related OSS projects.

There's an amount of leverage and velocity that is gained by well-established projects in a niche that have a thriving ecosystem. They become the "go-to" project when certain items or usage is referenced, and since they're the main source, it also draws a lot of users to contribute and therefore maintain the reputation.

Take OWASP's Top Ten, Cheat Sheets, WSTG, or ASVS for example. Each one has an intended audience and use, and are constantly referenced as the "standard" by tons of companies. For web app pentesting, seeing the massive amount of knowledge and techniques that is spread across a billion small single-use tools is nuts, and I'd love to see that centralized. If it's strictly a technique or an additional use of a technique, maybe it should be placed into WSTG. If it's a particular wordlist that was built through experience, justify it and send it into SecLists. If it's a scanner check, write a Burp BCheck for it and send it into PortSwigger's dedicated repo.

There's tons of different places to contribute that align with OSS. This was originally inspired by a project that hit [Hacker News](https://news.ycombinator.com/item?id=43065217) that analyzes [Nginx configurations](https://github.com/dvershinin/gixy?tab=readme-ov-file). My first question was: Why not just write Semgrep rules and contribute them to their ruleset, especially since they already have an [Nginx category](https://semgrep.dev/p/nginx)?
