"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import axios from "axios";
import { currencies, Technologies } from "../../../data/data";

interface PageProps {
  params: {
    projectid: number; // Assuming projectid is of type number
  };
}
// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },
//   {
//     value: "EUR",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];
// const Technologies = [
//   { title: 'HTML', type: 'Web' },
//   { title: 'Sass', type: 'Web' },
//   { title: 'JavaScript', type: 'Web' },
//   { title: 'TypeScript', type: 'Web' },
//   { title: 'Python', type: 'Web' },
//   { title: 'Java', type: 'Web' },
//   { title: 'PHP', type: 'Web' },
//   { title: 'Ruby', type: 'Web' },
//   { title: 'React', type: 'Web' },
//   { title: 'Angular', type: 'Web' },
//   { title: 'Vue.js', type: 'Web' },
//   { title: 'Node js', type: 'Web' },
//   { title: 'Express.js', type: 'Web' },
//   { title: 'Django', type: 'Web' },
//   { title: 'Laravel', type: 'Web' },
//   { title: 'Spring Boot', type: 'Web' },
//   { title: 'Ruby on Rails', type: 'Web' },
//   { title: 'Sass', type: 'Web' },
//   { title: 'LESS', type: 'Web' },
//   { title: 'Bootstrap', type: 'Web' },
//   { title: 'Tailwind CSS', type: 'Web' },
//   { title: 'jQuery', type: 'Web' },
//   { title: 'Flutter', type: 'Mobile' },
//   { title: 'React Native', type: 'Mobile' },
//   { title: 'Swift', type: 'Mobile' },
//   { title: 'Kotlin', type: 'Mobile' },
//   { title: 'Java (Android)', type: 'Mobile' },
//   { title: 'Dart', type: 'Mobile' },
//   { title: 'Ionic', type: 'Mobile' },
//   { title: 'PhoneGap / Cordova', type: 'Mobile' },
//   { title: 'Xamarin', type: 'Mobile' },
//   { title: 'Objective-C', type: 'Mobile' },
//   { title: 'C# (Xamarin)', type: 'Mobile' },
//   { title: 'SwiftUI', type: 'Mobile' },
//   { title: 'Android Jetpack', type: 'Mobile' },
//   { title: 'Firebase', type: 'Mobile' },
//   { title: 'MySQL', type: 'Backend' },
//   { title: 'PostgreSQL', type: 'Backend' },
//   { title: 'MongoDB', type: 'Backend' },
//   { title: 'SQLite', type: 'Backend' },
//   { title: 'Oracle', type: 'Backend' },
//   { title: 'SQL Server', type: 'Backend' },
//   { title: 'Redis', type: 'Backend' },
//   { title: 'Elasticsearch', type: 'Backend' },
//   { title: 'GraphQL', type: 'Backend' },
//   { title: 'Docker', type: 'Backend' },
//   { title: 'Kubernetes', type: 'Backend' },
//   { title: 'Apache', type: 'Backend' },
//   { title: 'NGINX', type: 'Backend' },
// ];
const tagStyles = {
  background: "purple",
  color: "white",
};

const Page = ({ params }: PageProps) => {



  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };
  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Successfully Set Project For Sale!", { variant });
  };

  const { projectid } = params;
  console.log("hannnan", projectid);
  // const projectData = {
  //   project_name: "Saba Mustehsan",
  // };

  const [projectData, setprojectData] = useState({
    project_name: "",
    project_desc: "",
    price: "",
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState([]); // New state for selected technologies
  const handleInput = (e: { target: { name: any; value: any } }) => {
    setprojectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleTechnologiesChange = (
    event: any,
    newValue: React.SetStateAction<never[]>
  ) => {
    setSelectedTechnologies(newValue); // Update selected technologies array
  };

  const selectedTitles = selectedTechnologies.map((option) => option.title);
  console.log(selectedTitles);

  const updateProject = async () => {
    const dataToSend = {
      ...projectData,
      technologies: selectedTitles, // Merge selectedTechnologies with projectData
    };
    // console.log(dataToSend)
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/project/getproject/${projectid}`,
        dataToSend
      );

      if (response.status === 201) {
        console.log("Success:The Updated project");
      } else {
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error("Request Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">
          Showcase and Sell Your Project to the World!
        </h1>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  p-12 w-2/4"
          onClick={updateProject}
        >
          <div className="mb-4">
            <TextField
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              fullWidth
              name="project_name"
              onChange={handleInput}
              value={projectData.project_name}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="outlined-multiline-flexible"
              label="Project Description"
              multiline
              maxRows={18}
              fullWidth
              name="project_desc"
              onChange={handleInput}
              value={projectData.project_desc}
            />
          </div>

          <div className="mb-4">
            <TextField
              id="outlined-select-currency"
              select
              label="Currency"
              // defaultValue="EUR"
              fullWidth

              // helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>{" "}
          </div>

          <div className="mb-4">
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              onChange={handleInput}
              value={projectData.price}
            />
          </div>

          <div className="mb-4">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={Technologies}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              onChange={handleTechnologiesChange} // Handle change event
              value={selectedTechnologies} // Set the selected values
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Technologies"
                  placeholder="Favorites"
                  name="technologies"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option.title}
                    label={option.title}
                    style={tagStyles}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </div>
          {/* Other form fields */}

          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClickVariant("success")}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
