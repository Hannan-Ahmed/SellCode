"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../helpers/getuser";

const Page = () => {
  const [show, setshow] = useState(true);
  const [user, setuser] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setshow(false);
    }, 1500);
  }, []);

  const session = useSession();
  useEffect(() => {
    fetchUserData(session.data?.user?.email)
      .then((userData) => {
        if (userData) {
          console.log("User Data:", userData);
          // Process the user data as needed
          setuser(userData); // Assuming userData contains the username property
        } else {
          console.log("User not found or error fetching data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [session.data?.user?.email]);
  console.log(user._id);

  return (
    <div>
      {show ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-7 rounded-md shadow-2xl w-1/3 flex items-center justify-evenly flex-col">
            <div>
              <img src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-727.gif" />
            </div>
            <div className="text-green-700 text-2xl font-semibold">
              Payment succesful
            </div>
          </div>
        </div>
      ) : (
        "hannan"
      )}
    </div>
  );
};

export default Page;
