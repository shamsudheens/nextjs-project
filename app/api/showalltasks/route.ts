import { NextResponse } from "next/server";
import dbcon from "@/lib/db";
import Task from "@/models/tasks";

export const GET = async()=>{
    try{
        await dbcon();
        const tasks = (await Task.find().sort({createdAt:-1}));
        if(!tasks)
        {
            return NextResponse.json({message:"tasks are empty"},{status:404})
        }
        else
        {
            return NextResponse.json(tasks,{status:200})
        }
    }
    catch(err)
    {
        console.log("error fetching tasks",err)
        return NextResponse.json(
            {error:"Failed to fetch tasks"},
            {status:500}
        )
    }
}