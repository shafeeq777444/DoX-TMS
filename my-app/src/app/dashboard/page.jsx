"use client";
import React, { useState } from "react";
import DesktopKanban from "@/components/DesktopKanban";
import MobileKanban from "@/components/MobileKanban";
import { useTasks } from "@/context/taskContext";

const initialTasks = [
  { id: 1, title: "Task 1", description: "This is task 1", dueDate: "2025-02-20", status: "pending" },
  { id: 2, title: "Task 2", description: "This is task 2", dueDate: "2025-02-22", status: "inProgress" },
  { id: 3, title: "Task 3", description: "This is task 3", dueDate: "2025-02-25", status: "completed" },
];

const statuses = ["pending", "inProgress", "completed"];

const KanbanBoard = () => {
  const {tasks,updateTask}=useTasks()
  
 
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const [addingTask, setAddingTask] = useState(false);

  // const moveTask = (taskId, direction) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) => {
  //       if (task._id === taskId) {
  //         const currentIndex = statuses.indexOf(task.status);
  //         const newIndex = currentIndex + direction;
  //         if (newIndex >= 0 && newIndex < statuses.length) {
  //           const newStatus = statuses[newIndex];
  //         setOpenStatus(newStatus); // Update dropdown to open the new status
  //         return { ...task, status: newStatus };
  //         }
  //       }
  //       return task;
  //     })
  //   );
  // };

  // const addTask = () => {
  //   if (!newTask.title.trim()) return;
  //   setTasks([...tasks, { id: tasks.length + 1, ...newTask, status: "pending" }]);
  //   setNewTask({ title: "", description: "", dueDate: "" });
  //   setAddingTask(false);
  // };

  return (
    <div className="p-4">
      {/* Mobile View - Dropdowns */}
      <MobileKanban  tasks={tasks}  newTask={newTask} setNewTask={setNewTask} addingTask={addingTask} setAddingTask={setAddingTask}  statuses={statuses}/>
       {/* Desktop View - Kanban Board */}
     <DesktopKanban tasks={tasks}  newTask={newTask} setNewTask={setNewTask} addingTask={addingTask} setAddingTask={setAddingTask} statuses={statuses}/>
    </div>
  );
};

export default KanbanBoard;
