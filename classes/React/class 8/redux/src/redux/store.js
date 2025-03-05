import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import todoSlice from "./TodoSlice";

const store = configureStore({
  reducer: {
    counterState: counterSlice,
    todoState: todoSlice,
  },
});

export default store;
