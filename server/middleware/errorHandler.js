// @ts-check

const errHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ err });
};

module.exports = errHandler;
