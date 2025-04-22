import React from "react";
import { asesets } from "../assets/assets";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-items-center items-start lg:flex-row bg-cyan-50 rounded-4xl mt-5 w-full">
      {/*Left Section*/}
      <div className="p-5 md:p-10 flex flex-col gap-10 lg:w-[50%]">
        <h1 className="text-5xl text-wrap font-bold w-full lg:w-[80%] xl:w-[70%] leading-15">
          Cocktail tutorial
        </h1>
        <p className="text-2xl w-full lg:w-[70%]">
          Cocktail Land is your ultimate destination for learning how to craft
          delicious cocktails — from classic favorites to unique modern blends.
          Whether you're a beginner or an aspiring mixologist, our platform
          offers: <br />🧪 Step-by-step cocktail recipes <br />🎥 Visual guides and tips <br /> 📸
          Beautiful images and ingredient info 
        </p>
        <button onClick={() => navigate("/recipes")} className="bg-black p-3 text-white w-40 rounded-xl cursor-pointer">View Recipes</button>
      </div>

      {/*Right Section*/}
      <div className="hidden w-full lg:block lg:rounded-r-4xl lg:w-[50%]">
        <img
          src={asesets.phache}
          alt=""
          className="lg:rounded-r-4xl w-full h-[650px] object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
