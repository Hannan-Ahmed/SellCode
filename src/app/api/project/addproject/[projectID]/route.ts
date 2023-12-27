import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connect from "@/app/utils/db";
import Project from "@/app/models/Project";
import File from "@/app/models/File";
// import CodeFiles from '@/app/models/CodeFiles';
// import CodeFiles from '@/app/models/CodeFiles';

export const POST = async (request:any, { params }: any) => {
  const body = await request.json();
  const { projectID } = params;

  try {
    await connect();
    // const username = headersList.get('username');

    const project = await Project.findById(projectID); // Assuming 'username' is the field in User model
    console.log(project);
    if (!project) {
      return new NextResponse("project not found", { status: 404 });
    }
    const Codefile = new File(body);
    Codefile.Project = projectID;

    // Save the new project
    await Codefile.save();

    return new NextResponse("Codefile has been created", { status: 201 });
  } catch (err) {
    console.error("Database Error:", err); // Log the actual error for debugging

    return new NextResponse("Database Error", { status: 500 });
  }
};
