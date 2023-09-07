// @ts-check

const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { validateUsername, validateEmail } = require("../auth/authController");
const Task = require("../../models/Task");

// ---------------------- //

// GET USER ACCOUNT DATA
const getUserAccount = async (req, res) => {
  try {
    const { username } = req;
    const user = await User.findOne({ username }).select(
      "-__v -refreshToken -password"
    );
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "user not found" });
  }
};

// ---------------------- //

// UPDATE USER ACCOUNT DATA
const updateUserAccount = async (req, res) => {
  const jwtUsername = req.username;
  let body = {};
  const foundUser = await User.findOne({ username: jwtUsername });

  if (!foundUser)
    return res
      .status(401)
      .json({ msg: "token is invalid or user doesn't exist in database" });

  const { username, email, newPassword, confirmNewPassword } = req.body;

  // Update Username
  if (!validateUsername(username))
    return res
      .status(400)
      .json({ msg: "please enter a valid username or delete the field" });

  if (username && jwtUsername !== username && validateUsername(username)) {
    body["username"] = username;
    // If username will be updated, update all tasks with that username
    await Task.updateMany({ username: jwtUsername }, { username });
  }

  // Update / remove Email
  /**
   * (note we used "email !== undefined" instead of "!email" to include the case when
   * the user enters an empty string (they want to remove the email)
   */

  // User enters an email + email is different from the one in db + email is valid or empty string (remove email)
  if (
    email !== undefined &&
    email !== foundUser.email &&
    (validateEmail(email) || email === "")
  )
    body.email = email;
  else if (email && !validateEmail(email))
    return res
      .status(400)
      .json({ msg: "please enter a valid email or delete the field" });

  // Update Password
  if (newPassword !== undefined && confirmNewPassword !== undefined) {
    if (newPassword !== confirmNewPassword)
      return res.status(400).json({ msg: "new passwords don't match" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    body.password = hashedPassword;
  }

  // If no data is sent => error
  if (!body.username && body.email === undefined && !body.password)
    return res.status(400).json({ msg: "no data are sent to be updated" });

  const updatedUser = await User.findOneAndUpdate(
    { username: jwtUsername },
    body,
    {
      runValidators: true,
      new: true,
    }
  ).select("-__v -password -refreshToken");
  res.status(200).json({ msg: "updated successfully", user: updatedUser });
};

// ---------------------- //

// DELETE USER ACCOUNT
const deleteUserAccount = async (req, res) => {
  const { username } = req;
  try {
    await User.findOneAndDelete({ username });
    await Task.deleteMany({ username }); // delete all tasks for that user
    res.clearCookie("refJWT", {
      httpOnly: true,
      sameSite: "None",
      // secure: true, // uncomment on production
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(204); // user is already deleted
  }
};

module.exports = { getUserAccount, updateUserAccount, deleteUserAccount };
