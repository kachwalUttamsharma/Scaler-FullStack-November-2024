import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "TodoSlice",
  initialState: {
    inputValue: "",
    todoList: [],
  },
  reducers: {
    setInputValue: (state, data) => {
      console.log(data.payload);
      state.inputValue = data.payload;
    },
    addTask: (state, data) => {
      const currTask = data.payload;
      state.todoList.push(currTask);
      state.inputValue = "";
    },
  },
});

export const { setInputValue, addTask } = TodoSlice.actions;
export default TodoSlice.reducer;
