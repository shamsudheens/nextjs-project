"use client";

import React, { useState } from "react";
import { Task } from "../actions"; 

interface Props {
  onAdd: (task: Task) => void;
  onCancel?: () => void;
}

const AddTaskForm: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch("/api/addtasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      const newTask: Task = data.task;

      onAdd(newTask);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
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
