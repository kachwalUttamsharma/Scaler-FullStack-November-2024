import React from "react";

const MyComponent = ({ message = "defaultMessage" }) => {
  return (
    <>
      <div>MyComponent</div>
      <p>{message}</p>
    </>
  );
};

export default MyComponent;
