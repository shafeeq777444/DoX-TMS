import React, { useEffect, useState } from "react";
import { MobileTaskForm } from "@/components/Mobile/MobileTaskForm";
import { useTasks } from "@/context/taskContext";
import MobileTaskButtons from "./MobileTaskButtons";
import MobileEditModal from "./MobileEditModal";

const MobileKanban = () => {
    const {  setOpenStatus, openStatus,  fetchTasks, tasks,statuses } = useTasks();
     const [addingTask, setAddingTask] = useState(false);
    const [editTask, setEditTask] = useState(null);


    useEffect(() => {
        fetchTasks();
    }, []);

    

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
                                   <MobileTaskButtons task={task} status={status} />
                                </div>
                            ))}
                        {status === "pending" && (
                            <div className={`mt-2 ${openStatus === status ? "opacity-100" : "opacity-0"}`}>
                                {addingTask ? (
                                    <MobileTaskForm  />
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
               <MobileEditModal editTask={editTask} setEditTask={setEditTask}/>
            )}
        </div>
    );
};

export default MobileKanban;
