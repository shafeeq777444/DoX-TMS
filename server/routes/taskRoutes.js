import express from "express";
import { createTaskController, getTasksController,updateTaskController, deleteTaskController,getIndividualTaskController, generateTaskPDF, dragTaskUpdate } from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/",verifyToken,upload.array("attachments",5),createTaskController);
router.get("/",verifyToken, getTasksController);
router.get("/:id",verifyToken, getIndividualTaskController);
router.delete("/:id",verifyToken, deleteTaskController);
router.patch('/drag-update', dragTaskUpdate);
router.get("/download/pdf", verifyToken, generateTaskPDF);
router.patch("/:id",verifyToken, updateTaskController);

export default router;
