import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    addTodo,
    fetchTodos,
    selectAll,
    removeSelectedTodo,
} from '../../store/slices/todoSlice';

import Todo from './Todo';

const TodoApp = () => {
    const dispatch = useDispatch();

    const { loading, error, todoArray } = useSelector((state) => state.todos);

    const [newTodo, setNewTodo] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addNewTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo({
                text: newTodo,
                completed: false,
                selected: false,
            }));

            setNewTodo('');
        }
    };

    const handleRemoveAll = () => {
        setAllChecked(false);
        dispatch(removeSelectedTodo())
    };

    const handleSelectAll = () => {
        setAllChecked(!allChecked);
        dispatch(selectAll(!allChecked));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todoArray.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.ceil(todoArray.length / todosPerPage);

    return (
        <div>
            <h1>Todo List</h1>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleSelectAll}
            />
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={addNewTodo}>Add Todo</button>
            <button onClick={handleRemoveAll}>Delete Selected</button>

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


