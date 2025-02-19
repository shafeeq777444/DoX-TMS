import { useTasks } from "@/context/taskContext";
import React from "react";

const MobileTaskButtons = ({status,task}) => {
      const { moveTask, deleteTask } = useTasks();
    return (
        <div className="flex gap-2 mt-2">
            {status !== "pending" && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); 
                        moveTask(task._id, -1);
                    }}
                    className="w-1/2 bg-red-500 text-white p-2 rounded"
                >
                    ← Move Back
                </button>
            )}
            {status !== "completed" && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        moveTask(task._id, 1);
                    }}
                    className="w-1/2 bg-green-500 text-white p-2 rounded"
                >
                    Move Forward →
                </button>
            )}
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
    );
};

export default MobileTaskButtons;
