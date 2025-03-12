import React, { useCallback, useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState("");
  console.log("counter is rendered");

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  }, [count]);

  return (
    <div>
      <ShowCount count={count} increment={increment} />
      <br />
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
};

const ShowCount = React.memo(({ count = 0, increment }) => {
  console.log("show count being rendered");
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </>
  );
});

export default Counter;

//  memo - caches react component
//  usecallback - caches function
// usememo - caches value
// transistion
