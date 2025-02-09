---
title: "project blog 2: starting from the bottom building a cli tool"
date: "2025-02-07"
tags:
  - go
  - http
  - projects
  - cast
---

## cli guidelines

The book has some great cli guidelines that are explained in-depth throughout it. Here's an overview:

- make it modular
- human-first, not machine
- separate interfaces from engines and policies from mechanisms
- keep it simple (_always my favorite, no matter where I see it_)
- stay small
- be transparent
- be robust
- be intuitive, follow convention
- be succinct
- fail quickly and loudly
- build to save the dev's time, not the machine's time
- prototype first, then optimize
- build flexible programs
- design for extensibility
- peacefully coexist with the rest of the cli ecosystem

## next steps

### choosing a name

It's gotta be:

- short & simple
- easy to understand
- memorable

I'll make it easy. Let's just go with "**cast**" for now. It doesn't appear to be in the Homebrew ecosystem or a system command for MacOS, so I guess it's good enough. It can always be changed later!

### help, documentation, and support

I've done a little documentation and written out the rules for the v0.1 prototype in my previous post about the project. For now, I'll call it good on this section. Later on the man page / docs will need to be filled out.

For the help page, I'll reserve `-h, --help` for it. Enabling users to give feedback and get support is important too, which will need to be included in the docs. Luckily GitHub has issues, so a "How to Submit an Issue" guide will need to be created.

**To Do**:

- Create a man page
- Create a help page with help flags
- Create an easy (to do, and to find) way for users to submit issues

## improve information density

This can be done using:

- ascii art
- emojis
- symbols
- colors

If you're outputting for a machine, make it machine readable, like JSON. If you aren't, but it eventually might want to be read by a machine, offer the option to have it output in different formats. For mine, this would most likely look something like:

- making it easy to save request and response history
- potentially supporting logging to `.har` files for chained requests
- allowing just the response body to be output to a file

## make errors simple, and fail quickly

Users will panic will full-tilt stack traces being thrown in their faces. Make sure errors are handled gracefully, and that the resulting error is actually _clear_ and _useful_ to the user. Failing quickly ensures nothing gets mucked up in the process, especially if the cli program is interacting with other files or applications. Bad things / input should be recognized early on.

**Review**:

- no noisy output / stack traces
- useful info only
- suggest next steps
- link / reference where debug / traceback logging is
  - include instructions on where to submit it
- debug & warning messages should go to `stdout`
- return a `0` exit code on success, and a non-zero code on failure

## configs

Flags, environment variables, and files can add a lot of extra utility to the application. Some allow certain things to persist across multiple program usages. The goal for `cast` is to ensure the program is file-first. Request collections, configs, etc. should all be in a non-proprietary format that is easily editable and understandable.

The structure might end up looking something like this:

```
+ 📁 root
    + 📄 config.yaml
    + 📄 variables.yaml
        + 📁 authentication
            + 📄 user-step1.http
            + 📄 user-step2.http
        + 📁 retrieve-user-list
            + 📄 user-list.http
```

## security considerations

Eventually I'd like to support multi-use sensitive variables, like saving JWTs and cookies for later, or username and password combos, but they'd need to be stored differently than the normal variables. The book suggests following the XDG spec, and using a separate flag such as `--password-file`, to discretely pass in the sensitive variables.

## contributors

I'm trying to make it as easy as possible for people to contribute to the program. This will include things like:

- keeping the program and its files simple and logical
- writing a contribution guidelines
- writing good docs to base things off of
- having rugged tests written to ensure all functionality works with the implemented changes
- not make the process too complicated
- have a roadmap and issue sets dedicated to specific versions to let them know what is and isn't wanted
- have a requirement for them to write tests for any functionality implemented
- _potentially_ support plugins

## ensuring the program is rugged & can be supported long-term

Future-proofing the program can be done very differently, but I think I've previously covered some of the items. Things like ensuring it's rugged, lots of tests, a solid CI/CD pipeline, a clear roadmap, only adding or maintaining and never removing features. Another one brought up was to not rely on external dependencies, which is why I'm trying to use Go's standard packages in the first place, like `net/http`. If an external dependency does **need** to be brought in, for whatever reason, it should be thoroughly vetted, and if the lifespan of maintenance isn't clear for it, the feature that it would be supporting might need to be cut.

In addition to the logical bit, keep the user informed and make it easy to use and understand how it works. If a command is taking forever, let the user know. Have built-in timeouts, updates, and guardrails. Also ensure things like file changes are essentially uninterruptible; if it is interrupted, don't commit the change to the file.

## read on

[Command Line Interface Guidelines](https://clig.dev)
