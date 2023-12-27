import Image from "next/image";
import React from "react";
import angular from "../../Images/angular.png"
import bootstrap from "../../Images/bootstrap.jpg"
import docker from "../../Images/docker.png"
import fire from "../../Images/fore.png"
import html from "../../Images/hyml.png"
import mongo from "../../Images/mongo.png"
import node from "../../Images/node.png"
import php from "../../Images/php.png"
import postgre from "../../Images/postgre.png"
import sql from "../../Images/sql.jpg"
import sass from "../../Images/sass.png"
import ts from "../../Images/ts.png"
import react from "../../Images/react.png"
import tailwind from "../../Images/tailwind.jpg"
import Rating from '@mui/material/Rating';
import getStipePromise from "@/app/utils/stripe";





const products = [
  {
    product: 1,
    project_name: "Stripe Product",
    price: 100,
    quantity: 3,
  },
  {
    product: 2,
    project_name: "Stripe Product2",
    price: 100,
    quantity: 2,
  },
  {
    product: 3,
    project_name: "Stripe Product23",
    price: 4000,
    quantity: 1,
  },
];



const PriceCard = ({ project }) => {


  const handleCheckout = async () => {

    const projectsArray = [project];


    const stripe = await getStipePromise();
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(projectsArray),
    });

    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };




  // const wordsArray = Technologies.map(tech => tech.title);
  const getImage = (tech) => {
    switch (tech) {
      case "React":
        return <Image src={react} alt="React" width={36} height={36} className="rounded-full" />;

      case "HTML":
        return <Image src={html} alt="HTML" width={36} height={36} />;
      case "Sass":
        return <Image src={sass} alt="CSS" width={36} height={36} />;

      case "TypeScript":
        return <Image src={ts} alt="TypeScript" width={36} height={36} />;


      case "PHP":
        return <Image src={php} alt="PHP" width={36} height={36} />;

      case "Angular":
        return <Image src={angular} alt="Angular" width={36} height={36} />;

      case "Node js":
        return <Image src={node} alt="Node.js" width={36} height={36} />;

      case "Bootstrap":
        return <Image src={bootstrap} alt="Bootstrap" width={36} height={36} />;
      case "Tailwind CSS":
        return <Image src={tailwind} alt="Tailwind CSS" width={36} height={36} />;

      case "Firebase":
        return <Image src={fire} alt="Firebase" width={36} height={36} />;
      case "MySQL":
        return <Image src={sql} alt="MySQL" width={36} height={36} />;
      case "PostgreSQL":
        return <Image src={postgre} alt="PostgreSQL" width={36} height={36} />;
      case "MongoDB":
        return <Image src={mongo} alt="MongoDB" width={36} height={36} />;
      case "Docker":
        return <Image src={docker} alt="Docker" width={36} height={36} />;


      default:
        return null;
    }
  };
  return (
    <div>
      <div style={{ width: '22rem' }} className="transform hover:scale-105 transition duration-300 ease-in-out  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-800">
        <Image
          className="p-3 rounded-xl"
          src="https://www.webfx.com/wp-content/uploads/2023/10/example-of-beautiful-websites-2-slack.png"
          width={1000}
          height={300}
          alt="product image"
        />

        <div className="px-3 pb-5">
          <a href="#">
            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-black">
              {project.project_name}
            </h5>
          </a>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-black">
              {project.project_desc}
            </div>
          </div>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">



              {project.technologies.map((word, index) => (
                <React.Fragment key={index}>
                  {getImage(word)}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">


              <Rating name="read-only" value={3} readOnly />


            </div>

          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-black">
              ${project.price}
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-lg font-semibold px-10 py-2  text-center dark:bg-purple-900 dark:hover:bg-purple-700 dark:focus:ring-p "
              onClick={handleCheckout}
            >
              Buy
            </a>
            {/* <button
        className="bg-green-500 py-3 px-3 rounded-md"
        onClick={handleCheckout}
      >
        Check out
      </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
