import "./App.css";
import Counter from "./Components/Counter";
import CounterRedux from "./Components/CounterRedux";
import TodoList from "./Components/TodoList";
import User from "./Components/User";
import UserRedux from "./Components/UserRedux";

function App() {
  return (
    <>
      <Counter />
      <CounterRedux />
      <TodoList />
      <User />
      <UserRedux />
    </>
  );
}

export default App;
