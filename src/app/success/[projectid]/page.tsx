"use client";
import { fetchUserData } from "@/app/helpers/getuser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { animations } from "react-animation";
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

const Page = ({ params }) => {
  const { projectid } = params;
  const [user, setUser] = useState(null);
  const session = useSession();
  const [show, setshow] = useState(true);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [show4, setshow4] = useState(false);

  const style = {
    animation: animations.fadeIn,
  };
  const router=useRouter()

  useEffect(() => {
    setTimeout(() => {
      setshow(false);
      setTimeout(() => {
        setshow2(true);
        setTimeout(() => {
          setshow2(false);
          setshow3(true);

setTimeout(() => {
  setshow3(false);
  setshow4(true);
  setTimeout(() => {
    router.push("/sellproject")
  }, 1400);
}, 1500);


        }, 2500);
      }, 1500);
    }, 1500);
  }, []);
  useEffect(() => {
    fetchUserData(session.data?.user?.email)
      .then((userData) => {
        if (userData) {
          console.log("User Data:", userData);
          setUser(userData); // Set the entire user data
        } else {
          console.log("User not found or error fetching data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.data?.user?.email]);

  useEffect(() => {
    async function updateProjectUser() {
      try {
        if (user) {
          const response = await axios.patch(
            `http://localhost:3000/api/stripe-session/${projectid}`,
            { user: user._id } // Pass only the user._id
          );

          if (response.status === 200) {
            console.log("Success: Updated the project user");
          } else {
            console.error("Error:", response.data);
          }
        }
      } catch (error) {
        console.error("Request Error:", error);
      }
    }

    updateProjectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);




  

  return (
    <div>
      {show ? (
        <div
          style={style}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center   z-50"
        >
          <div className=" p-7 gap-2 rounded-md  w-1/3 flex items-center justify-evenly flex-col">
            <div style={style}>
              <img src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-727.gif" />
            </div>
            <div className="text-green-600 text-2xl font-semibold">
              Payment succesful
            </div>
          </div>
        </div>
      ) : (
        <div
          style={style}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        >
          <div className=" p-7 rounded-md  w-1/3 flex items-center justify-evenly flex-col">
            <div style={style}>
              <img
                className="w-56 h-1/2"
                src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif"
              />
            </div>
            <div
              style={style}
              className="text-blue-500 text-2xl font-semibold"
            >
              {/* <span style={style}>{show2 && 'please wait'}</span> */}

              
              {show2 && <span style={style}> Please Wait</span>}

              <span style={style}>
                {" "}

                
                {show3 && <span style={style}> Securing project resources</span>}
                {show4 && <span style={style}> Redirecting</span>}

              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
