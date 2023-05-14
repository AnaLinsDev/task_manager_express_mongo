const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  deleteAllTasks,
  createTask,
  getTaskByID,
  updateTaskByID,
  deleteTaskByID,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask).delete(deleteAllTasks);

router
  .route("/:id")
  .get(getTaskByID)
  .patch(updateTaskByID)
  .delete(deleteTaskByID);

module.exports = router;
