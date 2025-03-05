import React, { useContext } from "react";
import { AppContext } from "../ProviderComponent";

const B = () => {
  const { setCount } = useContext(AppContext);
  console.log("Component B rendered");
  return (
    <button onClick={() => setCount((prevCount) => prevCount + 1)}>
      Increment
    </button>
  );
};

export default B;
