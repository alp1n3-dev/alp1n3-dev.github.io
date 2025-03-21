---
title: "don't pre-optimize with go"
date: "2025-03-19"
tags:
  - cast
  - cli
  - go
---

**tools:**

```bash
time
time [command]

hyperfine
hyperfine --runs 5 [command]
```

## what happened?

_Essentially... the `time` command happened._

```bash
$ time ./cast get https://www.google.com

200 OK
Date: Tue, 11 Mar 2025 18:09:26 GMT
Expires: -1
[TRUNCATED]

./cast get https://www.google.com  0.02s user 0.02s system 17% cpu 0.247 total
```

My jaw dropped... I was seeing how much time and the initial "high" of starting of a project on optimizations that _probably_ didn't actually matter. But before that, let's double-check it against the other projects using `hyperfine` and a simple `GET` request.

```bash
➜  cast git:(main) ✗ hyperfine --runs 5 './cast get https://www.google.com' 'http get https://www.google.com' 'xh get https://www.google.com'
Benchmark 1: ./cast get https://www.google.com
  Time (mean ± σ):     215.1 ms ±  38.0 ms    [User: 15.6 ms, System: 9.4 ms]
  Range (min … max):   191.1 ms … 282.4 ms    5 runs

Benchmark 2: http get https://www.google.com
  Time (mean ± σ):     365.3 ms ±  51.0 ms    [User: 136.2 ms, System: 36.8 ms]
  Range (min … max):   317.1 ms … 422.5 ms    5 runs

Benchmark 3: xh get https://www.google.com
  Time (mean ± σ):     299.3 ms ±  15.1 ms    [User: 93.1 ms, System: 10.0 ms]
  Range (min … max):   287.4 ms … 325.5 ms    5 runs

Summary
  ./cast get https://www.google.com ran
    1.39 ± 0.26 times faster than xh get https://www.google.com
    1.70 ± 0.38 times faster than http get https://www.google.com
```

It seems to me that anything under `500ms` is a win for a CLI tool, so everything performed well. This just showed that `cast` is **more** than fast enough without any crazy optimizations done to it. I do eventually want to learn how to use Go's profiling tooling and see if there are any hot spots that are causing significant issues, but man, I really should have used that initial velocity / excitement to pump out more features. The code is probably not even _that good_, since I'm not some pro Go dev, but the benchmarks show that it's absolutely fine. (_Of course `cURL` was still significantly faster 😂_)

With the current functionality for a standard `GET` request, `cast` ends up being faster than `xh` (Rust) and `httpie` (Python). The file functionalities aren't fully built out yet, so parsing overhead has the potential to mess up the timing benchmark, which is why I'm not comparing it against `hurl` quite yet. I'm guessing that `hurl` will probably **stay** ahead of `cast`, as the dev's have done _an amazing job_ with the tool (not to say the other devs of other projects haven't).

## concerns over net/http vs fasthttp

It was probably unnecessary to move from `net/http` to `fasthttp`, since the average amount of requests sent for this tool would probably be between 1 -> 15. It wouldn't be too insane to switch back as the main logic surrounding handling the requests is only done in specific areas, but I've actually come to like the byte array handling that `fasthttp` prefers.

## the want to be competitive

Seeing how fast the other tools were, and thinking I'd already be at a dramatic disadvantage, I started trying to pre-optimize way too soon. I thought the gains that Rust would give would make a massive difference, when I had zero clue what the performance of a Go CLI would be. Turns out, for these smaller things (sending a few HTTP requests), it doesn't really matter (😂).

## a waste of time & velocity

The first few weeks of a project contain a level of excitement and motivation that enables me to absolutely churn out work, even if it's in an area I'm unfamiliar with (doubly so if it's an area I'm excited about learning more about). In the future, I'd like to not waste this velocity on pre-optimizations. The refactoring, fixing logging structures, optimizing, can all come after the actual **features**.
