import Image from "next/image";
import React from "react";
import Illsutration1 from "../app/Images/illus1.png";

const page = () => {
  return (
    <div>
      <div className=" h-max  ">
        dashboard
        {/* <Image
          src={Illsutration1}
          width={915}
          height={915}
          className="ml-48 absolute top-11"
          alt="frontImage"
        /> */}
      </div>
    </div>
  );
};

export default page;
