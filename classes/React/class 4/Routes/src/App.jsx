import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Home from "./components/Home";
import NavBar from "./components/NavBar";
// import Projects from "./components/Projects";
import PageNotFound from "./components/PageNotFound";
import User from "./components/User";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./components/Home"));
const Contact = React.lazy(() => import("./components/Contact"));
const Projects = React.lazy(() => import("./components/Projects"));
const About = React.lazy(() => import("./components/About"));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>....Loading</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/project" element={<Projects />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route
            path="/login"
            element={<Navigate to={"/home"}></Navigate>}
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
