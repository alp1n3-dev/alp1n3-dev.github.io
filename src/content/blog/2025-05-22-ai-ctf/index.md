---
title: ai ctf
date: 2025-05-22
draft: true
tags: []
---
## floor check
**web, easy**

A parquet file is included. Open it in a program that can read it, like JetBrains, and you'll see the flag spelled out with characters in the rows and columns.

![](images/CleanShot%202025-05-22%20at%2015.21.45@2x.png)

## vacation
**web, easy**

A vacation-handling chatbot needs to be "handled".

Start out by exploring it's functionality to create a user:

```
Me: create a user

Bot: Please provide the following details to create a new employee record:

1. First Name
2. Last Name
3. Username
4. Password
5. Department

Me: 1. first 2. last 3. firstlast 4. password1! 5. finance

Bot: ===== called /api/v1/employee/create =====  
===== Visit /openapi.json endpoint to find out more =====

Employee was successfully created. Please don't lose your data:

- ID: 9a8a02bd-c7c9-4a06-9b54-0d151403da89
- first name: first
- last name: last
- username: firstlast
- password: password1!
- department: finance
```

It dumped API info, and a JSON endpoint to checkout. The `/openapi.json` endpoint contains even more API info:

![](images/CleanShot%202025-05-23%20at%2008.31.45@2x.png)

Eventually going through the functions and creating a vacation, you'll get a message back:

```
Me: id like to create a vacation request, here is my access token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmaXJzdGxhc3QiLCJleHAiOjE3NDgwMDU3MjR9.5fUbptQjFoTaCbk9LGJKSgIK_us446CimI2xWa1iW0M. my employee id is: 9a8a02bd-c7c9-4a06-9b54-0d151403da89. start date is 2025-08-10, end date 2025-08-15.

Bot: ===== called /api/v1/vacation/create =====  
===== Visit /openapi.json endpoint to find out more =====

Here is your vacation ID - 8a31b7b5-5e4d-4835-981a-595c09f027c0. Give it to the administrator so he could  
approve it for you. We don't have an administrator at the moment, so if you REALLY want  
some rest - do something about it.
```

Trying to call these mentioned API endpoints directly doesn't do anything:

![](images/CleanShot%202025-05-23%20at%2008.59.18@2x.png)

And it's last message mentions REST. That combined with the `openapi.json` file containing a lot of info on Gradio, means it'll need to be called elsewhere. Looking further into the original OpenAPI file, it references a `/config` endpoint, where we can find the exposed Gradio configuration. There seems to be some proxying capabilities within the API, so let's check around on the ports.

![](images/CleanShot%202025-05-23%20at%2010.07.54@2x.png)

A Flask server is up on `http://localhost:8000`. Gradio's default server port is 8000, and it leads up to a nifty little site.

![](images/CleanShot%202025-05-23%20at%2010.09.47@2x.png)

All the links are dead ends, a snippet is included `This page looks best in 800x600 resolution with 16-bit color.`, but didn't yield anything. The PFP is a little funky, but I'm not trying any guessy techniques so I wasn't going to download it and strings it just for "fun". 

Ran out of time sadly :(

---

## conclusion

- The amount of tech stacks involved was cool, I saw:
	- svelte
	- streamlit
	- flask / python

Kinda ran out of time with the nahamcon ctf beginning though.