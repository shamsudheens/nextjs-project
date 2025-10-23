"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const TaskDetailsPage = () => {
  const { id,slug } = useParams();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch specific task
  const fetchTask = async () => {
    try {
      const res = await fetch(`/api/showspecifictask/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch task");
      const data = await res.json();
      setTask(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mb-4"></div>
        <p>Loading Task...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );

  if (!task)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400">
        Task not found
      </div>
    );

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
          <button
            onClick={() => history.back()}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
