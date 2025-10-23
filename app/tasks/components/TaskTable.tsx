"use client";

import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskRow from "./TaskRow";
import EditTaskModal from "./EditTaskModal";
import { useRouter } from "next/navigation";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface Props {
  initialTasks: Task[];
  refreshTasks: () => void;
}

const TaskTable: React.FC<Props> = ({ initialTasks, refreshTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  const handleAdd = async (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    setShowAddForm(false);
    await refreshTasks();
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/deletetask/${id}`, { method: "DELETE" });
      if (res.ok) {
        await refreshTasks();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    await refreshTasks();
  };

  const handleRowClick = (task: Task) => {
    const slug = task.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""); // simple slugify

    router.push(`/tasks/${task._id}/${slug}`);
  };


  return (
    <div>
      {!showAddForm && (
        <button
          className="mb-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
          onClick={() => setShowAddForm(true)}
        >
          Add Task
        </button>
      )}

      {showAddForm && (
        <AddTaskForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}

      <table className="w-full table-auto border-collapse border border-yellow-400 mt-4 text-center">
        <thead>
          <tr className="bg-gray-900 text-yellow-400">
            <th className="border border-yellow-400 px-2 py-1">Title</th>
            <th className="border border-yellow-400 px-2 py-1">Description</th>
            <th className="border border-yellow-400 px-2 py-1">Status</th>
            <th className="border border-yellow-400 px-2 py-1">Created At</th>
            <th className="border border-yellow-400 px-2 py-1">Updated At</th>
            <th className="border border-yellow-400 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskRow
              key={task._id || index}
              task={task}
              onDelete={handleDelete}
              onUpdate={(t) => {
                handleUpdate(t);
                setEditingTask(null);
              }}
              onRowClick={handleRowClick}
              onEdit={() => setEditingTask(task)}
            />
          ))}
        </tbody>
      </table>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TaskTable;
