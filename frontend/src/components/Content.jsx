import React from "react";
import { asesets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Content = () => {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-cyan-50 gap-1 rounded-4xl mt-5 justify-items-center items-center">
      {/**Left */}
      <div className="hidden w-full lg:block lg:rounded-l-4xl lg:w-[50%]">
        <img
          src={asesets.header3}
          alt=""
          className="lg:rounded-l-4xl w-full h-[650px] object-cover"
        />
      </div>
      {/**Right */}
      <div className="p-5 md:p-10  flex flex-col gap-10 lg:w-[50%]">
        <h1 className="text-5xl font-semibold">
          Everyone can be bartender in their own house
        </h1>
        <p className="text-gray-500 text-sm ">
          Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqut enim ad minim
        </p>
        <button className="bg-black p-3 rounded-xl text-white font-semibold cursor-pointer"
          onClick={() => navigate("/recipes")}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Content;
