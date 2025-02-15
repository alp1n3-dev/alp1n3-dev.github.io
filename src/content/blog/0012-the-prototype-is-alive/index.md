---
title: "project blog 4: the prototype is alive"
date: "2025-02-14"
tags:
  - go
  - http
  - projects
  - cast
---

I'm _definitely_ not through the Go CLI book yet, but wanted to err on the side of taking action instead of just absorbing knowledge and doing nothing with it. If something needs to be changed or reworked as I learn from my mistakes by going through the book, that's totally fine, as it's supposed to be a learning experience after all! Here's a little update on the _almost_ v0.1 of the practice project dubbed `cast`.

Right off the bat though, it **does currently function** (but doesn't have all of the features, ofc):

```bash
➜  cast git:(main) ✗ ./cast get https://google.com

2025/02/14 09:10:02 INFO Method and URL Provided

200 OK
Set-Cookie: [TRUNCATED]
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-Type: text/html; charset=ISO-8859-1
Accept-Ch: Sec-CH-Prefers-Color-Scheme
Server: gws
Expires: -1
Date: Fri, 14 Feb 2025 14:10:03 GMT
X-Xss-Protection: 0
Cache-Control: private, max-age=0
Content-Security-Policy-Report-Only: [TRUNCATED] 'unsafe-inline' https: http:;report-uri https://csp.withgoogle.com/csp/gws/other-hp
X-Frame-Options: SAMEORIGIN
P3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."

<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="en"><head><meta content="Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for." name="description"><meta content="noodp, " name="robots"><meta content="text/html; charset=UTF-8"[TRUNCATED]
```

## where to handle errors & how

I've pulled in charmbracelet's [log package](https://github.com/charmbracelet/log) for this as I like the added colors (_sue me_). I'll pass errors up if it makes the program cleaner and provides utility to the user (and if it makes sense), but a lot of the time the program essentially can't continue with invalid input and needs to shut down anyway.

This has led to me just handling those kinds of errors directly where they occur. Charm's package let me easily customize the format in order to contain helpful information. This will be an ongoing effort as I don't intend to go through and upgrade all the error messages at this time.

Here's an example of the logger's config:

```go
var Logger = log.NewWithOptions(os.Stderr, log.Options{
    ReportCaller:   true,
    ReportTimestamp: true,
})
```

And here's one of the `INFO` logs:

```bash
2025/02/14 09:19:03 INFO <cmd/send_http_request.go:31> Method and URL Provided
```

This will change as the application becomes more stable and ready for normal use. I'll probably swap in a custom logger for errors, warnings, etc. and keep a simple one for info, as the user doesn't need to know _where_ their arguments were successfully accepted, or at what time.

## tracking project via github issues & milestones

I hadn't really used GitHub too in-depth before beginning to contribute a little bit here and there to open-source projects. Looking at a well-run repository is like looking at a finely tuned machine, and it makes features / issue tracking, and general project tracking, a breeze (along with everything else it offers).

I've setup custom milestones an began to open issues to keep on track and identify what's needed to hit each iteration of the project. I think it's important, especially for me, as when the project grows the feature set and amount of files can really get out of control if it isn't being monitored and controlled. With some projects it felt like you were looking at it for the first time the next day if no planning was put into tracking those items. Just another step towards staying organized!

## scaffolding out future features

As you can see, it's grown a little differently than the structure laid out in the previous blog post. But it's working! And as I continue to add to it, I'm sure there will be more changes.

```bash
➜  cast git:(main) ✗ ls -R

 cast   DELETINGSOONassert   go.mod   LICENSE   models   query      󰙨 tests
 cmd    extractors           go.sum   main.go   output   README.md

./cmd:
 root.go   send_http_request.go   send_http_request_test.go

./DELETINGSOONassert:
 assert_body.go           assert_controller.go   assert_regex.go           assert_size.go
 assert_content_type.go   assert_headers.go      assert_simple_string.go   assert_status.go

./extractors:
 http_extractors

./extractors/http_extractors:
 build_http_request.go   build_http_response.go   parse_http_file.go   validate_http.go   validate_http_file.go

./models:
 http_models.go

./output:
 print_response.go

./query:
 query_body.go          query_controller.go   query_header.go   query_simple_string.go   query_variable.go
 query_bytes.go         query_cookie.go       query_json.go     query_status.go          query_xpath.go
 query_certificate.go   query_duration.go     query_regex.go    query_url.go

./tests:
 basic_cli_functionality.go    http_test_files                     intermediate_file_functionality.go
 basic_file_functionality.go   intermediate_cli_functionality.go

./tests/http_test_files:
 chained_requests_test.http   get_test.http   post_test.http
```

## working in sprints

The work on this seems to accelerate sharply then drop off, over & over. I think it'll probably continue that way as I can bird-dog a problem and once it's solved I lose interest until the next problem. From the `git` history, most of the commits and effort up to this point have been in one day.

```bash
commit 618082a0967f01c72c0e2b987770eb07d616af51 (HEAD -> main, origin/main, origin/HEAD)
Author: alp1n3 🌲
Date:   Fri Feb 14 08:48:29 2025 -0500

    Pulled in charmbracelet/log for colorful and helpful logging for users.

commit a3357aef62965c2ab97019e874a151edb70ec50f
Author: alp1n3 🌲
Date:   Thu Feb 13 20:32:07 2025 -0500

    created the layout for query support. (assert / capture, like in Hurl)

commit 084fa84826763c2f3e67c8143c30618bc064af6f
Author: alp1n3 🌲
Date:   Thu Feb 13 16:23:30 2025 -0500

    Made changes to make items easier to work with and functions more consistent

commit 3f2e9a39bc6ec1348ace5f0101cee9d5cf9e3830
Author: alp1n3 🌲
Date:   Thu Feb 13 13:08:27 2025 -0500
```

## what's next

Now that it's `in-progress`, I'll just keep chugging along! The next step is ensuring POST requests work, handling user-provided headers & cookies, and user-provided request bodies.
