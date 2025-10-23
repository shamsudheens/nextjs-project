
"use server";

import dbcon from "@/app/lib/db";
import Task from "@/app/models/tasks";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

const formatTask = (t: any): Task => ({
  _id: t._id.toString(),
  title: t.title,
  description: t.description,
  status: t.status,
  createdAt: t.createdAt.toISOString(),
  updatedAt: t.updatedAt.toISOString(),
});

export async function getTasks(): Promise<Task[]> {
  await dbcon();
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();
  return tasks.map(formatTask);
}

export async function getTaskById(id: string): Promise<Task | null> {
  await dbcon();
  const task = await Task.findById(id).lean();
  return task ? formatTask(task) : null;
}

export async function addTaskAction(title: string, description?: string): Promise<Task> {
  await dbcon();
  const task = await Task.create({ title, description });
  return formatTask(task); 
}


export async function updateTaskAction(
  id: string,
  updatedData: Partial<Omit<Task, "_id" | "createdAt" | "updatedAt">>
): Promise<Task | null> {
  await dbcon();
  const task = await Task.findByIdAndUpdate(id, updatedData, { new: true }).lean();
  return task ? formatTask(task) : null;
}

export async function deleteTaskAction(id: string): Promise<boolean> {
  await dbcon();
  const result = await Task.findByIdAndDelete(id);
  return !!result;
}
