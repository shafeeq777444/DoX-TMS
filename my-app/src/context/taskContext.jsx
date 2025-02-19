"use client";
import { useState, createContext, useContext } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const statuses = ["pending", "inProgress", "completed"];
    const [openStatus, setOpenStatus] = useState("pending");
    const [tasks, setTasks] = useState([]);

    /**
     * fetching all tasks
     */
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:4200/api/tasks", { withCredentials: true });
            console.log(data);
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    /**
     * AddTask
     */
    const addTask = async (task) => {
        try {
            const { data } = await axios.post("http://localhost:4200/api/tasks", task, { withCredentials: true });
            setTasks([...tasks, data]);
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    /**
     *Edit Task
     */
    const updateTask = async (id, updatedTask) => {
        try {
            const { data } = await axios.patch(`http://localhost:4200/api/tasks/${id}`, updatedTask, {
                withCredentials: true,
            });
            setTasks(tasks.map((task) => (task._id === id ? data : task)));
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    /**
     * soft Delete
     */
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:4200/api/tasks/${id}`, { withCredentials: true });
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    /**
     * Move Task (mobile view)
     */
    const moveTask = async (taskId, direction) => {
        // Find the current task
        const task = tasks.find((task) => task._id === taskId);
        if (!task) return;

        const currentIndex = statuses.indexOf(task.status);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < statuses.length) {
            const newStatus = statuses[newIndex];

            const id = taskId;
            try {
                // Send update request to backend
                await axios.patch(
                    `http://localhost:4200/api/tasks/${id}`,
                    { status: newStatus },
                    { withCredentials: true }
                );

                // Update local state only if API call succeeds
                setTasks((prevTasks) => prevTasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)));
            } catch (error) {
                console.error("Error updating task status:", error);
            }
            setOpenStatus(newStatus);
        }
    };

    /**
     * Drag Task (Desktop view)
     */
    const updateDrag = async (taskss) => {
        try {
            const updatedTasks = taskss.map((task) => ({
                id: task._id,
                status: task.status,
                order: task.order,
            }));

            await axios.patch(
                `http://localhost:4200/api/tasks/drag-update`,
                { tasks: updatedTasks },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error updating tasks:", error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                deleteTask,
                fetchTasks,
                moveTask,
                openStatus,
                setOpenStatus,
                setTasks,
                updateDrag,
                statuses,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);