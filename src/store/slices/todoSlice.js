import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            console.log(response);

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

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoArray: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todoArray.push({text: action.payload, completed: false});
        },
        removeTodo(state, action) {
            state.todoArray = state.todoArray.filter((todo, index) => index !== action.payload);
        },
        toggleTodo(state, action) {
            state.todoArray = state.todoArray.map((todo, index) =>
                index === action.payload ? {...todo, completed: !todo.completed} : todo
            );
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            console.log(action);
            state.loading = true;
        },
        [fetchTodos.fulfilled]: (state, action) => {

            state.todoArray = action.payload.slice(0, 10);
            state.loading = false;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer;
