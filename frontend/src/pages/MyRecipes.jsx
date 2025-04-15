import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const { recipeBox, removeFromRecipeBox, recipes } = useContext(AppContext);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSelectDrink = (id) => {
    setSelectedRecipes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Lấy danh sách recipeId từ recipeBox
  const savedRecipeIds = recipeBox?.[0]?.listRecipes?.map((r) => r.recipeId) || [];

  // Lọc công thức từ danh sách gốc dựa vào recipeId và searchTerm
  const filteredRecipes = recipes.filter(
    (recipe) =>
      savedRecipeIds.includes(recipe.recipeId) &&
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        My Recipes
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black w-full max-w-md"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found in your box.</p>
      ) : (
        <>
          {/* <button
            onClick={() => {
              selectedRecipes.forEach((id) => removeFromRecipeBox(id));
              setSelectedRecipes([]);
            }}
            disabled={selectedRecipes.length === 0}
            className={`mb-6 px-6 py-2 rounded-full text-sm font-semibold ${
              selectedRecipes.length > 0
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Remove Selected
          </button> */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((drink) => (
              <div
                key={drink.recipeId}
                className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] overflow-hidden"
              >
                {/* <input
                  type="checkbox"
                  checked={selectedRecipes.includes(drink.recipeId)}
                  onChange={() => toggleSelectDrink(drink.recipeId)}
                  className="absolute top-2 left-2 w-5 h-5 z-10"
                /> */}
                <Link to={`/recipes/${drink.recipeId}`}>
                  <img
                    src={drink.image_URL}
                    alt={drink.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900">
                      {drink.name}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                      {drink.description}
                    </p>
                    <button className="mt-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecipes;
