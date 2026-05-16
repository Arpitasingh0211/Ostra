import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { MapPinIcon } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
   
    <div className="w-full px-8 py-3 absolute z-60 ">
      <div className="z-30 max-w-7xl sticky top-0  mx-auto bg-white/80 backdrop-blur-md border-b-2 border-[#ECEAF3] rounded-3xl px-8 py-4 flex items-center justify-between shadow-sm">
        {/*logo section */}
        <div className="flex items-center gap-8">
          <Link to={"/"}>
            <h1 className="text-4xl font-bold text-[#42005a] font-display tracking-wide">
              Ostra
            </h1>
          </Link>

        {/*location section */}
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center relative top-1">
            <MapPinIcon className="text-purple-500 h-5 w-5 " />
            <span className=" text-sm font-display text-gray-600">
              {location ? (
                <div className="flex gap-1 relative top-0.2">
                  <p>{location.country}, {location.state}, {location.city}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>  
          </div>
        </div>

        {/*menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="hidden md:flex items-center gap-10 text-[#4B5563] font-medium">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                ` ${isActive ? "text-purple-600 transition-all border-b-2 border-purple-600" : "text-gray-800"} hover:text-purple-500`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                ` ${isActive ? "text-purple-600 transition-all border-b-2 border-purple-600" : "text-gray-800"} hover:text-purple-500`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                ` ${isActive ? "text-purple-600 transition-all border-b-2 border-purple-600" : "text-gray-800"} hover:text-purple-500`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                ` ${isActive ? "text-purple-600 transition-all border-b-2 border-purple-600" : "text-gray-800"} hover:text-purple-500`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative cursor-pointer">
            <HiOutlineShoppingBag className="text-3xl text-[#111827]" />
            <span className="absolute -top-2 -right-2 bg-[#8B7CF6] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <div>
            <header>
              <Show when="signed-out">
                <SignInButton className="bg-[#F3F1F8] hover:bg-[#8B7CF6] hover:text-white transition-all duration-300 text-[#8B7CF6] px-6 py-3 rounded-2xl font-semibol" />
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </header>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
