import Task from "@/app/models/tasks";
import { NextResponse } from "next/server";
import dbcon from "@/app/lib/db";

export const POST = async (req:Request) =>{
    try{
        await dbcon()

        const body = await req.json();
        const{title,description,status} =body

        if(!title || typeof title !== "string")
        {
            return NextResponse.json(
                {message:"Title is required and must be string"},
                {status:400}
            )
        }

        const task = await Task.create(
            {
                title,
                description:description || "",
                status:status || "pending",
            }
        )

        return NextResponse.json({message:"Task added successfully",task},{status:200})
    }
    catch(err)
    {
        console.log("Internal server error",err)
        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
}