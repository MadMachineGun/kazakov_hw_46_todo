import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeTodo, toggleTodo } from '../../store/slices/todoSlice';

const Todo = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(todo.selected);

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeTodo(index));
  };

  const toggleSelectedTodo = () => {
    dispatch(toggleTodo(index));
    setIsChecked(!isChecked);
  };

  return (
      <li
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginBottom: '10px' }}
          onClick={toggleSelectedTodo}
      >
        <input
            type='checkbox'
            checked={isChecked || todo.completed}
            readOnly
        />
        {todo.title || todo.text}
        <button onClick={handleRemove}>Delete</button>
      </li>
  );
};

export default Todo;

