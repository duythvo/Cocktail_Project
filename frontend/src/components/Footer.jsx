import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { asesets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="pb-10 flex flex-col md:flex-row justify-center md:justify-between items-center border-b-2 border-b-gray-300">
        <div className="flex flex-col gap-2 items-center md:items-start mb-3">
          <img
            onClick={() => {
              navigate("/");
              scrollToTop();
            }}
            className="w-40 cursor-pointer"
            src={asesets.logo}
            alt="Logo"
          />
          <p className="text-gray-600 ml-3 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div>
          <ul className="flex gap-5 items-center justify-center font-semibold">
            {["Recipes", "Blog", "Contact", "About us"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.replace(" ", "").toLowerCase()}`}
              >
                <li onClick={scrollToTop} className="cursor-pointer">
                  {item}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mb-5">
        ©️ 2023 by Double Duy. Proudly created with Wix.com
      </div>
    </div>
  );
};

export default Footer;
