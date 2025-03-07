import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import todoSlice from "./TodoSlice";
import userslice from "./userSlice";

const store = configureStore({
  reducer: {
    counterState: counterSlice,
    todoState: todoSlice,
    userState: userslice.reducer,
  },
});

export default store;
