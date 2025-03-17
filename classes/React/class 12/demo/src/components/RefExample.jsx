import React, { useRef } from "react";

const RefExample = () => {
  const inputRef = useRef(null);
  const focusInput = () => {
    console.log(inputRef.current);
    // console.log(document.getElementById("input"));
    // document.getElementById("input").focus();
    inputRef.current.focus();
  };
  return (
    <div>
      <input type="text" id="input" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default RefExample;
