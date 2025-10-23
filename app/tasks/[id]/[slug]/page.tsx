import { notFound } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInstance";
import React from "react";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const TaskDetailsPage = async ({
  params,
}: {
  params: Promise<{ id?: string; slug?: string }>;
}) => {
  const { id, slug } = await params;

  if (!id) {
    console.error("TaskDetailsPage: Missing 'id' in params:", params);
    notFound();
  }

  let task: Task | null = null;
  try {
    const res = await axiosInstance.get(`/api/showspecifictask/${id}`);
    task = res.data;
  } catch (err: any) {
    console.error("Failed to fetch task:", err.message);
    notFound();
  }

  if (!task) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-neutral-900 rounded-2xl shadow-[0_0_20px_rgba(255,255,0,0.2)] p-8 transition-transform hover:scale-[1.02] duration-300">
        <h1 className="text-3xl font-bold mb-4 text-yellow-300 text-center">
          {task.title}
        </h1>
        <p className="text-gray-300 mb-6 text-center">
          {task.description || "No description provided."}
        </p>
        <div className="border-t border-yellow-700 my-4"></div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Status:</span>
          <span className="text-yellow-300 capitalize">{task.status}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Created:</span>
          <span>{new Date(task.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Updated:</span>
          <span>{new Date(task.updatedAt).toLocaleString()}</span>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/tasks"
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
