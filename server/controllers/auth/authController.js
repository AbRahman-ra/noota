// @ts-check

// CORE MODULES & SETUP
const User = require("../../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./../.env" });
const { createAccessToken, createRefreshToken } = require("./createTokens");

// INPUT VALIDATORS
const validateUsername = (username) => /^[a-zA-Z0-9_.]{3,15}$/.test(username);
const validateEmail = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

/******************************************************************************/

// CONTROLLERS

// SIGN UP USER
const signupUser = async (req, res) => {
  let { username, email = "", password, confirmPassword } = req.body;
  username = username.toLowerCase();
  email = email.toLowerCase();

  // [1] VALIDATE USER INPUT
  // [1.1] If username is not valid
  if (!validateUsername(username))
    return res.status(400).json({ msg: "username is not valid" });

  // [1.2] If there is an email and it's not valid
  if (email?.length && !validateEmail(email))
    return res.status(400).json({
      msg: "please enter a valid email or delete the whole field",
    });

  // [1.3] If password & confirm password don't match
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "passwords don't match" });

  // [2] CREATE NEW USER IN DATABASE
  try {
    // [2.1] Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // [2.2] Create Refresh & Access Tokens
    const refreshToken = createRefreshToken("username", username);
    const accessToken = createAccessToken("username", username);

    const body = {
      username,
      email: email,
      password: hashedPassword,
      refreshToken,
    };
    if (email === undefined) delete body.email;

    // [2.3] Store user data & refresh token in the database
    const newUser = await User.create(body);

    // [3] SEND REFRESH TOKEN AS HTTP ONLY COOKIE
    res.cookie("refJWT", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true, // uncomment on production
      maxAge: 24 * 60 * 60 * 1000, // in ms
    });

    // [4] SEND REFRESH TOKEN AS HTTP ONLY COOKIE
    res.status(201).json({ accessToken, newUser });
  } catch (err) {
    console.log(err);
  }
};

// ---------------------- //

// LOGIN USER
const loginUser = async (req, res) => {
  // Note that username is referring to "username or email" field in the frontend
  let { username, password } = req.body;
  username = username.toLowerCase();

  // [1] VALIDATE USER INPUT
  // [1.1] If username or email is not valid
  if (!validateUsername(username) && !validateEmail(username))
    return res.status(400).json({ msg: "username or email is not valid" });

  // [1.2] Determine input type
  const type = validateUsername(username) ? "username" : "email";

  // [2] FIND USER BY INPUT TYPE
  const foundUser =
    type === "username"
      ? await User.findOne({ username })
      : await User.findOne({ email: username });

  // [2.1] HANDLING USER THAT DOES NOT EXIST
  /* this is only for typescript to stop yelling at me (because @ts-check is enabled),
  but it's really redundant because our middleware beforeLogin is handling it) */
  if (!foundUser) return res.status(404).json({ msg: "user doesn't exist" });

  // [3] COMPARE PASSWORDS
  const samePasswords = await bcrypt.compare(password, foundUser?.password);
  if (samePasswords) {
    // [4] CREATE TOKENS, UPDATE / STORE REFRESH TOKEN INTO DB, RESPOND WITH BOTH TOKENS
    const refreshToken = createRefreshToken("username", username);
    const accessToken = createAccessToken("username", username);
    await User.findOneAndUpdate(
      { username: foundUser.username },
      { refreshToken }
    );

    res.cookie("refJWT", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true, // uncomment on production
      maxAge: 24 * 60 * 60 * 1000, // in ms
    });

    res.status(200).json({ accessToken });
  } else {
    // [4] INCORRECT PASSWORD
    res.status(400).json({ msg: "Incorrect Password" });
  }
};

// ---------------------- //

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refJWT;
  if (refreshToken)
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refJWT", {
    httpOnly: true,
    sameSite: "None",
    // secure: true, // uncomment on production
  });
  res.sendStatus(204);
  // On frontend => if status is 204 => delete access token
};

// ---------------------- //

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  validateUsername,
  validateEmail,
};
