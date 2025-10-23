// app/tasks/page.tsx (Server Component)
import TaskTable from "../../components/TaskTable";
import LoadingPage from "../../components/LoadingPage";
import dbcon from "@/lib/db";
import TaskModel from "@/models/tasks";
import type { Task } from "./actions";
import React from "react";


export const revalidate = 0;

const Page = async () => {
  await dbcon();
  const data = await TaskModel.find().sort({ createdAt: -1 }).lean();
  const tasks: Task[] = data.map((t: any) => ({
    _id: t._id.toString(),
    title: t.title,
    description: t.description,
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400 neon-text">
        All Tasks
      </h1>

      {/* Suspense shows loader until client component hydrates */}
      <React.Suspense fallback={<LoadingPage />}>
        <TaskTable initialTasks={tasks} />
      </React.Suspense>
    </div>
  );
};

export default Page;
