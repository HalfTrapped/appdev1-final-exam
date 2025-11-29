import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice.jsx";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
