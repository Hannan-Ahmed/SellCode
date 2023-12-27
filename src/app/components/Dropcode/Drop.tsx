"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { animations } from 'react-animation'
import { useSession } from "next-auth/react";
import { fetchUserData } from "@/app/helpers/getuser";
import axios from "axios";

const Drop = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const session=useSession()
  
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const [fileContents, setFileContents] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('');
  const [user, setuser] = useState({});
  const [project, setproj] = useState(null);

  useEffect(() => {
    fetchUserData(session.data?.user?.email)
      .then((userData) => {
        if (userData) {
          console.log('User Data:', userData);
          // Process the user data as needed
          setuser(userData); // Assuming userData contains the username property
        } else {
          console.log('User not found or error fetching data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [session.data?.user?.email]);


 let  projectid: Number;



  const handleProjectNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setProjectName(event.target.value);
  };

  const readFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const content: string = event.target.result.toString();
        setFileContents((prevContents) => [...prevContents, content]);
      }
    };
    reader.readAsText(file);
  };

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setUploadedFiles(acceptedFiles);
    acceptedFiles.forEach((file) => {
      readFileContent(file);
    });
  }, []);

// *************************************

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    // accept: ['.zip/', 'image/*', 'video/*', 'audio/*', '.pdf', '.doc', '.docx'], // Define accepted file types
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files) {
      const fileList: File[] = Array.from(files);
      const validFiles: FileWithPath[] = fileList.map((file) => ({
        ...file,
        path: URL.createObjectURL(file),
      }));
      setUploadedFiles(validFiles);
    }
  };
  const style = {
    animation: animations.popIn
  }
  
  // ***********************************
  



  const createProject = async () => {
    const projectData = {
      project_name: projectName,
      // User: projectName,
    };

    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
    try {
      const response = await axios.post('http://localhost:3000/api/project/addproject', projectData, {
        headers: {
          'Content-Type': 'application/json',
          'username': user.username, // Replace 'your_username_here' with the actual username
        },
      });

      if (response.status === 201) {
        console.log('Success:', response.data)
        projectid=response.data
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Error:', response.data);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Request Error:', error);
      // Handle request error, e.g., show an error message to the user
    }

    // ***************************************************

    const filesData = uploadedFiles.map((file, index) => ({
      fileName: file.name,
      content: fileContents[index],
    }));
    
    // Convert the array of objects to a single JSON object
    const jsonData = JSON.stringify(filesData);
   
    const jsonDataS = JSON.parse(jsonData);

    const convertedData = {
      "Files": jsonDataS.map((item: string) => ({
        "fileName": item.fileName,
        "content": item.content
      }))
    };
    try {
      const response = await axios.post(`http://localhost:3000/api/project/addproject/${projectid}`, convertedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        console.log("File uploaded successfully");
        // Handle success - display a success message or perform other actions
      
      
      } else {
        console.error("Error uploading file");
        // Handle error
      }
    } catch (error) {
      console.error("Request Error:", error);
      // Handle request error
    }

  };


  
  
  // console.log(project)
  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex justify-between gap-32 items-baseline mr-36">

      <div className="flex flex-col items-center gap-9 " style={style}>
        <div className="text-2xl">
          Empower Your Creativity: Share, Upload, and Sell it.
        </div>
       
       
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="border-2 border-dashed border-purple-400 p-40 rounded-lg py-28 ">
            Drag n Drop Your code
          </p>
        <div className="relative left-40 top-28  text-blue-400 font-bold text-xl hover:cursor-pointer hover:text-blue-500" style={{ textShadow: '1px 1px 1px rgb(171, 135, 255)' ,letterSpacing:'1px'}}>Upload project</div>
        </div>

        <div>
          <input type="text" name=""  value={projectName}
        onChange={handleProjectNameChange} placeholder="         Add Project Name" className="text-white border border-solid border-blue-500-500 rounded-lg p-2 text-xl  relative bottom-3 bg-transparent "  id="" />
        </div>
      </div>

      <div style={{maxWidth:'13rem'}} >
        {uploadedFiles.length > 0 && (
          <div style={style}>
            <h4 className="text-blue-500 font-semibold text-2xl mt-9 ">
              Project Content
            </h4>
            <ul>
              {uploadedFiles.map((file, index) => (
                <>
                  <div className="flex w-fit gap-4 py-2 hover:text-purple-500 hover:cursor-pointer"
                  >
                    <CheckCircleIcon style={{ color: "rgb(10, 180, 52)" }}  />{" "}
                    <li key={index}>{file.name}</li>
                  </div>
                </>
              ))}

              <div className="text-white-500 font-semibold  hover:bg-purple-700 hover:cursor-pointer text-lg mt-9 transition-all duration-300 ease-in-out bg-green-800 p-3  py-1 w-fit rounded-lg" onClick={createProject}>Deploy</div>
            </ul>
          </div>
        )}
      </div>
      {showSnackbar && (
        <div style={style} className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-2 text-center">
          <p>Project Uploaded Successfuly</p>
        </div>
      )}
    </div>
  );
};

export default Drop;
