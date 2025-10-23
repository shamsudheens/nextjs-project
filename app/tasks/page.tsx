
import TaskTable from "./components/TaskTable";
import type { Task } from "./actions";
import LoadingPage from "./components/LoadingPage";
import dbcon from "@/app/lib/db";
import TaskModel from "@/app/models/tasks";

export const revalidate = 0; 

const Page = async () => {
  let tasks: Task[] = [];

  try {
    await dbcon();
    const data = await TaskModel.find().sort({ createdAt: -1 }).lean();
    tasks = data.map((t: any) => ({
      _id: t._id.toString(),
      title: t.title,
      description: t.description,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400 neon-text">
        All Tasks
      </h1>

      <TaskTable initialTasks={tasks} />
    </div>
  );
};

export default Page;
