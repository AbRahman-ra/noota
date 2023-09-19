// @ts-check

const Task = require("./../../models/Task");

// ---------------------- //

// GET ALL TASKS FOR SPECIFIC USER
const getTasks = async (req, res) => {
  const { username } = req;
  try {
    const userTasks = await Task.find({ username });
    if (!userTasks.length)
      return res
        .status(200)
        .json({ msg: "No tasks found, create your first task now" });
    res.status(200).json({ tasks: userTasks });
  } catch (err) {
    console.log(err);
  }
};

// ---------------------- //

// GET SPECIFIC TASK FOR SPECIFIC USER
const getSingleTask = async (req, res) => {
  const { username } = req;
  const { taskId } = req.params;
  try {
    const foundTask = await Task.findOne({ username, _id: taskId });
    if (!foundTask) return res.status(404).json({ msg: "Task Not Found" });
    res.status(200).json({ task: foundTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

// ---------------------- //

// CREATE NEW TASK
const createTask = async (req, res) => {
  const { username } = req;
  const { content, finished } = req.body;
  if (!content)
    return res.status(400).json({ msg: "a task must have a content" });
  try {
    const newTask = await Task.create({
      username,
      content,
      finished: finished || false,
    });
    res.status(201).json({ task: newTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

// ---------------------- //

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { content, finished } = req.body;
  if (!content && finished === undefined)
    return res.status(400).json({ msg: "cannot update empty task" });

  const body = { content, finished };
  if (!content) delete body.content;
  if (finished === undefined) delete body.finished;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "updated successfully", task: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

// ---------------------- //

const deleteTask = async (req, res) => {
  const { username } = req;
  const { taskId } = req.params;
  try {
    await Task.findOneAndDelete({ username, _id: taskId });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(204);
  }
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
