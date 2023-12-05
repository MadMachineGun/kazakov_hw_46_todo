import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue('Something went wrong....');
            }

            return data.map((todo) => ({
                ...todo,
                completed: false,
                selected: false,
            }));

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
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoArray.push({ ...action.payload, selected: false, completed: false, id: Math.random() });
        },
        removeTodo: (state, action) => {
            state.todoArray = state.todoArray.filter((todo) => todo.id !== action.payload);
        },
        removeSelectedTodo: (state, action) => {
            state.todoArray = state.todoArray.filter((todo) => !todo.selected);
        },
        toggleTodo(state, action) {
            state.todoArray = state.todoArray.map((todo) =>
              todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },
        selectTodo: (state, action) => {
            state.todoArray = state.todoArray.map((todo) =>
              todo.id === action.payload ? { ...todo, selected: !todo.selected } : todo
            );
        },
        selectAll: (state, action) => {
            state.todoArray = state.todoArray.map((todo) => {
                return { ...todo, selected: action.payload };
            });
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
    },
});

export const {
    addTodo,
    removeTodo,
    removeSelectedTodo,
    toggleTodo,
    selectTodo,
    selectAll,
} = todoSlice.actions;

export default todoSlice.reducer;
