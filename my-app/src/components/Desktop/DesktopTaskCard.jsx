import React from "react";
import { motion } from "framer-motion";
import { useTasks } from "@/context/taskContext";

const TaskCard = ({ task ,index,setEditTask}) => {
    const { moveTask, deleteTask } = useTasks();
    return (
        <motion.div 
            key={task._id}
            
            transition={{ duration: 0.3 }}
            className="bg-white p-3 rounded-lg shadow cursor-pointer"
            onClick={() => setEditTask(task)} // Open edit modal when clicking the task card
        >
            <p className="font-bold">{task.title}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-gray-500">Due: {task.dueDate}</p>

            <div className="flex gap-2 mt-2">
                {/* {task.status !== "pending" && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering edit modal
                            moveTask(task._id, -1);
                        }}
                        className="w-1/3 bg-red-500 text-white p-2 rounded"
                    >
                        ← Move Back
                    </button>
                )}
                {task.status !== "completed" && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task._id, 1);
                        }}
                        className="w-1/3 bg-green-500 text-white p-2 rounded"
                    >
                        Move Forward →
                    </button>
                )} */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                    }}
                    className="w-1/3 bg-gray-500 text-white p-2 rounded"
                >
                    🗑 Delete
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
