"use client";

import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskRow from "./TaskRow";
import EditTaskModal from "./EditTaskModal";
import LoadingPage from "./LoadingPage"; // your loading spinner component
import { useRouter } from "next/navigation";
import {
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
  Task as TaskType,
} from "../actions";

interface Props {
  initialTasks: TaskType[];
}

const TaskTable: React.FC<Props> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Add Task
  const handleAdd = async (newTaskData: { title: string; description?: string }) => {
    if (!newTaskData.title?.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      const newTask = await addTaskAction(newTaskData.title, newTaskData.description);
      setTasks([newTask, ...tasks]);
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Failed to add task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Task
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteTaskAction(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const handleUpdate = async (updatedTask: TaskType) => {
    try {
      setLoading(true);
      const updated = await updateTaskAction(updatedTask._id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });

      if (updated) {
        setTasks(tasks.map(task => (task._id === updated._id ? updated : task)));
        setEditingTask(null);
      }
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to task details
  const handleRowClick = (task: TaskType) => {
    const slug = task.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    router.push(`/tasks/${task._id}/${slug}`);
  };

  if (loading) return <LoadingPage />; // show loader when loading

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

      {showAddForm && <AddTaskForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />}

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
