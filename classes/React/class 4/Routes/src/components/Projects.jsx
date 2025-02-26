import React from "react";

const Projects = () => {
  const path = window?.location?.pathname;
  return <>{path === "/project" && <div>Projects</div>}</>;
  //   return <div>Projects</div>;
};

export default Projects;
