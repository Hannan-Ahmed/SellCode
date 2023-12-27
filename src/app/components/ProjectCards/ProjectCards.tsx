import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Link from "next/link";

const ProjectCards = ({ project }) => {

  return (
    <div className="transform hover:scale-105 shadow-lg transition duration-300 ease-in-out  relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-fit">



      {!project.bought

        &&
        <>
          {project.onSale ?
            <MonetizationOnIcon
              style={{
                color: "green",
                position: "absolute",
                right: "3px",
                fontSize: "30px",
                top: "7px",
              }}
            /> :
            <MonetizationOnIcon
              style={{
                color: "grey",
                position: "absolute",
                right: "3px",
                fontSize: "30px",
                top: "7px",
              }}
            />

          }
        </>
      }


      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {project.project_name}
        </h5>
        <p className="block  text-base antialiased  leading-relaxed text-inherit">


          {project.bought ?
            <>
              Project Purchased
            </>
            :
            <>
              {project.onSale ?
                "Project for sale" :
                "Project not on Sale"
              }
            </>


          }



        </p>

        <p className="block  text-base antialiased  leading-relaxed text-inherit">
          Date uploaded: {new Date(project.date).toLocaleString()}
        </p>

      </div>
      <div className="p-2 pt-0 flex gap-3">
        {
          !project.bought &&
          <>
            <button
              className="align-middle select-none font-sans font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-800 shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              <Link href={`/sellproject/monitor/${project._id}`}>Monitor</Link>
            </button>

            <button
              className="align-middle select-none font-sans font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-800 shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              <Link href={`/sellproject/sellcode/${project._id}`}>Sell</Link>
            </button>
          </>
        }
        <button
          className="align-middle select-none font-sans font-bold text-center  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-800 shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          <Link href={`/sellproject/viewproject/${project._id}`}>View Code</Link>
        </button>
      </div>
    </div>
  );
};

export default ProjectCards;
