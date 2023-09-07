// @ts-check

const express = require("express");
const {
  checkUsername,
  usernameIsFine,
  checkEmail,
  emailIsFine,
} = require("../../middleware/beforeSignup");
const {
  checkUserLogin,
  userLoginIsFine,
} = require("../../middleware/beforeLogin");
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../../controllers/auth/authController");
const getNewAccessToken = require("../../controllers/auth/getNewAccesToken");

const router = express.Router();

// Sign up
router.post("/signup/check-username", checkUsername, usernameIsFine); // check if username is taken
router.post("/signup/check-email", checkEmail, emailIsFine); // check if email is taken
router.post("/signup", checkUsername, checkEmail, signupUser); // create new user

// Login
router.post("/login/check", checkUserLogin, userLoginIsFine); // check if username / email exists when login
router.post("/login", checkUserLogin, loginUser); // login user

// Getting new Access Token
router.get("/refresh", getNewAccessToken); // get access token

// Logout
router.get("/logout", logoutUser); // logout user

module.exports = router;
