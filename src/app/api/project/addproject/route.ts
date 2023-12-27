import Project from '@/app/models/Project';
import connect from '@/app/utils/db';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import User from '@/app/models/User';

export const POST = async (request:any) => {
  const body = await request.json();
  const headersList = headers();

  try {
    await connect();
    const username = headersList.get('username');
    const user = await User.findOne({ username }); // Assuming 'username' is the field in User model

    if (!user) {
      return new NextResponse('User not found project', { status: 404 });
    }
    const newProject = new Project(body);
    newProject.User = user._id;

    // Save the new project
    await newProject.save();

    return new NextResponse(newProject._id, { status: 201 });
  } catch (err) {
    console.error('Database Error:', err); // Log the actual error for debugging

    return new NextResponse('Database Error', { status: 500 });
  }
};



