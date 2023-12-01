// src/components/ToDo/TodoApp.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    addTodo,
    fetchTodos,
    selectAllTodos,
    deleteSelectedTodosLocally,
    removeTodo,
} from '../../store/slices/todoSlice';

import Todo from './Todo';

const TodoApp = () => {
    const dispatch = useDispatch();

    const { loading, error, todoArray } = useSelector((state) => state.todos);

    const [newTodo, setNewTodo] = useState('');
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;

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
        dispatch(selectAllTodos());
        selectedTodos.forEach((id) => {
            dispatch(removeTodo(id));
        });

        dispatch(deleteSelectedTodosLocally(selectedTodos));
        setSelectedTodos([]);
    };

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todoArray.slice(indexOfFirstTodo, indexOfLastTodo);

    const totalPages = Math.ceil(todoArray.length / todosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                {currentTodos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        isSelected={selectedTodos.includes(todo.id)}
                        toggleSelected={() => toggleSelectedTodo(todo)}
                    />
                ))}
            </ul>

            <div className='page_numbers' style={{ marginTop: '5px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TodoApp;


