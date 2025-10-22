"use client";

import React from "react";
import { Task } from "./TaskTable";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
  onEdit: () => void;
}

const TaskRow: React.FC<Props> = ({ task, onDelete, onEdit }) => {
  return (
    <tr className="border-yellow-400 text-yellow-400 text-center">
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2">{task.description || "-"}</td>
      <td className="px-4 py-2 capitalize">{task.status}</td>
      <td className="px-4 py-2">{new Date(task.createdAt).toLocaleString()}</td>
      <td className="px-4 py-2">{new Date(task.updatedAt).toLocaleString()}</td>
      <td className="px-4 py-2 flex justify-center gap-2">
        <button
          className="px-2 py-1 bg-green-500 text-black rounded hover:bg-green-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-black rounded hover:bg-red-600"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
