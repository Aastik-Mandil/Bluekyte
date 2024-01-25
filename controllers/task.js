const mongoose = require("mongoose");

const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tasks fetched successfully",
      data: tasks,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while fetching tasks",
      data: null,
      error: err.message,
    });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      _id: id,
      user: req.userId,
    });
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Task fetched successfully",
      data: task,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while fetching task",
      data: null,
      error: err.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = { ...req.body, user: req.userId };
    const newTask = new Task(task);
    await newTask.save();
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Task created successfully",
      data: newTask,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while creating book",
      data: null,
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const findTask = await Task.findOne({
      _id: _id,
      user: req.userId,
    });
    if (findTask) {
      const task = { ...req.body, _id, user: req.userId };
      const updatedTask = await Task.findByIdAndUpdate(
        _id,
        task,
        { new: true }
      );
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Task updated successfully",
        data: updatedTask,
        error: null,
      });
    } else {
      return res.status(200).json({
        status: false,
        statusCode: 404,
        message: "No Task found",
        data: null,
        error: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while updating task",
      data: null,
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const findTask = await Task.findOne({
      _id: _id,
      user: req.userId,
    });
    if (findTask) {
      await Task.findByIdAndDelete(_id);
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Task deleted successfully",
        data: null,
        error: null,
      });
    } else {
      return res.status(200).json({
        status: false,
        statusCode: 404,
        message: "No Task found",
        data: null,
        error: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error while deleting task",
      data: null,
      error: err.message,
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
