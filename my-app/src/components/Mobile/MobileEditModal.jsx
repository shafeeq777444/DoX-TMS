import { useTasks } from '@/context/taskContext';
import React from 'react'

const MobileEditModal = ({editTask,setEditTask}) => {
        const {  updateTask} = useTasks();
        const BASE_URL = "http://localhost:4200";
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
  )
}

export default MobileEditModal
