---
title: "project blog 1: doing everything HTTP with Go(lang)"
date: "2025-02-06"
tags:
  - go
  - http
  - projects
  - cast
---

## what? why?

- Because Go is awesome (AKA super easy to write, maintain, and great for handling web services / requests)
- Because I'm super bad @ Python
- I need a project to struggle through and upskill my Go dev

## inspirational tools

A lot of these aren't written in Go, but they contain a ton of useful features that would be insanely nice to have packaged into one standardized tool.

**CLI:**

- Hurl - (_awesome way to write scripts, with a great assertion system_)
- ffuf - (_super easy and efficient fuzzing support with quick rules changes_)
- HTTPie CLI - (_nice way to call quick requests from the cli_)
- xh (_another cool and easy one to send quick requests from the cli, similar to HTTPie CLI_)

**HTTP API Testing Automation:**

- StepCI - (_very nice yaml configs for tests_)

## starting w/ the cli

I'm pretty new to writing command line tools in Go, so I'm going through [Building Modern CLI Applications in Go](https://www.amazon.com/Building-Modern-CLI-Applications-next-level/dp/1804611654) by Marian Montagnino. While starting with the handling scripts would be _super cool_, there's a lot of edge functionality that would be needed for them to even work slightly.

So starting off, the first goals are:

1. Build a CLI tool that can send custom HTTP requests and receive their responses.
2. Upgrade that CLI tool to read the custom HTTP request from a file.
3. Allow them to be proxied through a URL if a proxy flag is passed.

The overall syntax should be very similar, if not completely the same, to Hurls. It values simplicity and self-documentation. Extremely explicit formatting and configurations should be optional and an edge feature, not the way the core program functions.

**Small steps.**

## end goal

There's a billion things it'd be nice for this to handle, but that might not actually end up fitting in and would be better as their own tooling. Things like:

- Integrating something like Interact.sh
- Having an advanced way to write tests / rules / assertions that support scripting
- Parallel requests
- Word list support
- Support Hurl scripts (of course)
- Global errors, AKA supporting users to write an assert that is run by default on every request. If errors are standardized, it will alert on any non-standard response.

And so... many... more... but there's just limited time and skill (on my part 😂) involved. I'd honestly be happy if it just supported Hurl scripting, then also have the option of doing something similar to HTTPie CLI.

## rough overview

I'll put together a game plan... Let's see how much changes between now and the finished `v0.1`.

### first goal: cli

It should be able to read this command and send it:

```bash
goProgram post test.example.com -h x-token:1337 -ct json -b user=testName
```

I've _tried_ to keep the flags as self-explanatory as possible. Most flags, by themselves, are optional, but once they've started to be used, they may require a reference or value, to be provided.

**-h** (_Optional_): Header.

**-ct** (_Optional_): Content-Type.

**-b** (_Optional_): Body.

**Why flags for other items, but not the method and URL?**

The method and URL are **required** for every interaction, the other items aren't. Plus, the other items need the flexibility to be set multiple times if someone wants to. The program will blow out any whitespace that outside of quotations when passed via the cli. These items will never move, and should always be first. **Any other format will error out**.

**Download a File**

```bash
goProgram get test.example.com/profilepicture.png -dl /user/name/downloads
```

_Directory location is optional_. If unspecified, it will download and save the file to the current directory.

**Sessions**

Sessions are treated as globally accessible variables, so they're checked and loaded before each run that involves variable referencing flags.

_Create a Session File_

```bash
goProgram -sl /user/collections/authInfo -sh x-token:1337 -sn admin
```

**-sl** (_Optional_): Session location. The folder to store the session file in. It will be stored as `{{session name}}-session.txt`. In the root folder of the `goProgram` will be a file named `sessions.yaml` that tracks the location of all of the session files created via the CLI.

**-sh**: Session header. The header and its accompanying value.

**-sn**: Session name. The name of the session to be referenced later.

_Use an Existing Session_

```bash
goProgram get test.example.com/admin-list -s admin
```

**-s**: Session. Reference a session to be used during this request. Appends the associated header and value to the request.

Each request should be independent unless an external file is referenced and the flag to check that file is used in the command. These files are plaintext, so if accessed they will contain the headers and their assigned values. The file the session is stored in must be referenced directly.

_Purge Sessions_

```bash
goProgram -sp
```

Deletes the contents of the `sessions.yaml` file.

### second goal: file

It should be able to have a file referenced like this and send the request and output the syntax highlighted response:

```http
GET https://test.example.com
x-token:1337
```

And make use of the existing session:

```http
GET https://test.example.com/admin-list
{{admin}}
```

And ensure posting works a-okay:

````http
POST https://test.example.com/admin-list
{{admin}}
x-api-test: "this-is-a-header"
```
{
  "test":1
}
```
````

---

Looking at it _seems_ simple, but building it without any future footguns getting in the way will certainly be a learning experience. I'll continue posting updates about this if it ever goes anywhere (😂).
