
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

            const todosWithStatusFalse = data.map((todo) => ({
                ...todo,
                completed: false,
                selected: false,
            }));

            dispatch(toggleSelectAll(todosWithStatusFalse));

            return todosWithStatusFalse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const selectAllTodos = createAsyncThunk(
    'todos/selectAllTodos',
    (_, { getState, dispatch }) => {
        const { todos } = getState();
        const allCompleted = todos.todoArray.every((todo) => todo.completed);

        const updatedTodos = todos.todoArray.map((todo) => ({
            ...todo,
            completed: !allCompleted,
            selected: !allCompleted && todo.selected,
        }));

        dispatch(toggleSelectAll(updatedTodos));
    }
);

export const deleteSelectedTodosLocally = (selectedIds) => (dispatch, getState) => {
    const { todos } = getState();

    const updatedTodos = todos.todoArray.filter((todo) => !selectedIds.includes(todo.id));

    dispatch(toggleSelectAll(updatedTodos));
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoArray: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoArray.unshift({ ...action.payload, selected: false });
        },
        removeTodo: (state, action) => {
            state.todoArray = state.todoArray.filter((todo) => todo.id !== action.payload);
        },
        // Removed toggleTodo from here
        toggleSelectAll: (state, action) => {
            state.todoArray = action.payload;
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

export const { addTodo, removeTodo, toggleSelectAll } = todoSlice.actions;

export default todoSlice.reducer;
