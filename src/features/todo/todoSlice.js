import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setInitialTodo: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action) => {
      state.list = [...state.list, action.payload]
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((item, id) => id !== action.payload)
    },
    updateTodo: (state, action) => {
      state.list = state.list.map((item, id) => id === action.payload.id ? { ...item, ...action.payload.content } : item)
    },
    toggleStatus: (state, action) => {
      state.list = state.list.map((item, id) => id === action.payload.id ? { ...item, status: state.list[id].status === 0 ? 1 : 0 } : item)
    }
  },
});

export const { setInitialTodo, addTodo, removeTodo, updateTodo, toggleStatus } = todoSlice.actions;
export const selectTodo = (state) => state.todo.list;

export default todoSlice.reducer;
