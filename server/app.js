// @ts-check

// Core Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();

// Routers Initialization
const authRouter = require("./routers/api/userAuthRouter");
const userAccountRouter = require("./routers/api/userAccountRouter");
const tasksRouter = require("./routers/api/tasksRouter");
const errHandler = require("./middleware/errorHandler");

// Middleware Configurations
app.use(credentials);
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(errHandler);

// Routes & Routers
app.use("/api/auth", authRouter); // Authentication
app.use("/api/profile", userAccountRouter); // Account Settings
app.use("/api/tasks", tasksRouter); // Tasks

module.exports = app;
