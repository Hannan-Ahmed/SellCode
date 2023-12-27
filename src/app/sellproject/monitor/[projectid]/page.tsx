"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import axios from "axios";

interface PageProps {
  params: {
    projectid: number; // Assuming projectid is of type number
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Page = ({ params }: PageProps) => {
const {projectid}=params


  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };






  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsByUserId = async () => { 
      try {
        const response = await axios.get(`http://localhost:3000/api/project/getspecproj/${projectid}`);
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
  }, []);

console.log(projects)


  return (
    <>
      <div className="text-center mb-2 text-3xl font-semibold">Monitoring</div>
    <div className="px-20 py-6">

      <Box sx={{ width: 1200 }} className=" bg-purple-100 rounded-lg h-96">
        <AppBar position="static" className=" rounded-lg">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            // textColor="inherit"
            className="bg-white rounded-lg"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Project Details"
              {...a11yProps(0)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
            <Tab
              label="Requests"
              {...a11yProps(1)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
            <Tab
              label="Customize"
              {...a11yProps(2)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
            <Tab
              label="Settings"
              {...a11yProps(3)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
            <Tab
              label="Update Project"
              {...a11yProps(4)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
            <Tab
              label="Share Project"
              {...a11yProps(5)}
              className="text-purple-600 font-semibold  rounded-lg"
            />
          </Tabs>
        </AppBar>
       


{projects.map((proj)=>(




        <TabPanel value={value} index={0} dir={theme.direction} key={proj._id}>
          <div className="flex items-center justify-evenly ">
            <div className="flex flex-col gap-12 pt-4">
              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Project Name :</div>
                <div>{proj.project_name}</div>
              </div>
              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Date Of Posted :</div>
                <div>{proj.date.split('T')[0]}</div>
              </div>

              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Purchased status :</div>
                
                {proj.bought ? 
                
                <div>Purchased</div>
             :
             <div>Pending</div>
                }
                </div>
            </div>
            <div className="flex flex-col gap-12 pt-4">
              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Amount :</div>
                <div>{proj.price} Rs</div>
              </div>
              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Domain :</div>
                <div>Web app</div>
              </div>

              <div className="flex  justify-evenly text-black text-lg  gap-5">
                <div className="font-semibold">Rattings :</div>
                <div>3.0</div>
              </div>
            </div>
          </div>
        </TabPanel>


))}

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="  rounded-lg">
            <ul>
              <Badge color="error" badgeContent={"New"}>
                <li
                  className=" text-white text-lg bg-purple-800  rounded-md p-2 mb-2"
                  style={{ width: "81vw" }}
                >
                  Sophia requested for a project
                </li>
              </Badge>
              <li 
                  style={{ width: "81vw" }}
              className="text-white text-lg bg-purple-800 rounded-md p-2 mb-2">
                Your project is viewed by Emma.
              </li>
                  style={{ width: "81vw" }}
              <li 
                  style={{ width: "81vw" }}
              className="text-white text-lg bg-purple-800 rounded-md p-2 mb-2">
                Your Project has been posted on 2022-12-4
              </li>
            </ul>
          </div>{" "}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="flex items-center justify-evenly ">
            <div className="flex flex-col gap-12 pt-4">
              <div className="flex  justify-evenly items-center text-black text-lg  gap-5">
                <div className="font-semibold">Project Name :</div>
                <input
                  type="text"
                  className="border border-purple-100 rounded-md px-4 py-2 text-black  focus:outline-none focus:border-purple-700"
                  placeholder="Enter Project Name"
                />
              </div>
              <div className="flex  justify-evenly items-center text-black text-lg  gap-5">
                <div className="font-semibold">Date Of Posted :</div>
                <input
                  type="text"
                  className="border border-purple-100 rounded-md px-4 py-2 text-black  focus:outline-none focus:border-purple-700"
                  placeholder="Enter Date"
                />{" "}
              </div>

              <div className="flex  justify-evenly items-center text-black text-lg  gap-5">
                <div className="font-semibold">Purchased status :</div>
                <input
                  type="text"
                  className="border border-purple-100 rounded-md px-4 py-2 text-black  focus:outline-none focus:border-purple-700"
                  placeholder="Enter Status"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col gap-12 pt-4">
              <div className="flex  justify-evenly items-center text-black text-lg  gap-5">
                <div className="font-semibold">Amount :</div>
                <input
                  type="text"
                  className="border border-purple-100 rounded-md px-4 py-2 text-black  focus:outline-none focus:border-purple-700"
                  placeholder="Enter Amount"
                />{" "}
              </div>
              <div className="flex  justify-evenly items-center text-black text-lg  gap-5">
                <div className="font-semibold">Domain :</div>
                <input
                  type="text"
                  className="border border-purple-100 rounded-md px-4 py-2 text-black  focus:outline-none focus:border-purple-700"
                  placeholder="Enter Domain"
                />{" "}
              </div>

             
            </div>
          </div>
        </TabPanel>


        <TabPanel value={value} index={3} dir={theme.direction}>
          Item 4
        </TabPanel>

        <TabPanel value={value} index={4} dir={theme.direction}>
          Item 5
        </TabPanel>

        <TabPanel value={value} index={5} dir={theme.direction}>
          Item 6
        </TabPanel>
        {/* </SwipeableViews> */}
      </Box>
    </div>
    </>
  );
};

export default Page;
