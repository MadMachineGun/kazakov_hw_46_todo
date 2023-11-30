import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    addTodo,
    fetchTodos,
    selectAllTodos,
    deleteSelectedTodosLocally,
    removeTodo,
    // toggleSelectAll,
} from '../../store/slices/todoSlice';

import Todo from './Todo';

const TodoApp = () => {
    const dispatch = useDispatch();

    const { loading, error, todoArray } = useSelector((state) => state.todos);

    const [newTodo, setNewTodo] = useState('');
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addNewTodo = () => {
        if (newTodo.trim() !== '') {
            const newTodoObject = {
                text: newTodo,
                completed: false,
                selected: false,
            };

            dispatch(addTodo(newTodoObject));
            setNewTodo('');
        }
    };

    const handleSelectAll = () => {
        const allTodoIds = todoArray.map((todo) => todo.id);

        if (!selectAll) {
            setSelectedTodos(allTodoIds);
        } else {
            setSelectedTodos([]);
        }

        setSelectAll((prev) => !prev);
        dispatch(selectAllTodos());
    };

    const toggleSelectedTodo = (todo) => {
        setSelectedTodos((prevSelectedTodos) => {
            if (prevSelectedTodos.includes(todo.id)) {
                return prevSelectedTodos.filter((id) => id !== todo.id);
            } else {
                return [...prevSelectedTodos, todo.id];
            }
        });

        dispatch(selectAllTodos());
    };

    const handleDeleteSelected = () => {
        selectedTodos.forEach((id) => {
            dispatch(removeTodo(id));
        });

        dispatch(deleteSelectedTodosLocally());
        setSelectedTodos([]);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={addNewTodo}>Add Todo</button>
            <button onClick={handleDeleteSelected}>Delete Selected</button>

            {loading && <h3>Loading....</h3>}
            {error && <h3>{error}</h3>}

            <ul
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                {todoArray.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        isSelected={selectedTodos.includes(todo.id)}
                        toggleSelected={() => toggleSelectedTodo(todo)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;







