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
          style={{
            textDecoration: todo.completed ? 'none' : 'line-through',
            marginBottom: '10px',
          }}
          onClick={toggleSelectedTodo}
      >
        <input type="checkbox" checked={todo.completed} onChange={toggleSelectedTodo} />
        {todo.text}
        <button onClick={handleRemove}>Delete</button>
      </li>
  );
};

export default Todo;
