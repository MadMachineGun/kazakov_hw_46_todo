import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {addTodo, fetchTodos, selectAllTodos, deleteSelectedTodosLocally} from '../../store/slices/todoSlice';

import Todo from './Todo';


const TodoApp = () => {
    const dispatch = useDispatch();

    const {loading, error, todoArray} = useSelector((state) => state.todos);

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

    const handleSelectAll = () => {
        dispatch(selectAllTodos());
    };

    const handleDeleteSelected = () => {
        dispatch(deleteSelectedTodosLocally());
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="checkbox" onChange={handleSelectAll}/>
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
                    marginLeft: '1em',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                {todoArray.map((todo, index) => (
                    <Todo key={index} todo={todo} index={index}/>
                ))}
            </ul>
            <button className='del-selected' onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
    );
};

export default TodoApp;

