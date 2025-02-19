import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from "./middlewares/errorHandler.js";
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from "cookie-parser";

// config
dotenv.config();
const app = express();

// MongoDB Connection
connectDB()

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(cookieParser());

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)
app.use('/uploads', express.static('uploads'));

// error Handler
app.use(errorHandler);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
