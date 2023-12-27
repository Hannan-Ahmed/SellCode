"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import axios from "axios";
import ProjectCards from "@/app/components/ProjectCards/ProjectCards";


const Page = ({ params }) => {
const{projectid}=params

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsByUserId = async () => { 
      try {
        const response = await axios.get(`http://localhost:3000/api/project/getproject/${projectid}`);
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

    fetchProjectsByUserId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency array to run effect when userId changes

  return (
    <div>
      <div className="text-center mb-10 text-3xl font-semibold">Monitor, Sell, View Your Projects</div>

      <div className="grid grid-cols-4 gap-6 px-4">
     
     {projects.map((project) => ( 
          <ProjectCards project={project} key={project._id}   />
          ))}
     
          </div>
           
    </div>
  );
};

export default Page;
