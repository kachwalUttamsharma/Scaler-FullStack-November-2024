import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import Counter from "./components/Counter";
import TodoList from "./components/ToDoList";
import withLoading from "./components/HOC/WithLoading";
import DataComponent from "./components/HOC/DataComponent";

function App() {
  const [show, setShow] = useState(true);

  const EnhanceComponent = withLoading(DataComponent);
  return (
    <>
      {/* <HelloWorld name={"Mohan"} />
      <Counter />
      {show ? <TodoList /> : <div>Hidden TodoList</div>}
      <button onClick={() => setShow((prev) => !prev)}>Toggle ToDoList</button> */}
      <EnhanceComponent data={"here is some data"} />
    </>
  );
}

export default App;
