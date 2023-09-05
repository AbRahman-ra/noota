const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is taken"],
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 101,
  },
});

module.exports = mongoose.model("User", userSchema);
