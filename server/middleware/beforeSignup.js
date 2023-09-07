// @ts-check

const User = require("../models/User");

// Check if username is in the database (register)
const checkUsername = async (req, res, next) => {
  const { username } = req.body;
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser)
      return res.status(409).json({ msg: `username ${username} is taken` });
    else return next();
  } catch (err) {
    console.log(err);
  }
};

// username is fine is used ONLY with check username function above
const usernameIsFine = (req, res) => {
  const { username } = req.body;
  res.status(200).json({ msg: `username ${username} is available` });
};

// Check if email is in the database (register)
const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (email) {
      const foundUser = await User.findOne({ email });
      if (foundUser) res.status(409).json({ msg: `email ${email} is taken` });
      else return next();
    } else return next();
  } catch (err) {
    console.log(err);
  }
};

// email is fine is used ONLY with check email function above
const emailIsFine = (req, res) => {
  const { email } = req.body;
  res.status(200).json({ msg: `email ${email} is available to use` });
};

module.exports = { checkUsername, usernameIsFine, checkEmail, emailIsFine };
