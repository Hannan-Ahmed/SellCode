// pages/api/auth/register/[email]/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/app/utils/db';
import User, { IUser } from '@/app/models/User';
import { NextResponse } from 'next/server';
export const GET = async (request: any, { params }: any) => {
    const { email } = params;
  
    try {
      await connect();
  
      const post = await User.findOne({ email: email as string });
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });    }
  };