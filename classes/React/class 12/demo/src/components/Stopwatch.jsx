// Create a stopwatch application using React. The stopwatch should have the following features:

// Start the timer.
// Stop the timer.
// Reset the timer.
// Display the elapsed or current time in a format of hours:minutes:seconds.

// 00:00:00
// 00:00:01

import React, { useEffect, useRef, useState } from "react";
import useVisibility from "../customHook/useVisibility";
import Modal from "./Modal";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const timeRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  // const { isVisible, hide, show, toggle } = useVisibility(false);

  useEffect(() => {
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setIsRunning(true);
      setTimer((prevState) => prevState + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timeRef.current);
  };
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timeRef.current);
    setTimer(0);
  };

  const formatTimer = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(timer / 60)}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  return (
    <div>
      {/* <div>
        <button onClick={show}>Show Modal</button>
        <button onClick={toggle}>Toggle Modal</button>
        <Modal isVisible={isVisible} hide={hide} />
      </div> */}
      <h1>{formatTimer(timer)}</h1>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer} disabled={!isRunning && timer <= 0}>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
