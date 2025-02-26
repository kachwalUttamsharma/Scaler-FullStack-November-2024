import "./App.css";
import Button from "./Components/Button";
import ConditionalRendering from "./Components/ConditionalRendering";
import Counter from "./Components/Counter/Counter";
import DisplayData from "./Components/DisplayData";
import MyComponent from "./Components/MyComponent";
import React from "react";

function App() {
  const person = {
    name: "Deepak",
    age: 25,
  };

  const isLoggedIn = false;
  const username = "Shiva";

  const fruits = ["Apple", "Banana", "Cherry", "Oranges"];

  return (
    <>
      <div>React Project</div>
      {/* <MyComponent message="first" />
      <MyComponent message="second" />
      <MyComponent message="third" />
      <MyComponent message="fourth" />
      <MyComponent />
      <DisplayData person={person} fruits={fruits} />
      <ConditionalRendering isLoggedIn={isLoggedIn} username={username} />
      <Button /> */}
      <Counter />
    </>
  );
}

export default App;
