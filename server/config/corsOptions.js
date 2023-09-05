// @ts-check

const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) callback(null, true);
    else callback(new Error("Not Allowed By CORS"));
    console.log(origin);
  },
};

module.exports = corsOptions;
