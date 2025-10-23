"use client";

import React, { useState } from "react";
import { Task } from "../actions";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<Props> = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<Task["status"]>(task.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/updatetask/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    if (res.ok) {
      const updatedTask = await res.json();
      onUpdate(updatedTask);
      onClose();
    } else {
      console.error("Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-lg w-96 flex flex-col gap-4 text-white"
      >
        <h2 className="text-4xl font-bold text-yellow-400 text-center">Edit Task</h2>

        <input
          className="p-2 rounded bg-gray-900 text-white border border-yellow-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="p-2 rounded bg-gray-900 text-white border border-yellow-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select
          className="p-2 rounded bg-gray-900 text-white border border-yellow-400"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
