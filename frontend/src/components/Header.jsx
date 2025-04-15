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
          Welcome to the Cocktail Island
        </h1>
        <p className="text-md w-full lg:w-[70%]">
          Welcome to our Cocktail Mixing Guide – your one-stop destination to
          master the art of cocktail making! Whether you're an absolute beginner
          looking to craft your first drink or an experienced bartender seeking
          new inspiration, we’ve got you covered. Our website features a
          comprehensive collection of easy-to-follow cocktail recipes, tips, and
          techniques to help you create the most delicious and visually stunning
          cocktails.
        </p>
      </div>

      {/*Right Section*/}
      <div className="hidden w-full lg:block lg:rounded-r-4xl lg:w-[50%]">
        <img
          src={asesets.header3}
          alt=""
          className="lg:rounded-r-4xl w-full h-[650px] object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
