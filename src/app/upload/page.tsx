"use client";
import React from "react";
import Leftbar from "../components/LeftBar/Leftbar";
import Drop from "../components/Dropcode/Drop";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  return (
    <div>
      <div className="flex items-start justify-between ">
        <Leftbar />
        <Drop />
      </div>
    </div>
  );
};

export default Page;
