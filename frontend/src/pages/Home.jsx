import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import TopRecipes from "../components/TopRecipes";

const Home = () => {
  return (
    <div>
      <Header />
      <TopRecipes />
      <Content />
    </div>
  );
};

export default Home;
