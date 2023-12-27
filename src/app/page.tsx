"use client";
import Image from "next/image";
import DrawerBar from "./components/Drawer/DrawerBar";
import Drop from "./components/Dropcode/Drop";
import Leftbar from "./components/LeftBar/Leftbar";
import Illsutration1 from "../app/Images/illus1.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from "./Images/logo-modified.png";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  // console.log(session)

  const [show, setshow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setshow(false); 
    }, 1500);
  }, []);

  return (
    <div className=" h-max  ">
      {show && (
        <div
          style={{ width: "100vw" }}
          className="min-h-screen min-w-screen flex items-center justify-center nav  z-50 fixed top-0 right-0"
        >
          <Image
            src={logo}
            width={915}
            height={915}
            className="max-w-xs animate-pulse"
            alt="frontImage"
          />
        </div>
      )}
      <Image
        src={Illsutration1}
        width={915}
        height={915}
        className="ml-48 absolute top-11"
        alt="frontImage"
      />
    </div>
  );
}
