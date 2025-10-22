import mongoose, { Schema, Document, models } from "mongoose";

export interface Tasks extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<Tasks>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);

const Task = models.Tasks || mongoose.model<Tasks>("Task", TaskSchema);

export default Task;
