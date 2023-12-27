"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PriceCard from "../components/priceCard/PriceCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/project/getproject`
        );
        if (response.status === 200) {
          const projectsData = response.data;
          setProjects(projectsData);
        } else {
          console.error("Error fetching projects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };
    fetchProjects();
  }, []);

  console.log(projects);
  return (
    <div>
      
      <div className="text-center mb-10 text-3xl font-semibold">Purchase a project tailored for your business</div>



      <div className="grid grid-cols-3 gap-4 pl-11 gap-y-5 ">
        {projects.map((proj) => (
          <>
          <PriceCard project={proj} />
         
          </>
        ))}
          

      </div>
    </div>
  );
};

export default Page;
