// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//
// export const fetchTodos = createAsyncThunk(
//     'todos/fetchTodos',
//     async function (_, {rejectWithValue}) {
//         try {
//             const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//             const data = await response.json();
//
//             if (!response.ok) {
//                 throw new Error('Something went wrong....');
//             }
//
//             data.forEach((todo) => {
//                 console.log('Todo:', todo);
//             });
//
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );
//
// export const selectAllTodos = createAsyncThunk(
//     'todos/selectAllTodos',
//     (_, {getState, dispatch}) => {
//         const {todos} = getState();
//         const allCompleted = todos.todoArray.every((todo) => todo.completed);
//
//         const updatedTodos = todos.todoArray.map((todo) => ({
//             ...todo,
//             completed: !allCompleted,
//             selected: !allCompleted,
//         }));
//
//         dispatch(toggleSelectAll(updatedTodos));
//     }
// );
//
// export const deleteSelectedTodos = createAsyncThunk(
//     'todos/deleteSelectedTodos',
//     (_, {getState, dispatch}) => {
//         const {todos} = getState();
//         const selectedTodos = todos.todoArray.filter((todo) => todo.selected);
//
//         const updatedTodos = todos.todoArray.filter((todo) => !todo.selected);
//
//         dispatch(toggleSelectAll(updatedTodos));
//
//
//         selectedTodos.forEach(async (todo) => {
//             try {
//
//                 await fetch(`https://your-api.com/todos/${todo.id}`, {
//                     method: 'DELETE',
//                 });
//             } catch (error) {
//                 console.error('Error deleting todo:', error);
//             }
//         });
//
//         return selectedTodos;
//     }
// );
//
// const todoSlice = createSlice({
//     name: 'todos',
//     initialState: {
//         todoArray: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         addTodo: (state, action) => {
//             state.todoArray.push({text: action.payload, completed: false, selected: false});
//         },
//         removeTodo: (state, action) => {
//             state.todoArray = state.todoArray.filter((todo, index) => index !== action.payload);
//         },
//         toggleTodo: (state, action) => {
//             state.todoArray = state.todoArray.map((todo, index) =>
//                 index === action.payload ? {...todo, completed: !todo.completed} : todo
//             );
//         },
//         toggleSelectAll: (state, action) => {
//             state.todoArray = action.payload;
//         },
//     },
//     extraReducers: {
//         [fetchTodos.pending]: (state) => {
//             state.loading = true;
//         },
//         [fetchTodos.fulfilled]: (state, action) => {
//             state.todoArray = action.payload.slice(0, 10).map((todo) => ({
//                 ...todo,
//                 completed: false,
//                 selected: false,
//             }));
//             state.loading = false;
//         },
//         [fetchTodos.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     },
// });
//
// export const {addTodo, removeTodo, toggleTodo, toggleSelectAll} = todoSlice.actions;
//
// export default todoSlice.reducer;
//


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong....');
            }

            data.forEach((todo) => {
                console.log('Todo:', todo);
            });

            return data;
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
            selected: !allCompleted,
        }));

        dispatch(toggleSelectAll(updatedTodos));
    }
);

// Уберем асинхронность, так как теперь не отправляем запросы на удаленный сервер
export const deleteSelectedTodosLocally = () => (dispatch, getState) => {
    const { todos } = getState();
    const selectedTodos = todos.todoArray.filter((todo) => todo.selected);

    const updatedTodos = todos.todoArray.filter((todo) => !todo.selected);

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
            state.todoArray.push({ text: action.payload, completed: false, selected: false });
        },
        removeTodo: (state, action) => {
            state.todoArray = state.todoArray.filter((todo, index) => index !== action.payload);
        },
        toggleTodo: (state, action) => {
            state.todoArray = state.todoArray.map((todo, index) =>
                index === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        },
        toggleSelectAll: (state, action) => {
            state.todoArray = action.payload;
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.loading = true;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.todoArray = action.payload.slice(0, 10).map((todo) => ({
                ...todo,
                completed: false,
                selected: false,
            }));
            state.loading = false;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addTodo, removeTodo, toggleTodo, toggleSelectAll } = todoSlice.actions;

export default todoSlice.reducer;
