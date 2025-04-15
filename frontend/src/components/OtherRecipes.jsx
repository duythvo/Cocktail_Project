import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";

const OtherRecipes = () => {
  const { recipes, addToRecipeBox, checkRecipeContainBox } =
    useContext(AppContext);
  const currentData = recipes.slice(0, 5);
  return (
    <div className="mt-30 mb-20">
      <h1 className="text-2xl font-bold text-center mb-10">
        You may like these recipe too
      </h1>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-9">
        {currentData.map((item) => (
          <div
            key={item.recipeId}
            className="bg-white rounded-2xl flex flex-col relative w-4xs shadow-md border border-blue-200 hover:translate-y-[-10px] transition-all duration-500"
          >
            <Link to={`/recipes/${item.recipeId}`}>
              <div className="w-full">
                <img
                  className="object-cover w-full rounded-2xl h-[300px]"
                  src={item.image_URL}
                  alt={item.name}
                />
              </div>
              <p className="ml-4 text-2xl font-bold mt-4">{item.name}</p>
              <p className="ml-4 mt-2 mb-2">{item.description}</p>
              <div className="flex justify-center w-full mb-5">
                <button className="bg-black text-white p-2 rounded-xl mt-5 w-2/3 cursor-pointer">
                  View Recipe
                </button>
              </div>
            </Link>
            <div
              className="bg-white bg-opacity-80 hover:bg-opacity-100 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center absolute 
        right-2 sm:right-4 md:right-6 lg:right-4 
        top-4 sm:top-6 md:top-8 lg:top-6 
        cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => addToRecipeBox(item.recipeId)}
            >
              {checkRecipeContainBox(item.recipeId) ? (
                <FavoriteIcon className="text-red-400 text-lg sm:text-xl md:text-2xl" />
              ) : (
                <FavoriteIcon className="text-gray-300 text-lg sm:text-xl md:text-2xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherRecipes;
