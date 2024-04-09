// @ts-check

const jwt = require("jsonwebtoken");

const createRefreshToken = (payloadKey, payloadValue) => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    let payload = {};
    payload[payloadKey] = payloadValue;
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return refreshToken;
  } else {
    console.error(
      "refresh token is missing, please check your environment variables"
    );
    return "";
  }
};

const createAccessToken = (payloadKey, payloadValue) => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    const payload = {};
    payload[payloadKey] = payloadValue;
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    return accessToken;
  } else {
    console.error(
      "access token is missing, please check your environment variables"
    );
    return "";
  }
};

module.exports = { createRefreshToken, createAccessToken };
