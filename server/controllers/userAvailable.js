// @ts-check

// CORE MODULES
// @ts-ignore
const User = require(`${__dirname}/../model/User`);

const userAvailable = async (req, res) => {
  console.log(req.headers);
  try {
    const { username } = req.params;
    if (!username)
      return res
        .status(400)
        .json({ msg: "username can't be blank", status: "warn" });
    const foundUser = await User.findOne({ username });
    if (!foundUser)
      res
        .status(200)
        .json({ msg: `username ${username} is available`, status: "ok" });
    else
      res
        .status(409)
        .json({ msg: `username ${username} already exist`, status: "err" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userAvailable;
