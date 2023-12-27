"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRouter } from "next/navigation";
import { SetStateAction, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, Key, useEffect, useState } from "react";
import axios from "axios";
import Stepper from "awesome-react-stepper";
import { animations } from 'react-animation'

const Page = ({ params }) => {
  const { projectid } = params;
  const style = {
    animation: animations.fadeIn
  }
  
  // const [projects, setProjects] = useState([]);
  const [file, setfile] = useState([]);
  const [fileid, setfileid] = useState();

  useEffect(() => {


    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/project/getfiles/${projectid}`
        );
        if (response.status === 200) {
          const projectsData = response.data;
          setfile(projectsData);
        } else {
          console.error("Error fetching projects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlefile = (id: SetStateAction<undefined>) => {
    setfileid(id);
  };
  return (
    <>
    <div className="text-center mb-2 text-3xl font-semibold">View Your Project Content</div>
    <div className="flex items-baseline justify-evenly gap-40 pt-14" style={style}>
    
    
      <div>
        <div className="flex flex-col space-y-4">
          {file.map((label, index) => (
            <div key={index} className="-300 p-4" style={style}>
              {label.Files.map((file: { _id: any; fileName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, fileIndex: Key | null | undefined) => (
                <div
                  onClick={() => handlefile(file._id)}
                  key={fileIndex}
                  className="flex items-center space-x-2"
                >
                  <div className="w-6 h-6 rounded-full my-5 bg-blue-500 flex items-center justify-center text-white">
                    {fileIndex + 1}
                  </div>
                  <div className="hover:text-blue-300 hover:cursor-pointer">{file.fileName}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border  border-white rounded-lg w-2/4" style={style}>
        <div className="bg-gray-500 rounded-t-md px-4">
          

        {file.map((doc) => (
          <div key={doc._id}>
            {doc.Files.map((file: { _id: Key | null | undefined; fileName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) =>
              file._id === fileid ? (
                <div key={file._id}>
                  <div style={style}>
                      {file.fileName}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ))}



        </div>

        {file.map((doc) => (
          <div key={doc._id}>
            {doc.Files.map((file: { _id: Key | null | undefined; content: any; }) =>
              file._id === fileid ? (
                <div key={file._id}>
                  <div style={style}> 
                    <SyntaxHighlighter language="javascript" style={a11yDark}>
                      {file.content}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : 
              null
              
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Page;
