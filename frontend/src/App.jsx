import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import RecipesDetail from "./pages/RecipesDetail";
import MyProfile from "./pages/MyProfile";
import BlogDetail from "./pages/BlogDetail";
import MyRecipes from "./pages/MyRecipes";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="mx-5 sm:mx-[5%]">
      <ScrollToTop/>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<RecipesDetail />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
