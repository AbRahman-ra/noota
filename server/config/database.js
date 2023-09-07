// @ts-check

const mongoose = require("mongoose");
require("dotenv").config({ path: "./../.env" });

const connectDB = async () => {
  if (process.env.DB_CONNECTION_URI && process.env.DB_PASSWORD) {
    try {
      await mongoose.connect(
        process.env.DB_CONNECTION_URI?.replace("{_}", process.env.DB_PASSWORD)
      );
      console.log("connected to DB...");
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = connectDB;
