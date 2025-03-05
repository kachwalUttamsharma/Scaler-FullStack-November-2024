import React, { useContext } from "react";
import { AppContext } from "../ProviderComponent";

const A = () => {
  const { count } = useContext(AppContext);
  console.log("Component A rendered");
  return <h2>Count: {count}</h2>;
};

export default A;
