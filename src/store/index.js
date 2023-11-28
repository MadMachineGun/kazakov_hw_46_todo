import {configureStore} from '@reduxjs/toolkit';

import todoReducer from './slices/todoSlice';
import useReducer from './slices/userSlice';


export default configureStore({
    reducer: {
        todos: todoReducer,
        user: useReducer,
    }
});
