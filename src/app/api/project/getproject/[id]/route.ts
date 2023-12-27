import Project, { IProject } from '@/app/models/Project';
import connect from '@/app/utils/db';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import User from '@/app/models/User';

export const GET = async (request: any, { params }) => {
  const { id } = params;
  try {
    await connect();
    const projects = await Project.find({User:id,bought:false});

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

export const PATCH = async (request: any, { params }) => {

  const { id } = params;
  const body = await request.json();

  try {
    await connect();
    const updatedProject = await Project.updateOne(
      { _id: id }, // Find the project by its ID
      { $set: {
        project_name :body.project_name,
        onSale :true,
        price :body.price,
        project_desc :body.project_desc,
        technologies:body.technologies
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
