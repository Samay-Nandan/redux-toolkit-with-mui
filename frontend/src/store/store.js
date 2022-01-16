import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todo";

const { NODE_ENV } = process.env

const store = configureStore({
  reducer: { 
    todosState: todoReducer,
  },
  devTools: NODE_ENV !== 'production'
});

export default store