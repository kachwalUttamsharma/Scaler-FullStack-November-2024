import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            {/* <a href="/home">Home Page</a> */}
            <NavLink
              to="/home"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "tomato" : "black",
                };
              }}
            >
              Home Page
            </NavLink>
          </li>
          <li>
            {/* <a href="/about">About Page</a> */}
            <NavLink
              to="/about"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "tomato" : "black",
                };
              }}
            >
              About Page
            </NavLink>
          </li>
          <li>
            {/* <a href="/contact">Contact Page</a> */}
            <NavLink
              to="/contact"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "tomato" : "black",
                };
              }}
            >
              Contact Page
            </NavLink>
          </li>
          <li>
            {/* <a href="/project">Project Page</a> */}
            <NavLink
              to="/project"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "tomato" : "black",
                };
              }}
            >
              Project Page
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
