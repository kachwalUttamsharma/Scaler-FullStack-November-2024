import React from "react";

const Button = () => {
  const handleClick = (e) => {
    console.log("event from click : ", e);
  };
  return <button onClick={handleClick}>Click Me</button>;
};

export default Button;
