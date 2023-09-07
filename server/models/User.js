const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: (username) => /^[a-zA-Z0-9_.]{3,15}$/.test(username),
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
