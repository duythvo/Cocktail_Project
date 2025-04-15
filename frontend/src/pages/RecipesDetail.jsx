import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import OtherRecipes from "../components/OtherRecipes";
import Subcribe from "../components/Subcribe";

const RecipesDetail = () => {
  const { id } = useParams();
  const [stt, setSTT] = useState(1);
  const { recipes, addToCart, checkRecipeContainBox, addToRecipeBox } =
    useContext(AppContext);
  const recipe = recipes?.find((d) => d.recipeId + "" === id);
  const otherRecipe = recipes.slice(0, 3);

  if (!recipe) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  return (
    <div className="mt-15">
      <div className="flex gap-5 justify-content-center align-items-center ">
        <div>
          <h1 className="text-4xl font-bold">{recipe.name}</h1>
          <h1 className="my-5 text-2xl text-red-400 font-semibold">
            {recipe.price === 0 ? "Free" : "Price: " + recipe.price + " VNĐ"}
          </h1>
        </div>
        {recipe.price !== 0 && !checkRecipeContainBox(recipe.recipeId) && (
          <div className="flex gap-5 items-center">
            <button
              onClick={() => addToRecipeBox(recipe.recipeId)}
              className="bg-blue-400 text-white font-semibold p-4 rounded-xl"
            >
              Buy now
            </button>
            <button
              onClick={() => addToCart(recipe.recipeId)}
              className="bg-green-500 text-white font-semibold p-4 rounded-xl cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      {recipe.price !== 0 && checkRecipeContainBox(recipe.recipeId) ? (
        <>
          <div className="flex flex-col justify-between gap-10 sm:flex-col lg:flex-row">
            <div>
              <video controls className="w-3xl rounded-2xl">
                <source src={recipe.video_URL}></source>
              </video>
            </div>
            <div className="bg-cyan-50 sm:w-xl rounded-2xl p-5 flex flex-col">
              <p className="font-bold text-2xl">Nutri Information</p>
              <ul className="mt-5">
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Calories</p>
                  <p>{recipe.nutrition.calories} kcal</p>
                </li>
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Protein</p>
                  <p>{recipe.nutrition.protein} g</p>
                </li>
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Fat</p>
                  <p>{recipe.nutrition.fat} g</p>
                </li>
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Carbs</p>
                  <p>{recipe.nutrition.carbs} g</p>
                </li>
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Fiber</p>
                  <p>{recipe.nutrition.fiber} g</p>
                </li>
                <li className="flex justify-between border-b-2 border-gray-400 pb-2">
                  <p className="text-gray-500">Sodium</p>
                  <p>{recipe.nutrition.sodium} g</p>
                </li>
              </ul>
              <p className="mt-auto text-center text-gray-500">
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.{" "}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-gray-500">{recipe.description}</p>
          </div>

          <div className="flex flex-col justify-between lg:flex-row md:flex-col">
            <div className="w-3xl">
              <h1 className="text-2xl font-bold mt-15">Igredients</h1>
              <h1 className="font-bold mt-5">For main recipe</h1>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients.map((item, index) => (
                      <tr
                        key={item.recipeId} // Thêm key để React xử lý danh sách tốt hơn
                        className="bg-white border-b  dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium  whitespace-nowrap"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sm:w-xl">
              <h1 className="text-2xl font-bold mt-15">Other Recipe</h1>
              <div className="flex flex-col gap-4 mt-5">
                {otherRecipe.map((item) => (
                  <Link to={`/recipes/${item.recipeId}`} key={item.recipeId}>
                    <div
                      key={item.recipeId}
                      className="flex bg-white border border-gray-200 rounded-lg shadow-sm    hover:translate-y-[-10px] transition-all duration-500 cursor-pointer mb-5 "
                      onClick={() => navigate(`/recipe/${recipe.recipeId}`)}
                    >
                      <img
                        src={item.image_URL}
                        alt="recipe"
                        className="object-cover w-1/3 rounded-l-lg h-36"
                      />
                      <div className="flex flex-col p-4 justify-center gap-5">
                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 ">
                          {item.name}
                        </h1>
                        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                          A refreshing recipe recipe to enjoy anytime.
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h1 className="font-bold text-2xl mb-10">Recipe</h1>
            <div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Step
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.recipes.map((item, index) => (
                      <tr
                        key={item.recipeId} // Thêm key để React xử lý danh sách tốt hơn
                        className="bg-white border-b "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{item.step}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="mb-2 text-2xl font-bold text-red-600">Please payment to watch video</p>
          <video controls className="w-3xl rounded-2xl">
            <source src={recipe.video_URL}></source>
          </video>
        </div>
      )}

      <Subcribe />
      <OtherRecipes />
    </div>
  );
};

export default RecipesDetail;
