import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/MovieLogo.png";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-8 items-center pl-3 py-4">
        <li>
          <NavLink to="/">
            <img className="w-[50px]" src={Logo} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            className="text-3xl font-bold text-blue-500"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watchList"
            className="text-3xl font-bold text-blue-500"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            WatchList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
