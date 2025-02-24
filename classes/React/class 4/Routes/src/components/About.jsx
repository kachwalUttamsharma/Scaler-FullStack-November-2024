import React, { useEffect } from "react";

const About = () => {
  //   const path = window?.location?.pathname;
  //   return <>{path === "/about" && <div>About</div>}</>;

  useEffect(() => {
    import("./Contact");
    import("./Projects");
  }, []);

  return <div>About</div>;
};

export default About;
