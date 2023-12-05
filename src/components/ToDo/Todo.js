import { useDispatch } from 'react-redux';

import { removeTodo, selectTodo, toggleTodo } from '../../store/slices/todoSlice';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleSelect = () => {
    dispatch(selectTodo(todo.id));
  };

  return (
      <li>
        <input
            type='checkbox'
            checked={todo.selected}
            onChange={handleSelect}
        />
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            marginBottom: '10px',
          }}
          onClick={handleToggle}
        >
          {todo.title || todo.text}
        </span>

        <button onClick={handleRemove}>Delete</button>
      </li>
  );
};

export default Todo;

