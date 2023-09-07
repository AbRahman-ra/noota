I now understood why the heck backend engineers use cringe endpoints like "/api/v1/blabla"

Simply because (specially in SPA) front end routing is independent of backend routing, and technically we're dealing with the API

Backend Routing:

- GET specific user (form validation)
- GET my account
- POST create account "/signup"
- POST login "/login"
- PATCH update account
- DELETE delete account
- GET all tasks
- GET Specific task
- POST create task
- PATCH update task
- DELETE delete task

Summarize

1. "/signup"
   - GET (frontend)
   - GET (frontend send request to "/api/auth/:username" on username input change) => form validation
   - POST (frontend send request to "/api/auth/signup") + frontend redirect to "/" on successful form submission
2. "/login"
   - GET (frontend)
     - If auth, redirect to "/"
   - POST (frontend sent request to "/api/auth/login") + frontend redirect to "/" on successful form submission
3. "/"
   - GET (frontend send request to "/api/tasks(?username=username/)?")
     - If not auth => redirect to "/login"
   - POST (frontend send request to "/api/tasks/")
4. "/:taskID"
   - GET (frontend send request to "/api/tasks/:taskID")
   - PATCH (frontend send request to "/api/tasks/:taskID")
   - Delete (frontend send request to "/api/tasks/:taskID")
5. "/profile"
   - GET (frontend send request to "/api/users/:username")
   - PATCH (frontend send request to "/api/users/:username")
   - DELETE (frontend send request to "/api/users/:username")
6. "/logout"
   - GET (frontend send request to "") + frontend redirect to "/login"

Routes Again

1. Authentication & authorization "/api/auth"
   - "/api/auth/signup" POST => create new user
   - "/api/auth/signup/:username" GET => check if user exists (signup form)
   - "/api/auth/login" POST => login user
   - "/api/auth/login/:username" GET => check if user exist (login form)
   - "/api/auth/:username" GET => get user data
   - "/api/auth/logout" GET => logout user
   - "/api/auth/refresh" GET => get access token

User Flow:

1. Sign up
   1. User enters username
   2. check if username is taken (query string? + response with boolean)
   3. user enters email
   4. check if email is taken (query string? + response with boolean)
   5. if email is not valid => empty it
   6. user enters password
