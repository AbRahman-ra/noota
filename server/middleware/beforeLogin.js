// @ts-check

const User = require("../models/User");

// Check if username or email is in the database (login)
const checkUserLogin = async (req, res, next) => {
  // Determine the input is username or email
  const { username } = req.body;
  const inputType = /^[a-zA-Z0-9_.]{3,15}$/.test(username)
    ? "username"
    : "email";

  // Find user by username / email (if found => next)
  try {
    const foundUser =
      inputType === "username"
        ? await User.findOne({ username })
        : await User.findOne({ email: username });
    if (!foundUser)
      return res
        .status(404)
        .json({ msg: `${inputType} ${username} has no account` });
    else return next();
  } catch (err) {
    console.log(err);
  }
};

// If we found the logged in
// user login is fine is used ONLY with check user login function above
const userLoginIsFine = (req, res) => {
  const { username } = req.body;
  res.status(200).json({ msg: `${username} was found` });
};

module.exports = { checkUserLogin, userLoginIsFine };
