import React, { useContext } from "react";
import { AppContext } from "../ProviderComponent";

const D = () => {
  const { setTheme } = useContext(AppContext);
  console.log("Component D Rendered");
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      Toggle Theme
    </button>
  );
};

export default D;
