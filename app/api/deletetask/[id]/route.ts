import { NextResponse } from "next/server";
import dbcon from "@/app/lib/db";
import Task from "@/app/models/tasks";

interface Params {
  params: { id: string };
}

export const DELETE = async (_req: Request, { params }: Params) => {
  try {
    await dbcon();

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully", task }, { status: 200 });
  } catch (err) {
    console.log("Internal server error", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
