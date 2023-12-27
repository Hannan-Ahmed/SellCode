"use client"
import React, { useEffect, useState } from "react";
import ProjectCards from "../components/ProjectCards/ProjectCards";
import { useSession } from "next-auth/react";
import { fetchUserData } from "../helpers/getuser";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }


const [projects, setProjects] = useState([]);

useEffect(() => {
  const fetchBoughtProjects = async () => { 
    try {
      const response = await axios.get(`http://localhost:3000/api/project/boughtprojects`);
      if (response.status === 200) {
        const projectsData = response.data;
        setProjects(projectsData);
      } else {
        console.error('Error fetching projects:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  fetchBoughtProjects();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Depe
  return (
    <div>
      <div className="text-center mb-10 text-3xl font-semibold">Purchased Projects</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 px-5">


      {projects.map((proj)=>(
        <ProjectCards project={proj} key={proj._id}/>
      ))}
      </div>
    </div>
  );
};

export default Page;
