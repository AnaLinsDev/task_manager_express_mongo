const Task = require("../models/Task");
const EnumError = require("../enum/errors");
const mongoose = require("mongoose");

const { createCustomError } = require("../errors/custom-error");

//middlewares
const asyncWrapper = require("../middleware/async");

//methods

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

// --------------------------

const deleteAllTasks = asyncWrapper(async (req, res) => {
  await Task.deleteMany();
  res.status(200).json({ message: "Successfully deleted all" });
});

// --------------------------

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// --------------------------

const getTaskByID = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(taskId);

  if (!isValidId) {
    return next(createCustomError(EnumError.ID_NOT_VALID, 400));
  }

  const task = await Task.findById(taskId);

  if (!task) {
    return next(createCustomError(EnumError.TASK_NOT_FOUND, 404));
  }
  res.status(200).json({ task });
});

// --------------------------

const updateTaskByID = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const body = req.body;
  const isValidId = mongoose.Types.ObjectId.isValid(taskId);

  if (!isValidId) {
    return next(createCustomError(EnumError.ID_NOT_VALID, 400));
  }

  /*
      new: will return the new on the response,
      runValidators: will validate by the rules defined on the controller,
  */

  const task = await Task.findByIdAndUpdate(taskId, body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(EnumError.TASK_NOT_FOUND, 404));
  }
  res.status(200).json({ task });
});

// --------------------------

const deleteTaskByID = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(taskId);

  if (!isValidId) {
    return next(createCustomError(EnumError.ID_NOT_VALID, 400));
  }

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    return next(createCustomError(EnumError.TASK_NOT_FOUND, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  deleteAllTasks,
  createTask,
  getTaskByID,
  updateTaskByID,
  deleteTaskByID,
};
