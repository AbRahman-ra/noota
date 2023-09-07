// @ts-check

const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { createAccessToken, createRefreshToken } = require("./createTokens");

const getNewAccessToken = async (req, res) => {
  // [1] EXTRACT THE REFRESH TOKEN FROM THE REQUEST COOKIES
  const refreshToken = req.cookies.refJWT;

  if (refreshToken && process.env.REFRESH_TOKEN_SECRET) {
    // [2] IF IT EXISTS, COMPARE IT WITH THE ONE IN DATABASE
    const foundUser = await User.findOne({ refreshToken });

    // [3] IF NO USER WAS FOUND => INVALIDATE REFRESH TOKEN & LOGOUT USER
    if (!foundUser)
      return res
        .status(403)
        .json({ msg: "refresh token is invalid, login again" });

    // [4] OTHERWISE, DECODE THE REFRESH TOKEN
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        // [4.1] IF WE CANNOT DECODE THE REFRESH TOKEN => DELETE IT FROM DATABASE AND LOGOUT USER
        if (err) {
          await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
          return res
            .status(403)
            .json({ msg: "refresh token is invalid, login again" });
        }

        // [4.2] OTHERWISE, ISSUE A NEW ACCESS TOKEN
        const accessToken = createAccessToken("username", payload.username);

        // [4.3] ADVANCED & OPTIONAL: CREATE A NEW REFRESH TOKEN WITH THE ACCESS TOKEN FOR MORE SECURITY
        // remove code between the dividers if you don't want it
        // ~~~~~~~~~~~ //
        const newRefreshToken = createRefreshToken(
          "username",
          payload.username
        );

        // [4.4] UPDATE THE DATABASE WITH THE NEW REFRESH TOKEN & SEND IT AS HTTP ONLY COOKIE
        await User.findOneAndUpdate(
          { refreshToken },
          { refreshToken: newRefreshToken }
        );

        res.cookie("refJWT", newRefreshToken, {
          httpOnly: true,
          sameSite: "None",
          // secure: true, // uncomment on production
          maxAge: 24 * 60 * 60 * 1000, // in ms
        });
        // ~~~~~~~~~~~ //

        // [4.5] SEND THE NEW ACCESS TOKEN
        res.status(200).json({ accessToken });
      }
    );
  } else if (process.env.REFRESH_TOKEN_SECRET)
    return res
      .status(401)
      .json({ msg: "refresh token was not received in the request" });
  else {
    console.log(
      "Refresh Token Secret is unreachable, please check your environment variables configuration"
    );
    return res
      .status(500)
      .json({ msg: "there is a problem in refresh token secret" });
  }
};

module.exports = getNewAccessToken;
