// import {useState, useEffect} from 'react';
// import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
//
// import {addTodo, fetchTodos} from '../../store/slices/todoSlice';
//
// import Todo from './Todo';
//
// const TodoApp = () => {
//     const dispatch = useDispatch();
//
//     const {loading, error, todoArray} = useSelector(state => state.todos)
//
//     const [newTodo, setNewTodo] = useState('');
//
//     useEffect(() => {
//         dispatch(fetchTodos())
//     }, []);
//
//     const addNewTodo = () => {
//         if (newTodo.trim() !== '') {
//             dispatch(addTodo(newTodo));
//             setNewTodo('');
//         }
//     };
//
//     return (
//         <div>
//             <h1>Todo List</h1>
//             <input type='checkbox'/>
//             <input
//                 type="text"
//                 value={newTodo}
//                 onChange={e => setNewTodo(e.target.value)}
//                 placeholder="Enter a new todo"
//             />
//             <button onClick={addNewTodo}>Add Todo</button>
//
//             {loading && <h3>Loading....</h3>}
//             {error && <h3>{error}</h3>}
//
//             <ul style={{
//                 marginLeft: '15px',
//                 marginTop: '20px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 justifyContent: 'center'
//             }}>
//                 {todoArray.map((todo, index) => (
//                     <Todo
//                         key={index}
//                         todo={todo}
//                         index={index}
//                     />
//                 ))}
//             </ul>
//         </div>
//     );
// };
//


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTodo, fetchTodos } from '../../store/slices/todoSlice';

import Todo from './Todo';

const TodoApp = () => {
    const dispatch = useDispatch();

    const { loading, error, todoArray } = useSelector((state) => state.todos);

    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addNewTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="checkbox" />
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={addNewTodo}>Add Todo</button>

            {loading && <h3>Loading....</h3>}
            {error && <h3>{error}</h3>}

            <ul
                style={{
                    marginLeft: '15px',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                {todoArray.map((todo, index) => (
                    <Todo key={index} todo={todo.text} index={index} />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
