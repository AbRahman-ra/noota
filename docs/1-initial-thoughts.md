# Initial Thoughts

Example account (can't be updated / deleted)

## Routes

- "/login" => Default
  - GET POST
- "/signup"
  - GET POST
- "/" (protected)
  - GET POST
- "/profile" (protected)
  - GET PATCH DELETE
- "/logout" (protected)
  - GET
- "/:id" (protected)
  - GET PATCH DELETE

"/" ✅
"/tasks" ❌
"/tasks/:id" ✅

## Logic

- If user requested protected => redirect to "/login"
- After "/login" & "/signup" (POST) => redirect to "/"
- After "/logout" => redirect to "/login"
- After "/profile" (DELETE) => redirect to "/logout" => redirect to "/login"
- After "/:id" (DELETE) => redirect to "/"
- Entering protected routes (required valid access token)
- Logging out => clear refresh token (from cookies & from database)
- Logging in => store refresh token in db + send httpOnly cookie
- Requesting protected routes with invalid token => force sign out (for security concerns) => redirect to "/logout" => redirect to "/login"

Thinking of deploying frontend on github pages, backend on render (until now)
