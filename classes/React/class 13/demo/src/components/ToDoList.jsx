import React, { useEffect, useState } from "react";

// class TodoList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: [],
//       newTodo: "",
//     };
//     console.log("Constructor: Setting up initial state and bindings.");
//   }

//   componentDidMount() {
//     console.log("Component Did Mount: Fetching initial to-do items.");
//     // Simulate fetching data from an API
//     setTimeout(() => {
//       this.setState({
//         todos: ["Learn React", "Read a book"],
//       });
//     }, 1000);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("Component Did Update: Checking if new to-do was added.");
//     if (prevState.todos !== this.state.todos) {
//       console.log("Updated To-dos:", this.state.todos);
//     }
//   }

//   componentWillUnmount() {
//     console.log("Component Will Unmount: Cleaning up resources.");
//   }

//   handleInputChange = (event) => {
//     this.setState({ newTodo: event.target.value });
//   };

//   handleAddTodo = () => {
//     this.setState((state) => ({
//       todos: [...state.todos, state.newTodo],
//       newTodo: "",
//     }));
//   };

//   render() {
//     console.log("Render: Rendering the to-do list.");
//     return (
//       <div>
//         <h1>My To-Do List</h1>
//         <ul>
//           {this.state.todos.map((todo, index) => (
//             <li key={index}>{todo}</li>
//           ))}
//         </ul>
//         <input
//           type="text"
//           value={this.state.newTodo}
//           onChange={this.handleInputChange}
//         />
//         <button onClick={this.handleAddTodo}>Add To-Do</button>
//       </div>
//     );
//   }
// }

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewToDo] = useState("");

  console.log("Constructor: Setting up initial state and bindings.");

  // componentdidmount
  useEffect(() => {
    console.log("Component Did Mount: Fetching initial to-do items.");
    setTimeout(() => {
      console.log("Timeout expired, its time to update state");
      setTodos(["Learn React", "Read a book"]);
    }, 5000);
    return () => {
      console.log("Component Will Unmount: Cleaning up resources.");
    };
  }, []);

  // componentdidupdate
  useEffect(() => {
    console.log("Component Did Update: Checking if new to-do was added.");
    console.log("Updated To-dos:", todos);
    return () => {
      console.log("Component Will Unmount: Cleaning up resources.");
    };
  }, [todos]);

  const handleInputChange = (event) => {
    setNewToDo(event.target.value);
  };
  const handleAddTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setNewToDo("");
  };
  return (
    <div>
      {console.log("rendering jsx")}
      <h1>My To-Do List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add To-Do</button>
    </div>
  );
};
export default TodoList;
