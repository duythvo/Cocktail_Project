import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const BlogDetail = () => {
  const { id } = useParams(); 
  const { blogs } = useContext(AppContext);
  console.log(id);

  const blog = blogs.find((b) => b.blogId.toString() === id);

  if (!blog)
    return <div className="text-center text-gray-500">Blog not found!</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
      <p className="text-gray-500 mt-2">
        Published on:{" "}
        <span className="font-semibold">{new Date(blog.date).toDateString()}</span>
      </p>

      <img
        src={blog.mainImage}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg mt-6 shadow-md"
      />

      {blog.content.map((section, index) => (
        <div key={index} className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {section.heading}
          </h2>
          <p className="text-gray-600 mt-2">{section.text}</p>
          {section.image && (
            <img
              src={section.image}
              alt={section.heading}
              className="w-full h-60 object-cover rounded-lg mt-4"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogDetail;
