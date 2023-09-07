// @ts-check

const express = require("express");
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/task/tasksController");
const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();

router.use(verifyJWT).route("/").get(getTasks).post(createTask);

router
  .use(verifyJWT)
  .route("/:taskId")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
