import React from "react";

const DisplayData = ({ person, fruits }) => {
  return (
    <>
      <div>DisplayData</div>

      <h2>Person Info: </h2>
      <p>{person?.name}</p>
      <p>{person?.age}</p>

      <h2>Fruits List:</h2>
      <ul>
        {fruits?.map((fruit, index) => {
          return <li key={index}>{fruit}</li>;
        })}
      </ul>
    </>
  );
};

export default DisplayData;
