import User from "@/app/models/User";
import connect from "@/app/utils/db";
// import connect from "@/app/utils/db";
// import connect from "@/app/utils/db";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request:NextRequest) => {
    
    try {
        const body = await request.json();

        let username: string | undefined;
        let email: string | undefined;
        let password: string | undefined;

        // Check if the object contains 'username' property
        if ("username" in body) {
            username = body.username;
            email = body.email;
            password = body.password;
        } else if ("name" in body) { 
            // Check if the object contains 'name' property (assuming 'name' corresponds to 'username')
            username = body.name;
            email = body.email;
            password = body.password;
        } else {
            throw new Error("Invalid request body structure");
        }

        await connect();
        if (!password) {
            throw new Error('Password is undefined or empty');
        }
        const hashedpassword = await bcrypt.hash(password, 5);
        const newuser = new User({
            username,
            email,
            password: hashedpassword,
        });

        try {
            await newuser.save();
            return new NextResponse("user has been cretsed", { status: 201 });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error occurred";
            const responseBody = { message: errorMessage }; // Create an object with an error message

            return new NextResponse(JSON.stringify(responseBody), { status: 401 });
        }
        // return { message: "User created successfully" };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        const responseBody = { message: errorMessage }; // Create an object with an error message

        return new NextResponse(JSON.stringify(responseBody), { status: 401 });
    }
};
