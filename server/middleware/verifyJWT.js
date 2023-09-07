// @ts-check

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./../.env" });

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; //Bearer <access token>
  if (!authHeader)
    return res.status(401).json({ msg: "please login or sign up" });
  const accessToken = authHeader.split(" ")[1];

  if (process.env.ACCESS_TOKEN_SECRET) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return res.status(403).json({ msg: "couldn't decode token" });
      req.username = payload.username;
      next();
    });
  } else {
    console.log(
      "Couldn't retrieve access token secret, please check environment variables"
    );
    return res
      .status(500)
      .json({ err: "error, couldn't find access token secret" });
  }
};

module.exports = verifyJWT;
