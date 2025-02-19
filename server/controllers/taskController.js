
import asyncHandler from "../middlewares/asyncHandler.js";
import { createTask, getUserTasks,  updateTask, deleteTask ,getTaskById,generateTaskPDFService, dragTaskUpdateService} from "../services/taskService.js";
import fs from "fs";

/**
 * Create Task
 */
export const createTaskController = asyncHandler(async (req, res) => {
  console.log(req.user.id,"check")
  const attachments = req.files ? req.files.map((file) => file.path) : [];
  const task = await createTask(req.user.id,{...req.body,attachments});
  res.status(201).json(task);
});

/**
 * Get All Tasks
 */
export const getTasksController = asyncHandler(async (req, res) => {
  const tasks = await getUserTasks(req.user.id);
  console.log(tasks)
  res.json(tasks);
});

/**
 * Get Single Task
 */
export const getIndividualTaskController = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.params.id, req.user.id); 
  res.json(task);
});

/**
 * Update Task
 */
export const updateTaskController = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const task = await updateTask(req.params.id, req.user.id, req.body); 
  res.json(task);
});

/**
 * Delete Task
 */
export const deleteTaskController = asyncHandler(async (req, res) => {
  const response = await deleteTask(req.params.id, req.user.id);
  res.json(response);
});

/**
 * update Drag files(bulk files)
 */
export const dragTaskUpdate = asyncHandler(async (req, res) => {
  const { tasks } = req.body; 
  await dragTaskUpdateService(tasks);
  res.status(200).json({ message: "Tasks updated successfully" });
});

/**
 * Generate PDF
 */
export const generateTaskPDF = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const filePath = await generateTaskPDFService(userId);

  res.download(filePath, `tasks-${userId}.pdf`, () => {
      fs.unlinkSync(filePath); // Delete file after download
  });
});
