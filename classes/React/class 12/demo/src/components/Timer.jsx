import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  let token = useRef(null);
  useEffect(() => {
    token.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);

    return () => {
      clearInterval(token.current);
    };
  }, []);

  return (
    <>
      <div>Seconds: {seconds}</div>
      <button
        onClick={() => {
          clearInterval(token.current);
        }}
      >
        Stop Timer
      </button>
    </>
  );
};

export default Timer;
