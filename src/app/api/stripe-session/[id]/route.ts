import Project from "@/app/models/Project";
import connect from "@/app/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: any, { params }) => {

    const { id } = params;  // Here id is the project id 
    const body = await request.json();
  
    try {
      await connect();
      const updatedProject = await Project.updateOne(
        { _id: id}, // Find the project by its ID
        { $set: {
          User:body.user,
          bought:true,
          onSale:false
          } } // Update the project_name field
      );
  
      if (updatedProject.nModified === 0) {
        return new NextResponse('Project not found or no modifications made', { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(updatedProject), { status: 200 });
    } catch (err) {
      console.error('Update Error:', err); // Log the specific error here
      return new NextResponse('Update Error', { status: 500 });
    }
  };