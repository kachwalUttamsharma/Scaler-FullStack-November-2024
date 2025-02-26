import React, { useState } from "react";
import "./Counter.css";

const Counter = () => {
  let [count, setCount] = useState(0);
  let [increment_decrement, setIncrementDecrement] = useState(1);

  const addClickHandler = () => {
    console.log("addClick is called");

    // setCount(currentCount);
    setCount(
      (prevCount) => parseInt(prevCount) + parseInt(increment_decrement)
    );
    console.log(count);
  };
  const subtractClickHandler = () => {
    console.log("subtract is called");
    if (parseInt(count) - parseInt(increment_decrement) < 0) {
      setCount(0);
    } else {
      setCount(
        (prevCount) => parseInt(prevCount) - parseInt(increment_decrement)
      );
    }
    console.log(count);
  };
  const resetHandler = () => {
    console.log("reset is called");
    setCount(0);
    setIncrementDecrement(1);
    console.log(count);
  };

  const increment_decrementHandler = (e) => {
    setIncrementDecrement(e.target.value);
  };
  return (
    <div className="container">
      <h1>Counter</h1>
      <div id="number">{count}</div>
      <div>
        Increment/Decrement By
        <input
          type="number"
          id="increment_decrement"
          value={increment_decrement}
          onChange={increment_decrementHandler}
        />
      </div>
      <div>
        <button id="add" onClick={addClickHandler}>
          +
        </button>
        <button id="subtract" onClick={subtractClickHandler}>
          -
        </button>
      </div>
      <button id="reset" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
