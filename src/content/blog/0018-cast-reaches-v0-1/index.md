---
title: "cast reaches v0.1"
date: "2025-02-19"
tags:
  - cast
  - http
  - tools
---

The time has come! A little faster than I thought, but after some long hours racking my brain, reading docs, making frivolous rewrites, and arguing with whichever AI I felt was useful that day, `cast` has reached `v0.1`.

What qualifies it as `v0.1`? The arbitrary goal I set of being able to:

- send any http method of request
- to any url
- with any headers
- and any post body
- while printing the response
- all from the command line (*without any files involved referenced from those commands*)

```bash
➜  cast git:(main) ✗ ./cast get https://google.com -H test:test1 -H test2:test3 --highlight

HTTP/1.1 301 Moved Permanently
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-Length: 220
Server: gws
Content-Security-Policy-Report-Only: object-src 'none';base-uri 'self';script-src 'nonce-fd4Ho8_9u1hAaj1sjQeLVg' 'strict-dynamic' 'report-sample' 'unsafe-eval' 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
Date: Thu, 20 Feb 2025 01:45:17 GMT
Expires: Sat, 22 Mar 2025 01:45:17 GMT
X-Frame-Options: SAMEORIGIN
Content-Type: text/html; charset=UTF-8
Location: https://www.google.com/
Cache-Control: public, max-age=2592000
X-Xss-Protection: 0

<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>
```

The next target is to support back-to-back requests loaded in from a file, and all the fun things that comes with. This part will probably take a **significant** amount of time to even get *slightly* working. Next items:

- file-based requests
- comments
- assertions
- variables
- commands / functions
- (potentially) scripting

## comments & request breaks

Pulling from `hurl` and `jetbrains` I decided I'd support comments, but only above or below the HTTP request. This is to stay as close to HTTP standards as possible. From `jetbrains` I also like the idea of having breaks indicated for requests, as it allows for an easier level of flexibility with the body.

- **comments:** `#`
- **request break:** `###`

## assertions & scripting

Assertions are going to be similar (*again*) to `jetbrains`. If it's not broke, don't fix it (right?). I wanted a slightly different version though as I'm lazy and the curly brackets are in a weird spot. Assertions will also only be allowed *after* the request, but *before* the request break.

- **assertions:** `<% assertion: value %>`

I think assertions and variables extraction / reuse are the most useful tools when it comes to multi-request chaining and app flows, so those functionalities will probably end up being prioritized.

Scripting *might* be supported, I still haven't decided. If it is, it'll probably be `Go`-based, but I also don't need random scripts to nuke anyone's filesystem, so that's a problem for later.

- **scripting:** `{% newVar := base64(request.header) %}`
  - `{% newVar2 := url.decode(randomValue) %}`

Scripting will probably just turn into predefined functions that will get added if they're popularly requested and fit into the project's overall roadmap.

## why the extra flags?

With something like `HTTPie` a command might look like this:

```bash
https POST https://www.example.com/endpoint API-Token:123 user=Admin
```

My end goal is to be able to allow the user to send **completely invalid syntax through if they want to**. I don't know what they're going for, and while doing something like penetration testing it's really handy to be able to fully modify requests to your heart's content. This means there needs to be a *clear* line between areas like the headers and body in the CLI request. So `cast` makes it look more like this:

```bash
cast POST https://www.example.com/endpoint -H API-Token:123 -B user=Admin
```

## benchmarking

### benchmark results

I ran some benchmarks and it appears to do decently for how little of a `Go` specialist I am:

```bash
goos: darwin
goarch: arm64
pkg: github.com/alp1n3-eth/cast/tests
cpu: Apple M1
BenchmarkHTTPClients/httpie_get-8 3	 384245014 ns/op	   72240 B/op	      60 allocs/op
BenchmarkHTTPClients/xh_get-8     4	 276944760 ns/op	   72224 B/op	      59 allocs/op
BenchmarkHTTPClients/cast_get-8   6	 180291896 ns/op	   72109 B/op	      59 allocs/op
BenchmarkHTTPClients/hurl_get-8   14	95482223 ns/op	    9238 B/op	      63 allocs/op

=== Benchmark Results ===
http_get  : 1.152734375s per 1 runs
xh_get    : 1.107776333s per 1 runs
cast_get  : 1.081735333s per 1 runs
hurl_get  : 1.336745208s per 1 runs
PASS
ok  	github.com/alp1n3-eth/cast/tests	10.091s
```

and

```bash
goos: darwin
goarch: arm64
pkg: github.com/alp1n3-eth/cast/tests
cpu: Apple M1
BenchmarkHTTPClients/httpie_get-8 3	 382678292 ns/op	   72373 B/op	      60 allocs/op
BenchmarkHTTPClients/xh_get-8     4	 274271802 ns/op	   72112 B/op	      59 allocs/op
BenchmarkHTTPClients/cast_get-8   5	 216601750 ns/op	   72414 B/op	      60 allocs/op
BenchmarkHTTPClients/hurl_get-8   14	84511801 ns/op	    9366 B/op	      63 allocs/op

=== Benchmark Results ===
httpie_get: 1.148032584s per 1 runs
xh_get    : 1.097082542s per 1 runs
cast_get  : 1.08300525s per 1 runs
hurl_get  : 1.183155458s per 1 runs
PASS
ok  	github.com/alp1n3-eth/cast/tests	9.627s
```

### benchmark code

The benchmark test code I ran is here:

```go
// benchmark_timing_1_test.go

package tests

import (
	"bytes"
	"fmt"
	"os/exec"
	"testing"
	"time"
)

// CommandBenchmark defines a command to be benchmarked
type CommandBenchmark struct {
	Name string
	Args []string
}

func BenchmarkHTTPClients(b *testing.B) {
	commands := []CommandBenchmark{
		{"httpie_get", []string{"/opt/homebrew/bin/http", "GET", "https://www.google.com/"} },
		{"xh_get", []string{"/opt/homebrew/bin/xh", "GET", "https://www.google.com/"}},
		{"cast_get", []string{"../cast", "get", "https://www.google.com/"}},
		{"hurl_get", []string{"hurl", "hurl_test_google.hurl"}},
	}

	// Store results for comparison
	results := make(map[string]time.Duration)

	for _, cmdBenchmark := range commands {
		b.Run(cmdBenchmark.Name, func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer() // Reset timer to exclude setup time

			start := time.Now()
			for i := 0; i < b.N; i++ {
				runCommand(b, cmdBenchmark.Name, cmdBenchmark.Args)
			}
			duration := time.Since(start)

			results[cmdBenchmark.Name] = duration
		})
	}

	fmt.Println("\n=== Benchmark Results ===")
	for name, duration := range results {
		fmt.Printf("%-10s: %v per %d runs\n", name, duration, b.N)
	}
}

func runCommand(b *testing.B, name string, args []string) {
	if len(args) == 0 {
		b.Fatalf("[%s] No command provided", name)
	}

	cmd := exec.Command(args[0], args[1:]...)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr

	// Run the command and check for errors
	if err := cmd.Run(); err != nil {
		b.Logf("[%s] Error: %v", name, err)
		b.Logf("[%s] Stderr: %s", name, stderr.String())
		b.Logf("[%s] Output: %s", name, out.String())
		b.Fail()
	}
}
````

and the contents of the `hurl_test_google.hurl` file is:

```bash
GET http://google.com
Content-Type:text/html
HTTP 301
```

### comparisons might not be equal

Props to `hurl` for kicking it out of the park with `ns/op`. I'll be adjusting these later on to perform the `GET` tests for `hurl` via the CLI with no files involved, but I don't *think* there's any way to do that for the post tests I'll set up soon, so any delays that make it look like `cast` is faster than `hurl` for `POST` requests executed purely on the CLI *may* be wrong and could be due to the file I/O and many more functionalities / assertion involvement of `hurl`. So they can't accurately be compared until they have very similar features operating doing the same operation. **This is my first time benchmarking anything as well, so I could have completely wrong logic here (😬).**

### benchmarking after thought

Overall I'm pretty happy with where it's at for the time invested, and it's been a great learning journey as I haven't really used a ton of `Go` since I finished [Alex Edward's book](https://lets-go.alexedwards.net) *Let's Go* back in like... April of 2024.

## opening the repo and publishing the package

I think this is a ways off, as the program is anything *but* stable and feature-complete, but I'd like to eventually open up the repo and get it pushed to `brew.sh` and the `arch user repository` at minimum. It'd be cool to attract a few contributors who are like, *really good*, with `Go` and I'd learn some new things.
