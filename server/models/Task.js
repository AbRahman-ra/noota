const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (username) => /^[a-zA-Z0-9_.]{3,15}$/.test(username),
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "tasks" }
);

module.exports = mongoose.model("Task", taskSchema);
