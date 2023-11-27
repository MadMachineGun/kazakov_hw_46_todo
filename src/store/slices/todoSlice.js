
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, { rejectWithValue }) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Something went wrong....');
        }

        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const updateAllTodos = createAsyncThunk(
    'todos/updateAllTodos',
    async function (todos, { rejectWithValue, dispatch }) {
      try {
        // Логика обновления всех тудушек
        // ...

        // Предположим, что ваши обновленные тудушки хранятся в переменной updatedTodos
        // dispatch(fetchTodos()); // Запуск загрузки обновленного списка тудушек

        // В этом примере fetchTodos() не вызывается, так как предполагается, что обновление происходит в локальном состоянии
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoArray: [],
    loading: false,
    error: null,
    selectAll: false,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoArray.push({ text: action.payload, completed: false });
    },
    removeTodo: (state, action) => {
      state.todoArray = state.todoArray.filter((todo, index) => index !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todoArray = state.todoArray.map((todo, index) =>
          index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
    toggleSelectAll: (state) => {
      state.selectAll = !state.selectAll;
      state.todoArray = state.todoArray.map((todo) => ({
        ...todo,
        completed: state.selectAll,
      }));
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.todoArray = action.payload;
      state.loading = false;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateAllTodos.pending]: (state) => {
      state.loading = true;
    },
    [updateAllTodos.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateAllTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, toggleSelectAll } = todoSlice.actions;

export default todoSlice.reducer;
