// @ts-check

const express = require("express");
const {
  getUserAccount,
  updateUserAccount,
  deleteUserAccount,
} = require("../../controllers/user/userAccountController");
const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();

router
  .use(verifyJWT)
  .route("/")
  .get(getUserAccount)
  .patch(updateUserAccount)
  .delete(deleteUserAccount);

module.exports = router;
