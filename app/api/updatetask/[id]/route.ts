import Task from "@/models/tasks";
import dbcon from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string }
}

export const PUT = async (req: Request, context: { params: Promise<{ id: string }> }) => {
  try {
    await dbcon();

    const { id } = await context.params;

    const body = await req.json();
    const { title, description, status } = body;

    const validStatuses = ["pending", "in-progress", "completed"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: `Invalid status. Must be one of ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (err) {
    console.error("Internal server error", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

