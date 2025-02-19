import { useTasks } from "@/context/taskContext";
import { useState } from "react";

export const MobileTaskForm = () => {
  const { addTask } = useTasks();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    files: [],
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an Array

    // Get existing file names in state
    const existingFileNames = newTask.files.map((file) => file.name);

    // Filter out duplicates
    const uniqueFiles = selectedFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    if (uniqueFiles.length > 0) {
      setNewTask((prev) => ({
        ...prev,
        files: [...prev.files, ...uniqueFiles],
      }));
    }
  };

  const handleRemoveFile = (index) => {
    setNewTask((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTask.title);
    formData.append("description", newTask.description);
    formData.append("dueDate", newTask.dueDate);
    formData.append("status", "pending");

    newTask.files.forEach((file) => {
      formData.append("attachments", file);
    });

    await addTask(formData);
    setNewTask({ title: "", description: "", dueDate: "", files: [] });
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Task title..."
      />
      <input
        type="text"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Task description..."
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* File Upload */}
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {newTask.files.length > 0 && (
          <div className="space-y-1">
            {newTask.files.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <p className="text-sm text-gray-600">{file.name}</p>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 text-xs"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-3 py-2 rounded w-full"
      >
        Add Task
      </button>
    </div>
  );
};
