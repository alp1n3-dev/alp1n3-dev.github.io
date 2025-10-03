---
title: creating a mac app with go, wails, vue, and shadcn
date: 2025-08-02
tags:
  - macos
  - go
  - wails
  - vue
  - shadcn
draft: true
---
For a while I've wanted to make a local-first app, but the main thing standing in my way was the lack of knowing a language productive for it. I love Go, and working with it and its dependencies is easy peasy for me, so I didn't want to re-learn the wheel and have to go with something like Swift. That's when I stumbled upon a post referencing Wails as the solution to my problem.

This is living document that I'm using for brainstorming, so it's subject to change.

## the program's components

- Language / Backend: Go
- Frontend: Wails + Vue
- GUI Components: Shadcn (includes Tailwinds)
- Database: SQLite inside of the `.app`
- Exports: .CSVs of each scan auto-saved inside the `.app` unless specifically deleted.
- Config: Saved in YAMLs inside of the `.app`

## minimal features

To create this practice project, I don't want to bite off a giant chunk that I'll never have the time to finish. I'm just aiming to create a GUI tool that supports the following tool, which is written in Go as well (hopefully making things easier):

- Naabu (Project Discovery)

Then it should at least have two core portions:

**Portion 1:**
- The ability to run the above tool and its supported flags.

**Portion 2:**
- An OpenAPI v3.1 spec that allows the app to be run as a GUI app or as a web app.
- Authentication and authorization for a standard user and an admin user.
	- Will be optional, can be run without needing users and will assign a default admin user upon selection.
	- Should be reflected in the OpenAPI spec.
	- Will probably require potentially rolling my own auth...
	- Will be a JWT.

---

## the pain

Everything was outdated and didn't want to really *work* out-of-the-box with Wails and its Vue template, so some changes may need to be made in the environment, especially if you're using Tailwind.

1. Use `npm` / `npx` to install/update any necessary packages.
2. Install Tailwind using the [official docs](https://tailwindcss.com/docs/installation/using-vite), specifically for Vite if it's being used. (I accidentally was using outdated steps, which caused some initial problems.)
3. The Vite config may end up looking something like this: 
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

The `package.json`:
```js
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "tailwind-init": "tailwindcss init -p"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-vue-next": "^0.539.0",
    "reka-ui": "^2.4.1",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.3.6",
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^24.2.1",
    "@vitejs/plugin-vue": "^4.6.2",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.11",
    "vite": "^5.4.19"
  }
}

```

And `jsconfig.json`:
```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

Which will all be located inside the `/frontend/*` portion of the project's directory.

## knowledge requirements
Just take my advice and deeply know the frontend framework you'll be using **before** starting. Generally that's good advice for anything, but I can normally learn on the fly pretty well. When it comes to mixing about the stack for an application when I haven't done frontend ANYTHING in a long time... it's not worth it to spin your wheels with a brand new framework 😂.

I took a break and read through the Vue.js beginner documentation to get more familiar with what I needed it to do.

## setting up dark mode

In `style.css` make sure no other styles will affect certain aspects, and ensure the below items are present (mostly needed for tailwind anyways):

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```
## one big form

Wrapping `naabu` is just creating one single-page form with multiple options that can appear/disappear as needed.

## the go portion
Throw together a struct:
```go
type ScanOptions struct {
	ProjectID       string `json:"projectID"`
	ProxyOn         bool   `json:"proxyOn"`
	ProxyAddress    string `json:"proxyAddress"`
	TargetList      string `json:"targetList"`
	TargetPortRange string `json:"targetPortRange"`
	PassiveScan     bool   `json:"passiveScan"`
}
```

Pass the value to the struct:
