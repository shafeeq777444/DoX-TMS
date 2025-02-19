import React, { useEffect, useState } from "react";
import { MobileTaskForm } from "@/components/MobileTaskForm";
import { useTasks } from "@/context/taskContext";

const MobileKanban = ({ tasks, newTask, setNewTask, addingTask, setAddingTask, addTask, statuses }) => {
    const { moveTask, setOpenStatus, openStatus, deleteTask, fetchTasks, updateTask } = useTasks();
    const [editTask, setEditTask] = useState(null);
    const BASE_URL = "http://localhost:4200";

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEditChange = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        await updateTask(editTask._id, editTask);
        setEditTask(null);
    };

    const handleAttachmentChange = (e) => {
        const files = e.target.files;
        const newAttachments = [...(editTask.attachments || [])];
        for (let i = 0; i < files.length; i++) {
            newAttachments.push(files[i].name);  // Or handle files as needed
        }
        setEditTask({ ...editTask, attachments: newAttachments });
    };

    return (
        <div className="md:hidden space-y-2">
            {statuses.map((status) => (
                <div key={status} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <button
                        onClick={() => setOpenStatus(openStatus === status ? null : status)}
                        className="w-full text-left font-semibold text-lg flex justify-between items-center"
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        <span>{openStatus === status ? "▲" : "▼"}</span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                            openStatus === status ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-white p-3 rounded-lg shadow cursor-pointer"
                                    onClick={() => setEditTask(task)} // Open edit modal on click
                                >
                                    <p className="font-bold">{task.title}</p>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                                    {/* Display attachments if present
                                    {task.attachments && task.attachments.length > 0 && (
                                        <div className="mt-2">
                                            {task.attachments.map((attachment, index) => (
                                                <div key={index}>
                                                    {attachment.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                                        <a href={`${BASE_URL}/${attachment}`} download target="_blank">
                                                            <img
                                                                src={`${BASE_URL}/${attachment}`}
                                                                alt={`Task Attachment ${index + 1}`}
                                                                className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={`${BASE_URL}/${attachment}`}
                                                            download
                                                            target="_blank"
                                                            className="text-blue-500 underline block"
                                                        >
                                                            📄 {attachment}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )} */}
                                    <div className="flex gap-2 mt-2">
                                        {status !== "pending" && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering edit modal
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
                                </div>
                            ))}
                        {status === "pending" && (
                            <div className={`mt-2 ${openStatus === status ? "opacity-100" : "opacity-0"}`}>
                                {addingTask ? (
                                    <MobileTaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
                                ) : (
                                    <button
                                        onClick={() => setAddingTask(true)}
                                        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                                    >
                                        + Add Task
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Edit Modal */}
            {editTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5">
                        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            name="title"
                            value={editTask.title}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Task title..."
                        />
                        <textarea
                            name="description"
                            value={editTask.description}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Task description..."
                        />
                        <input
                            type="date"
                            name="dueDate"
                            value={editTask.dueDate}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        {/* Attachment Input */}
                        <div className="mb-2">
                            <input
                                type="file"
                                multiple
                                onChange={handleAttachmentChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Display Attachments */}
                        {editTask.attachments && editTask.attachments.length > 0 && (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {editTask.attachments.map((attachment, index) => (
                                    <div key={index}>
                                        {attachment.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                            <a href={`${BASE_URL}/${attachment}`} download target="_blank">
                                                <img
                                                    src={`${BASE_URL}/${attachment}`}
                                                    alt={`Task Attachment ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                                />
                                            </a>
                                        ) : (
                                            <a
                                                href={`${BASE_URL}/${attachment}`}
                                                download
                                                target="_blank"
                                                className="text-blue-500 underline block"
                                            >
                                                📄 {attachment}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditTask(null)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileKanban;
