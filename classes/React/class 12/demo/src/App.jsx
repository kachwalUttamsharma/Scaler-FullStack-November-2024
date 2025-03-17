import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RefExample from "./components/RefExample";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import Carousel from "./components/Carousel";
import RefExample1 from "./components/RefExample1";
import Modal from "./components/Modal";
import useVisibility from "./customHook/useVisibility";

function App() {
  const [count, setCount] = useState(0);
  const { isVisible, hide, show, toggle } = useVisibility(false);

  return (
    <>
      {/* <RefExample />
      <Timer /> */}
      <Stopwatch />
      {/* <Carousel /> */}
      {/* <RefExample1 /> */}

      <div>
        <button onClick={show}>Show Modal</button>
        <button onClick={toggle}>Toggle Modal</button>
        <Modal isVisible={isVisible} hide={hide} />
      </div>
    </>
  );
}

export default App;
