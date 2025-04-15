import React, { useContext, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { NavLink, useNavigate } from "react-router-dom";
import { asesets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, user } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowDropdown(false);
  };
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-40 cursor-pointer"
        src={asesets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="font-semibold text-xl whitespace-nowrap ">Home</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
        <NavLink to="/recipes">
          <li className="font-semibold text-xl whitespace-nowrap ">Recipes</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
        <NavLink to="/blog">
          <li className="font-semibold text-xl whitespace-nowrap ">Blog</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
        <NavLink to="/contact">
          <li className="font-semibold text-xl whitespace-nowrap ">Contact</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
        <NavLink to="/about">
          <li className="font-semibold text-xl whitespace-nowrap ">About</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
        <NavLink to="/cart">
          <li className="font-semibold text-xl whitespace-nowrap ">Cart</li>
          <hr className="hidden mt-1 w-2/3 m-auto h-0.5 border-none outline-none bg-black" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && user ? (
          <div className="relative w-40 items-end flex justify-end">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img className="w-8 rounded-full" src={user.image} alt="" />
              <img className="w-2.5" src={asesets.dropdown_icon} alt="" />
            </div>

            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md py-2 w-48 z-50">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-recipes");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  My Recipes
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black font-semibold text-white px-8 py-3 rounded-full hidden md:block cursor-pointer"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={asesets.menu_icon}
          alt=""
        />
        {/**Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }   md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-ce justify-between px-5 py-6">
            <img className="w-10 rounded-full" src={user.image} alt="" />
            <img
              className="w-10"
              onClick={() => setShowMenu(false)}
              src={asesets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/recipes">
              <p className="px-4 py-2 rounded inline-block">Recipes</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/blog">
              <p className="px-4 py-2 rounded inline-block">Blog</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/cart">
              <p className="px-4 py-2 rounded inline-block">Cart</p>
            </NavLink>
            {token && user ? (
              <></>
            ) : (
              <NavLink onClick={() => setShowMenu(false)} to="/login">
                <p className="px-4 py-2 rounded inline-block bg-black text-white">
                  Login
                </p>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
