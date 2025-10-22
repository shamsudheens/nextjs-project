"use client";

import React, { useState } from "react";
import { Task } from "./TaskTable"; // Import Task type

interface Props {
  onAdd: (task: Task) => void;
  onCancel?: () => void;
}

const AddTaskForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/addtasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });
    const newTask = await res.json();
    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-lg w-96 flex flex-col gap-4 text-white border border-yellow-400"
      >
        <h2 className="text-2xl font-bold text-yellow-400 neon-text">
          Add New Task
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="p-2 rounded bg-gray-900 text-white border border-yellow-400"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 rounded bg-gray-900 text-white border border-yellow-400"
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
