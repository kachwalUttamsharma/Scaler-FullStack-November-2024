import React, { useMemo, useState } from "react";

const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState("");

  const expensiveCalculation = (count) => {
    console.log(count);
    // for (let i = 0; i < 10000; i++) {
    //   console.log(i);
    // }
    return count * 2 || 0;
  };

  const dumy = () => {
    console.log("dumy");
  };
  dumy();
  const computedValue = useMemo(() => expensiveCalculation(count), [count]);
  return (
    <div>
      <h1>Computed Value: {computedValue}</h1>
      <input
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Type something... for expensive func"
      />
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="new input"
      />
      <button onClick={() => setCount((prevState) => parseInt(prevState) + 1)}>
        Increment Count
      </button>
    </div>
  );
};

export default MemoExample;
