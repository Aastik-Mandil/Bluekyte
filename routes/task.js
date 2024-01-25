const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/", auth, getTasks);
router.get("/:id", auth, getTask);
router.post("/", auth, createTask);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
