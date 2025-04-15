import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Subcribe from "../components/Subcribe";
import OtherRecipes from "../components/OtherRecipes";

const Blog = () => {
  const { blogs, recipes } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 justify-center items-center px-4">
      <h1 className="text-center text-3xl md:text-4xl font-semibold">
        Blog & Article
      </h1>
      <p className="text-gray-400 text-center max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search article, blog..."
          className="w-full p-3 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white font-semibold px-5 py-2 rounded-full">
          Search
        </button>
      </div>

      {/* Blog List & Top Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left - Blog List */}
        <div className="col-span-2 flex flex-col gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.blogId}
                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 duration-500 transition-all cursor-pointer"
                onClick={() => navigate(`/blog/${blog.blogId}`)}
              >
                <img
                  src={blog.mainImage}
                  alt="Blog"
                  className="object-cover w-full md:w-1/3 h-56 md:h-40 rounded-t-lg md:rounded-none md:rounded-l-lg"
                />
                <div className="flex flex-col p-5 justify-between">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    {blog.title}
                  </h1>
                  <p className="mt-2 text-gray-700 line-clamp-3">
                    {blog.description || "A great article to read!"}
                  </p>
                  <button className="mt-4 self-start text-blue-600 hover:underline font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Không tìm thấy blog nào.
            </p>
          )}
        </div>

        {/* Right - Top Recipes */}
        <div className="col-span-1 flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold">Top Recipes</h1>
          {recipes.slice(0, 3).map((drink) => (
            <div
              key={drink.recipeId}
              className="flex bg-white border border-gray-200 rounded-lg shadow-sm hover:scale-105 duration-500 transition-all cursor-pointer"
              onClick={() => navigate(`/recipes/${drink.recipeId}`)}
            >
              <img
                src={drink.image_URL}
                alt="Drink"
                className="object-cover w-1/3 h-24 rounded-l-lg"
              />
              <div className="flex flex-col p-3 justify-center">
                <h1 className="text-lg font-semibold">{drink.name}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">
                  A refreshing drink to enjoy anytime.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Subcribe />
      <OtherRecipes />
    </div>
  );
};

export default Blog;
