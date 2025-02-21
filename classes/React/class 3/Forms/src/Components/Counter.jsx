import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  console.log("before useEffect");
  // restrict it execute only once when component is mounted
  // when count variable is updated or changes cb will be executed
  useEffect(() => {
    console.log("use effect callback is executed");
    document.title = count;
    const token = setInterval(() => {
      console.log("interval callback is executing");
    }, 2000);
    // clean up
    // when component is unmounted
    return () => {
      console.log("component is unmounted");
      clearInterval(token);
    };
  }, [count]);
  console.log("after useEffect");
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me To Increase</button>
      <button onClick={() => setCount(count - 1)}>Click me To Decrease</button>
      <p>You clicked {count1} times</p>
      <button onClick={() => setCount1(count1 + 1)}>
        Click me To Increase
      </button>
      <button onClick={() => setCount1(count1 - 1)}>
        Click me To Decrease
      </button>
    </div>
  );
};

export default Counter;
