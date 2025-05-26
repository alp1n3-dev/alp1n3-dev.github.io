---
title: "skill roadmap"
date: "2025-01-31"
tags:
  - roadmap
  - skills
  - education
---

## overview

This isn't all inclusive, but a way for me to keep track of some of the more impactful items that are publicly available for free or for a _reasonable_ price for the item itself.

## formal education

1. Bachelor of Science in Cyber Operations - Dakota State University (DSU) - ✅
2. Master of Science in Cyber Defense - Dakota State University (DSU) - ✅
3. (Maybe) PhD - New York University (NYU) (Part-Time) - 🛑

## web app pentesting / source code review

1. PortSwigger Academy - ✅
2. HackTheBox Certified Bug Bounty Hunter (HTB CBBH) - ✅
3. PentesterLab - Assorted Badges - 🔄
4. SecureCodeWarrior:

   - Go - 🔄
   - C# - 🔄
   - GitHub Actions - 🛑

5. HackTheBox Certified Web Exploitation Expert (HTB CWEE) - 🛑
6. OffSec OSWE - 🛑
7. Certified Secure Software Lifecycle Professional ([CSSLP](https://www.isc2.org/certifications/csslp)) - 🛑

## programming

### go

1. A Tour of [Go](https://go.dev/tour/welcome/1) - ✅
2. Let's Go by Alex Edwards - ✅
3. Learn Go with Tests by quii - 🔄
4. Effective Go Recipes
5. Building Microservices in Go (Pluralsight) - 🔄
6. [Grind 75](https://www.techinterviewhandbook.org/grind75/) - 🛑
7. Let's Go Further by Alex Edwards - 🛑
8. Ardan Labs Go Bundle - 🛑
9. 100 Mistakes in Go
10. Go By Example (with accompanying github [repo](https://github.com/inancgumus/learngo))
11. Ultimate Go Notebook
12. How I Write HTTP Services in [Go](https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/) After 13 Years
13. Go Secure Coding [Practices](https://github.com/OWASP/Go-SCP)
14. Go with the Domain ([Book](https://threedots.tech/go-with-the-domain/))
15. Building Event-Driven Applications in [Go](https://watermill.io/docs/getting-started/)

#### golang packages / tools to get familiar with

1. net/http
2. zap
3. pgx ([overview](https://donchev.is/post/working-with-postgresql-in-go-using-pgx/), [yt video](https://www.youtube.com/watch?v=sXMSWhcHCf8))
4. [testify](https://github.com/stretchr/testify)
5. [temporal](https://github.com/temporalio/temporal)
6. [validator](https://github.com/go-playground/validator)
7. [chi](https://github.com/go-chi/chi)

#### golang web app repos to study, to see how things are handled (actions, releases, etc.)

- usememos/memo: [devon wiki](https://deepwiki.com/usememos/memos) & github
- 

## systems / devops / ci/cd / scr

- how git internally [works](https://octobot.medium.com/how-git-internally-works-1f0932067bee)

### ai agents, MCP, automation, durable execution

#### temporal (with Go)

1. Read the [Zine](https://learn.temporal.io/assets/files/zines-6425991d04e05e05031aa2b4a2ccddf4.pdf) on Durable Execution - 🛑
2. Temporal 101: Introducing the Temporal Platform - 🛑
3. Temporal 102: Exploring Durable Execution - 🛑
4. Crafting an Error Handling Strategy - 🛑
5. Versioning Workflows - 🛑
6. Build an eCommerce App with Temporal - 🛑
7. Build an Email Drip Campaign - 🛑
8. Create Audiobooks from Text - 🛑
9. Build a Background Check Application - 🛑
10. Give a Presentation - [Build Invincible Apps with Durable Execution](https://learn.temporal.io/meetup_in_a_box/invincible_apps/go/) - Go - 🛑

### orbstack & docker

### c#

1. C# [Documentation](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview) (All of it) - 🛑
2. ASP.NET Core [Documentation](https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-9.0) (All of it) - 🛑
3. ISE Engineering Fundamentals [Playbook](https://microsoft.github.io/code-with-engineering-playbook/) - 🛑
4. OWASP DotNet Cheat [Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DotNet_Security_Cheat_Sheet.html) - 🛑

### SAST
#### CodeQL

- [Trail of Bits - CodeQL Guide](https://appsec.guide/docs/static-analysis/codeql/)
- [Discover Vulnerabilities with CodeQL](https://www.youtube.com/watch?v=NygVkQKmGwI)
- CodeQL Zero to Hero: [Part 1](https://github.blog/developer-skills/github/codeql-zero-to-hero-part-1-the-fundamentals-of-static-analysis-for-vulnerability-research/) & [Part 2](https://github.blog/developer-skills/github/codeql-zero-to-hero-part-2-getting-started-with-codeql/) & [Part 3](https://github.blog/security/vulnerability-research/codeql-zero-to-hero-part-3-security-research-with-codeql/) & [Part 4](https://github.blog/security/vulnerability-research/codeql-zero-to-hero-part-4-gradio-framework-case-study/) (_and perform the exercises that go along with them_)
- [CodeQL Documentation](https://codeql.github.com/docs/codeql-overview/)
- [Code Scanning via Codespaces & Private Vulnerability Reporting](https://github.blog/security/vulnerability-research/security-research-without-ever-leaving-github-from-code-scanning-to-cve-via-codespaces-and-private-vulnerability-reporting/)
- [BugCrowd CodeQL Roundtable](https://www.youtube.com/watch?v=4lvUd3xYL4w)
- [CNCF: Security as Code - A DevSecOps Approach](https://www.youtube.com/watch?v=aKv08sAUNUs)
- [CodeQL CTFs to Practice With](https://securitylab.github.com/ctf/)
- Use CodeQL in a repo of your own - ✅
- [How to secure your GitHub Actions workflows with CodeQL](https://github.blog/security/application-security/how-to-secure-your-github-actions-workflows-with-codeql/)
- [How GitHub uses CodeQL to secure GitHub](https://github.blog/engineering/how-github-uses-codeql-to-secure-github/)

Need help or running into a problem? Use the GitHub Security Lab's [Discussions](https://github.com/github/securitylab/discussions). Sometimes updates to CodeQL contain breaking changes (like to the dataflow API) and the relevant documentation for specific languages isn't updated, so don't be afraid to ask.

#### Semgrep

1. [Semgrep 101](https://academy.semgrep.dev/courses/semgrep-101) via Semgrep Academy, then the other relevant courses - 🛑
	- Semgrep Custom Rules Level 1 - 🔄
2. Use Semgrep in a repo of your own - ✅

## not 100% necessary, but still completed

### other certs

- CompTIA CySA+ - ✅

### policy

- PCI - 🛑
- HIPAA - 🛑
- ISO 27001 - 🛑
- SOC 1 & SOC 2 - 🛑