import Project from "@/app/models/Project";
import connect from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {
    try {
      await connect();
      const projects = await Project.find({bought:true});
  
      if (!projects || projects.length === 0) {
        return new NextResponse('Projects not found', { status: 404 });
      }
  
      // Assuming projects is an array of objects, return it as is
      return new NextResponse(JSON.stringify(projects), { status: 200 });
    } catch (err) {
      console.error('Database Error:', err);
      return new NextResponse('Database Error', { status: 500 });
    }
  };