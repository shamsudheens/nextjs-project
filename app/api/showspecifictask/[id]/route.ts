import { NextResponse } from "next/server";
import dbcon from "@/app/lib/db";
import Task from "@/app/models/tasks";

interface Params{
    params:{id:string}
}

export const GET = async(_req:Request,{params}:Params)=>{
    try{
        await dbcon()
        const id= params.id;
        const task = await Task.findById(id);

        if(!task)
        {
            return NextResponse.json(
                {message:"Task not found"},
                {status:404}
            )
        }   

        return NextResponse.json(task,{status:200})
    }
    catch(err)
    {
        console.log("error fetching task",err);
        return NextResponse.json({message:"error fetching task"},{status:500})
    }
}