import { NextResponse } from "next/server";
import dbcon from "@/app/lib/db";
import Task from "@/app/models/tasks";
import { TelemetryPlugin } from "next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin";

interface Params{
    params:{id:string}
}

export const DELETE = async (_req:Request,{params}:Params) =>{
    try{
        await dbcon()
        const {id} = params;
        const task = await Task.findByIdAndDelete(id)

        if(!task)
        {
            return NextResponse.json(
                {message:"Task not found"},
                {status:404}
            )
        }

        return NextResponse.json({message:"Task deleted successfully"},task)
    }
    catch(err)
    {
        console.log("Internal server error",err)
        return NextResponse.json(
            {message:"Internal Server Error"},
            {status:500}
        )
    }
}