import React, { useContext } from "react";
import { AppContext } from "../ProviderComponent";

const C = () => {
  const { theme } = useContext(AppContext);
  console.log("Component C Rendered");
  return <h2>Theme: {theme}</h2>;
};

export default C;
