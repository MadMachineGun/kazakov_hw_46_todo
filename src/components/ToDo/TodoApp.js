
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTodos, updateAllTodos } from '../../store/slices/todoSlice';

import Todo from './Todo';

const TodoApp = () => {
    const dispatch = useDispatch();

    const { loading, error, todoArray, selectAll } = useSelector((state) => state.todos);

    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const updatedTodos = [{ text: newTodo, completed: false }, ...todoArray];
            dispatch(updateAllTodos(updatedTodos));
            setNewTodo('');
        }
    };

    const deleteSelectedTodos = () => {
        const updatedTodos = todoArray.filter((todo) => !todo.completed);
        dispatch(updateAllTodos(updatedTodos));
        setNewTodo('');
    };

    const toggleSelectAllTodos = () => {
        dispatch(toggleSelectAll());
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="checkbox" onChange={toggleSelectAllTodos} checked={selectAll} />
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={addTodo}>Add Todo</button>

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
                {todoArray.slice(0, 10).map((todo, index) => (
                    <Todo key={index} todo={todo} index={index} />
                ))}
                {newTodo.trim() !== '' && (
                    <Todo key={todoArray.length} todo={{ text: newTodo, completed: false }} index={todoArray.length} />
                )}
            </ul>

            <button onClick={deleteSelectedTodos}>Delete selected</button>
        </div>
    );
};

export default TodoApp;
