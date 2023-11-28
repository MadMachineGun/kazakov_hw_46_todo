
import React from 'react';
import { useDispatch } from 'react-redux';

import { removeTodo, toggleTodo } from '../../store/slices/todoSlice';

const Todo = ({ todo, index }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeTodo(index));
  };

  const toggleSelectedTodo = () => {
    dispatch(toggleTodo(index));
  };

  return (
      <li
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: '10px' }}
          onClick={toggleSelectedTodo}
      >
        <input type='checkbox' checked={todo.completed} readOnly />
        {todo.title || todo.text}
        <button onClick={handleRemove}>Delete</button>
      </li>
  );
};

export default Todo;
