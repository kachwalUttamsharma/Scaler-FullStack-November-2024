import React from "react";

const Home = () => {
  const path = window?.location?.pathname;
  return <>{path === "/home" && <div>Home</div>}</>;
  //   return <div>Home</div>;
};

export default Home;
