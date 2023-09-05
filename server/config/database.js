// @ts-check

// CORE MODULES
const mongoose = require("mongoose");
require("dotenv").config({ path: "./../.env" });

// CONNECT TO DATABASE
const connectDB = async () => {
  try {
    if (process.env.DB_CONNECTION_URI && process.env.DB_CONNECTION_PASSWORD) {
      await mongoose.connect(
        process.env.DB_CONNECTION_URI?.replace(
          "{_}",
          process.env.DB_CONNECTION_PASSWORD
        )
      );
      console.log("Connected to DB...");
    }
  } catch (err) {
    console.log(err);
  }
};

// MODULE EXPORTS
module.exports = connectDB;
