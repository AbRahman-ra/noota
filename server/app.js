// @ts-check

// CORE MODULES
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const userAvailable = require("./controllers/userAvailable");
const app = express();

// ROUTERS

// MIDDLEWARE
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
// app.use("path", router)

// UNPROTECTED ROUTES
app.route("/signup").post();
app.route("/login").post();
app.get("/api/users/(:username)?", userAvailable);

/**
 * - "/login" => Default
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
 */

module.exports = app;
