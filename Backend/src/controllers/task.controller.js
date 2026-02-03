import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title) {
    throw new ApiError(400, "Task title is required");
  }

  const task = await Task.create({
    title,
    description,
    status: status || "pending",
    dueDate,
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });

  return res.status(200).json(
    new ApiResponse(200, tasks, "Tasks fetched successfully")
  );
});


export const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findOne({
    _id: taskId,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: req.user._id },
    {
      $set: {
        title,
        description,
        status,
        dueDate,
      },
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});
