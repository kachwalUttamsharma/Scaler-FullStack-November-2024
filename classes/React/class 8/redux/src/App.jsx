import "./App.css";
import Counter from "./Components/Counter";
import CounterRedux from "./Components/CounterRedux";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <>
      <Counter />
      <CounterRedux />
      <TodoList />
    </>
  );
}

export default App;
