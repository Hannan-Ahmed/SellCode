import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Error from "next/error";
import connect from "@/app/utils/db";
import User, { IUser } from "@/app/models/User";
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:process.env.CLIENTID,
      clientSecret:process.env.CLIENTSECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
   
   
      async authorize(credentials: { email: string; password: string }, req?: any) {
        await connect();
        console.log("sjkdasdajskdaskd")
        try {
          // const user = await User.findOne({ email: credentials.email }) as Document | null;
          const user: IUser | null = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              console.log("Login Successful")

              return {
                ...user.toObject(),
                id: user._id, // Assuming _id is the user ID field in your User model
              };
              

            } else {
              console.log("Password didn't match");
            }
          } else {
            console.log('User not found');

            return null;
          }
        } catch (err) {
          console.log("Error")
        }
      },
    }),
  ],

  pages: {
    error: "/dashboard/login",
  },
});

export { handler as GET, handler as POST };