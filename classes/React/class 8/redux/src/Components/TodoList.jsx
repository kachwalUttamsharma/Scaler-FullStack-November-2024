import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setInputValue } from "../redux/TodoSlice";

const TodoList = () => {
  const { inputValue, todoList } = useSelector((store) => store.todoState);

  const dispatch = useDispatch();

  return (
    <div>
      <h2>To Do List</h2>
      <div>
        <div className="inputbox">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              dispatch(setInputValue(val));
            }}
          />
          <button
            onClick={() => {
              dispatch(addTask(inputValue));
            }}
          >
            Submit
          </button>
        </div>
        <div>
          {todoList.map((task, id) => {
            return (
              <li key={id}>
                {id} : {task}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
