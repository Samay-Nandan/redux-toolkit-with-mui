import { createSlice } from "@reduxjs/toolkit";
import { addTodo, getTodos, deleteTodo, updateTodo } from "../action/todo"

const initialState = {
    todosLength: 0,
    todos: [],
    addTodoStatus: "",
    addTodoError: "",
    getTodosStatus: "",
    getTodosError: "",
    deleteTodoStatus: "",
    deleteTodoError: "",
    updateTodoStatus: "",
    updateTodoError: "",
};

const todo = createSlice({
    name: "Todo",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.pending, (state, action) => {
                state.addTodoStatus = "pending";
                state.getTodosStatus = "";
                state.deleteTodoStatus = "";
                state.updateTodoStatus = "";
            })
            .addCase(addTodo.fulfilled, (state, { payload }) => {
                state.todos = [...state.todos, payload];
                state.addTodoStatus = "success";
                state.todosLength = state.todos.length;
            })
            .addCase(addTodo.rejected, (state, { payload }) => {
                state.addTodoStatus = "rejected";
                state.addTodoError = payload;
            })
            .addCase(getTodos.pending,(state, action) => {
                state.getTodosStatus = "pending";
                state.addTodoStatus = "";
                state.deleteTodoStatus = "";
                state.updateTodoStatus = "";
            })
            .addCase(getTodos.fulfilled, (state, { payload }) => {
                state.todos = payload;
                state.getTodosStatus = "success";
                state.todosLength = payload.length;
            })
            .addCase(getTodos.rejected, (state, { payload }) => {
                state.getTodosStatus = "rejected";
                state.getTodosError = payload;
            })
            .addCase(deleteTodo.pending, (state, action) => {
                state.deleteTodoStatus = "pending";
                state.addTodoStatus = "";
                state.getTodosStatus = "";
                state.updateTodoStatus = "";
            })
            .addCase(deleteTodo.fulfilled, (state, { payload }) => {
                state.todos = state.todos.filter( (todo) => todo._id !== payload._id );
                state.deleteTodoStatus = "success";
            })
            .addCase(deleteTodo.rejected, (state, { payload }) => {
                state.deleteTodoStatus = "rejected";
                state.deleteTodoError = payload;
            })
            .addCase(updateTodo.pending, (state, action) => {
                state.updateTodoStatus = "pending";
                state.addTodoStatus = "";
                state.getTodosStatus = "";
                state.deleteTodoStatus = "";
            })
            .addCase(updateTodo.fulfilled, (state, { payload }) => {
                state.todos = state.todos.map((todo) => todo._id === payload._id ? payload : todo );
                state.updateTodoStatus = "success";
            })
            .addCase(updateTodo.rejected, (state, { payload }) => {
                state.updateTodoStatus = "rejected";
                state.updateTodoError = payload;
            })
            .addCase("INCREMENT", (state, { payload }) => {
                state.todosLength = state.todosLength + payload;
            })
            .addCase("DECREMENT", (state, { payload }) => {
                state.todosLength = state.todosLength - payload;
            })
    },
  });

  export default todo.reducer;
