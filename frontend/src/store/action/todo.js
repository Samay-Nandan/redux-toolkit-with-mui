  import { createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";

  const { REACT_APP_BACKEND_URL } = process.env

  export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (todo, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/todos`, todo);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (id = null, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/todos`);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(`${REACT_APP_BACKEND_URL}/todos/${id}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (todo, { rejectWithValue }) => {
      try {
        const { _id, task, author, isComplete, date, uid } = todo;
        const payload = { task, author, isComplete, date, uid }
        const { data } = await axios.put(`${REACT_APP_BACKEND_URL}/todos/${_id}`, payload);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );