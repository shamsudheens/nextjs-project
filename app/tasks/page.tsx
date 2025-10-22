"use client";

import React, { useEffect, useState } from "react";
import TaskTable, { Task } from "./components/TaskTable";
import LoadingPage from "./components/LoadingPage";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/showalltasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400 neon-text">
        All Tasks
      </h1>

      <TaskTable initialTasks={tasks} refreshTasks={fetchTasks} />
    </div>
  );
};

export default Page;
