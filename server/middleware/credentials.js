// @ts-check

const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  if (allowedOrigins.includes(req.header.origins)) {
    res.header("Access-Control-Allow-Origin", true);
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
