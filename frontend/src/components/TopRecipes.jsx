import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import Pagination from "./Pagination";
import Subcribe from "./Subcribe";
import OtherRecipes from "./OtherRecipes";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TopRecipes = () => {
  const navigate = useNavigate();
  const { recipes, addToRecipeBox, checkRecipeContainBox } =
    useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <h1 className="text-3xl text-center mt-5 font-bold">Top Recipes</h1>
      <p className="text-center mt-5 text-xl ">Top cocktail recipes for you</p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-9">
        {currentItems.map((item) => (
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
              <p className="ml-4 text-2xl font-semibold mt-4 text-red-500">
                {item.price !== 0 ? `${item.price} VNĐ` : "Free"}
              </p>
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
            >
              {checkRecipeContainBox(item.recipeId) ? (
                <FavoriteIcon className="text-red-400 text-lg sm:text-xl md:text-2xl" />
              ) : (
                <FavoriteIcon
                  className="text-gray-300 text-lg sm:text-xl md:text-2xl"
                  onClick={() => addToRecipeBox(item.recipeId)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Subcribe />
      <div className="mt-20 mb-20">
        <OtherRecipes />
      </div>
    </div>
  );
};

export default TopRecipes;
