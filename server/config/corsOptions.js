const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, cbfn) => {
    if (allowedOrigins.includes(origin) || !origin)
      cbfn(null, true); // remove (|| !origin in production)
    else cbfn(new Error("Not Allowed by CORS"));
  },
};

module.exports = corsOptions;
