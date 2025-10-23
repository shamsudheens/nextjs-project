"use client";

import React from "react";
import { Task } from "../app/tasks/actions";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onRowClick?: (task: Task) => void;
}



const TaskRow: React.FC<Props> = ({ task, onDelete, onEdit, onRowClick }) => {
  return (
    <tr
      className="border-yellow-400 text-yellow-400 text-center hover:bg-yellow-900/20 cursor-pointer transition"
      onClick={() => onRowClick && onRowClick(task)}
    >
      <td className="px-4 py-2">{task.title}</td>
      <td className="px-4 py-2">{task.description || "-"}</td>
      <td className="px-4 py-2 capitalize">{task.status}</td>
      <td className="px-4 py-2">{new Date(task.createdAt).toLocaleString()}</td>
      <td className="px-4 py-2">{new Date(task.updatedAt).toLocaleString()}</td>
      <td className="px-4 py-2 flex justify-center gap-2">
        <button
          className="px-2 py-1 bg-green-500 text-black rounded hover:bg-green-600"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-black rounded hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
