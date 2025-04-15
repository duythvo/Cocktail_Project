import React, { useContext } from "react";
import { asesets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Subcribe from "../components/Subcribe";
import OtherRecipes from "../components/OtherRecipes";
const About = () => {
  const navigate = useNavigate();
  const { recipes } = useContext(AppContext);
  const data = recipes.slice(0, 8);
  return (
    <div>
      <div className="flex flex-col mt-10 lg:flex-row sm:flex-col">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold">
            A Cost Efficient Digital Training Tool
          </h1>
        </div>
        <div className="mt-10 lg:mt-0">
          <p className="mb-3">
            Deliver a first-class guest experience with expert recipes knowledge
            and flawless service.
          </p>
          <p className="mb-3">
            Streamline operations with custom drink menus, signature cocktail
            recipes, and daily service routines.
          </p>
          <p className="mb-3">
            Plan events and happenings, create checklists and menus for staff
            updates.
          </p>
          <p className="mb-3">
            Ensure consistent quality by providing staff with instant access to
            recipe checklists, and training.
          </p>
          <p>
            Plan events and special occasions, - create checklists and menus for
            staff updates
          </p>
          <button
            onClick={() => navigate("/recipes")}
            className="mt-10 bg-black font-semibold text-white px-8 py-3 rounded-full cursor-pointer"
          >
            Vỉew Recipes
          </button>
        </div>
      </div>
      <div className="mt-15 bg-cyan-50 flex py-20 px-2 gap-4 flex-col lg:flex-row sm:flex-col md:flex-col">
        <div className="w-full max-w-[750px] aspect-video">
          <iframe
            src="https://www.youtube.com/embed/bqOgbb8uPNc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>

        <div className="lg:flex lg:flex-col hidden">
          <div className="flex gap-4">
            <div>
              <img
                className="object-cover rounded-2xl h-[250px] w-[250px] md:w-[350px]"
                src={data[0].image_URL}
              ></img>
            </div>
            <div>
              <img
                className="object-cover rounded-2xl h-[250px] w-[250px] md:w-[350px]"
                src={data[1].image_URL}
              ></img>
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <div>
              <img
                className="object-cover rounded-2xl h-[270px] w-[180px] md:w-[220px]"
                src={data[2].image_URL}
              ></img>
            </div>
            <div>
              <img
                className="object-cover rounded-2xl h-[270px] w-[180px] md:w-[220px]"
                src={data[3].image_URL}
              ></img>
            </div>
            <div>
              <img
                className="object-cover rounded-2xl h-[270px] w-[180px] md:w-[220px]"
                src={data[4].image_URL}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-15 justify-between lg:flex-row">
        <div className="max-w-3xl flex flex-col">
          <h1 className="text-7xl font-bold">
            Inconsistent Service Standards May Affect Your Revenue
          </h1>
          <p className="text-2xl mt-10 text-gray-600">
            High staff turnover, knowledge gaps, and lack of structured training
            lead inconsistent service, mistakes, and lost sales. Without proper
            recipe and service training, businesses struggle to maintain high
            standards.
          </p>
          <button
            onClick={() => navigate("/recipes")}
            className="mt-10 bg-black font-semibold text-white px-8 py-3 rounded-full cursor-pointer max-w-40"
          >
            View Recipes
          </button>
        </div>
        <div className="mt-10 lg:mt-0">
          <img
            className="object-cotain h-full rounded-2xl w-[450px] "
            src={data[5].image_URL}
          ></img>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-20 justify-between bg-cyan-50">
        <div>
          <img
            className="object-cotain h-full rounded-2xl w-[450px] "
            src={data[6].image_URL}
          ></img>
        </div>
        <div className="max-w-3xl flex flex-col p-2 lg:mt-0 mt-10">
          <h1 className="text-7xl font-bold">
            A Smarter, More Profitable Way to Train Your Team
          </h1>
          <p className="text-2xl mt-10 text-gray-600">
            Cocktail Club’s digital training platform provides instant access to
            essential drink recipes, service guidelines, and operational
            checklists while giving managers a streamlined dashboard for full
            control. This improves service quality, increases efficiency, and
            drives higher revenue—without the need for external consultants high
            investments.
          </p>
          <button
            onClick={() => navigate("/recipes")}
            className="mt-10 bg-black font-semibold text-white px-8 py-3 rounded-full hidden md:block cursor-pointer max-w-40"
          >
            View Recipes
          </button>
        </div>
      </div>
      <Subcribe />
      <OtherRecipes />
    </div>
  );
};

export default About;
