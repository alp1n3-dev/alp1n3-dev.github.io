---
title: "project blog 3: structuring the project"
date: "2025-02-09"
tags:
  - go
  - http
  - projects
  - cast
---

## time to build the foundations

The main structure of the project is pretty important, and might be hard to untangle later on if, for whatever reason, it needs to be changed. Looking at the [main options](https://github.com/PacktPublishing/Building-Modern-CLI-Applications-in-Go/tree/main/Chapter02/Chapter-2), it's going be one of these:

- ~~flat~~
- group by context
- group by function
- group by module

Obviously you can go a different direction if you want, but I've got no idea what I'm doing with this thing, so I'll stick to what the expert says. You'll notice that "flat" is already crossed out, as I've been able to rule it out right off the bat.

For now, I'm leaning toward **group by function**.

## project structure

This is where it will start out, who knows where it'll end up though!

```
+ 📁 cmd
  + 📁 testfiles
+ 📁 internal
  + 📁 interfaces
+ 📁 configs
+ 📁 init
+ 📁 scripts
+ 📁 build
+ 📁 extractors
+ 📁 models
+ 📁 storage
+ 📁 pages
+ 📄 main.go
+ 📄 go.mod
```

The `/tests` folder was excluded as the test files will be included next to their standard files. For example, `cmdExecute.go` would have `test_cmdExecute.go` right next to it. `pkg`, `vendor`, `api`, `web`, and `deployments` were excluded as they seemed to be more web application oriented. If they're needed later on, they can be added back in. `extractors`, `models`, and `storage` were also included as there will be necessary models for the requests and responses that then may need to be stored, among other things, and the extraction of items will be needed as well.

## documentation hosting

The "easy" way I'll be doing it is through [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). A custom publishing source inside the repo will be used as not all of the files are going to be related / needed by the site (ofc). [Astro Starlight](https://starlight.astro.build) will be used for powering the site, as I don't want to get locked-in to any proprietary documentation systems like GitBook or Retype. Astro is also what powers this blog (😁).

## breaking the app down

### use cases

Initially I wanted this to be fully compatible with Hurl, but at the moment I think it may not be the best initial approach. Building it later, if there is a need, may be the best approach. I want this to follow standards _first_, and have optional functionality built-in _second_. The Hurl syntax means their request files are inherently unusable by default HTTP clients without some form of conversion. They tie their utilities directly into the files themselves.

For example, here's two requests that the [JetBrains HTTP Client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) can send:

**Request #1:**

```http
POST https://ijhttp-examples.jetbrains.com/post
Content-Type: application/x-www-form-urlencoded

field1=value%+value&field2=value%&value
```

**Command Output #1:**

```bash
➜  hurl test_Hurl.hurl
error: Parsing method
  --> testhurl.hurl:4:1
   |
 4 | field1=value%+value&field2=value%&value
   | ^ the HTTP method <field> is not valid. Valid values are GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH
   |
```

**Request #2:**

```http
GET https://example.org HTTP/2
```

**Command Output #2:**

```bash
➜  hurl test_HTTP2.hurl
error: Parsing URL
  --> testhttp2.hurl:1:24
   |
 1 | GET https://example.org HTTP/2
   |                        ^ illegal character < >
   |
```

As you can see from the above, Hurl can't handle a standard HTTP request unless it's been altered to fit the syntax rules. I think sticking with the standard is a safe bet for now. Why recreate the wheel? I'm still a huge fan or Hurl, but I also use Burp Suite a lot and it would be nice to save an HTTP request from it to a file, then proceed to run it from the command line.

All extra functions can be tied in without ruining the request format via specialized templating for variables being passed, and external files for handling configs, workflows, and variable extraction. If the variable isn't passed, for whatever reason, the flow will pause, warn the user, and if they choose to continue it will just `NULL` out the areas the variables are inserted. This may result in an invalid request.

#### bending the http rules

You'll also notice from the above that the scripts can optionally have `HTTP/2` (for example) after the target URL on the same line. One of the handy things is that Go's `net/http` package can support HTTP/2, and HTTP/3 is [not far behind](https://github.com/golang/go/issues/32204). I think this is good to support by default, as the output from a web proxy tool, such as Burp Suite, will have that. Here's an example:

```http
GET /s2/favicons?domain_url=https%3A%2F%2Ftest.com HTTP/1.1
Host: www.google.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br, zstd
DNT: 1
Sec-GPC: 1
Connection: keep-alive
Priority: u=4
```

Parsing the first line will be the most intricate interaction, followed by the body. The headers shouldn't be too much of an issue (_I say this now..._). To support easy scripting and not be too opinionated as to _hurt_ users by making scripts and commands break for no reason, the first lines should allow these variations:

```http
GET /api/v1/access
Host: www.test.com
```

```http
GET test.com/api/v1/access
```

```http
GET https://test.com/api/v1/access HTTP/2
```

This makes the program more flexible overall and will hopefully allow me to mostly reuse all the functionality used for the command line for the scripting portions as well. I think an option further along for strict-http requests could be enabled to verify any changes that are made are still valid HTTP requests on their own. This is to prevent any issues that may arise if other software is used in their testing process or any other team members use a different tool, such as the JetBrains HTTP Client.

If I do end up allowing custom scripting, assertions, or comments in the same file the request is present in, I might end up just creating export options to create a directory of the files without the extra functionalities present in them, along with another option to export all of them as cURL commands. These would ofc take currently present variables into account, as to not force them to reedit each file individually. **Since both JetBrains and Hurl offer things like in-http comments, this might end up being a need**.

#### in-request functions and comments

This is beginning to feel like a weird chimera hybrid of Hurl and the JetBrains HTTP Client at this point... but whatever. I think they both do some things really nicely, while ignoring other items.

Regarding comments, they'll be supported, **but only before or after the request**. This simplifies parsing and tooling, and doesn't muddy up the actual request.

Regarding in-request functions, while the Hurl version is nice (`{{example}}`), I'm going for an in-between:

```
%{assert StatusCode == 200}%
```

The above being placed after a request should ensure that the response is served using HTTP/2, and that the status code is 200. It's slightly more verbose than Hurl's, but not as verbose as Karate's, and it also isn't sandwiched inside of captures and other asserts like this:

```http
# Scenario: create and retrieve a cat

POST http://myhost.com/v1/cats
{ "name": "Billie" }
HTTP 201
[Captures]
cat_id: jsonpath "$.id"
[Asserts]
jsonpath "$.name" == "Billie"

GET http://myshost.com/v1/cats/{{cat_id}}
HTTP 200
```

Our alternative would be something similar:

```http
# Scenario: create and retrieve a cat

POST http://myhost.com/v1/cats

{ "name": "Billie" }

%{assert StatusCode == 200}%
%{capture cat_id: json id}%
%{assert json name == "Billie"}%

GET http://myshost.com/v1/cats/%{cat_id}%

%{assert StatusCode == 200}%
```

Items to highlight from the above:

- Operations such as assert and capture are held separate from the main request.
- Operations are explicit.
- Operations use `%{example}%` for templating instead of `{{example}}`.
- JSON is referenced using the `gjson` package's syntax instead of JSONPath, as Hurl does.
- Things like status codes references go by their `net/http` identifier. Like `response.StatusCode`, except there's no need to declare the `response` portion, as that is a given.
  - This also means you can directly access things like: `Header`, `Proto`, `Body`, etc.

#### dynamic parsing

The default Go json package seems to not be as flexible as necessary for this application, so for parsing response body JSON I'll be going with [gjson](https://github.com/tidwall/gjson). Unmarshalling unknown JSON just doesn't sound like a solid plan, unless I'm thinking about the solution the wrong way. HTML can be [parsed](https://www.zenrows.com/blog/golang-html-parser#parse-html-with-the-node-parsing-api-recommended) using the Go [html package](https://pkg.go.dev/golang.org/x/net/html#pkg-variables), which includes a tokenizer and parser, which will most likely in turn influence the primary option of capture syntax for HTML responses:

**HTML Example:**

```html
<html>
  <body>
    <span id="targetURL">https://example.com</span>
  </body>
</html>
```

```go
%{capture cat_id: html (tag==span, id=="targetURL")}%
```

#### when are errors triggered

The main points errors will have the opportunity to be triggered will be:

- When the user provided command or script is being parsed into a `request`.
- When the request is being sent.
- When the response is received.
- When the response is being parsed.
- When the response is having operations performed on it via user commands.

### requirements

For security, input will be validated and any variables that are indicated as _sensitive_ will be handled via [go-keychain](https://github.com/keybase/go-keychain), meaning that specific functionality will be MacOS specific. Which in turn means that it will either need an alternative added for Linux, or a check will need to be created that disables it for unsupported operating systems. The program is only intended for MacOS and Linux.

If I can think of any more that weren't also described in the use cases, I might add them here later.

## v0.1 general flow

1. User runs command with input via the CLI / via a script.
2. Method, URL, protocol, and format are validated.
3. Variables and operation calls are validated.
4. Everything is packaged into a `request`, which is then sent.
5. Once a response is received, it is automatically stored in a `response`.
6. User-provided operations are performed on the response.
7. The response and anything extracted from it are output.
8. Program end.

---

Hopefully I covered most of the important things... time to focus on the prototype instead of writing. Wish me luck!
