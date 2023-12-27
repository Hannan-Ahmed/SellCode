"use client";
import React, { useState } from "react";
import logo from "../../Images/register.png";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { animations } from 'react-animation'

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const session=useSession()
  const style = { 
    animation: animations.popIn
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials",{email,password})
      
  };
  if(session.status==="authenticated")
  {
    router.push("/")
  }
  return (
    <div>
      <div className="container h-full px-6">
        <div className="g-1 flex h-full flex-wrap items-center justify-center lg:justify-evenly">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12" style={style}>
            <Image
              src={logo}
              width={1111}
              height={1111}
              // className="w-full"
              alt="Phone image"
            />
          </div>

          <div style={style}>
            <div 
              className="p-8 pt-0 rounded shadow-md w-96 sellform"
              style={{ height: "29rem" }}
            >
              <h2 className="text-2xl font-semibold mb-5 ml-32 pt-2 text-purple-600">
                Login
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 text-black py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Sign In
                </button>
                <Divider style={{ paddingTop: "1rem" }} />

                <h2 className="text-sm  ml-16 font-semibold mt-7 relative top-16 text-black">
                  Dont have an account{" "}
                  <Link href={"/signup"} className="text-purple-500 text-lg">
                    Signup
                  </Link>{" "}
                </h2>
              </form>
              <button
                type="submit"
                className="w-full mb-8 bg-blue-500 text-white py-3 relative bottom-6 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => signIn("google")}
              >
                <GoogleIcon /> Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
