import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {changeName} from '../../store/slices/userSlice';

import './main-header.scss';


export default function Header() {
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch();

  const todoNumber = useSelector(state => state.todos.todoArray.length);
  const userName = useSelector(state => state.user.userName);

  const onChangeName = () => {
    dispatch(changeName(newName));
    setEdit(false);
  };

  const onCancel = () => {
    setEdit(false);
  };

  return(
    <div className='main-header'>
      {
        edit ?
          <div>
            <input
              type='text'
              value={newName}
              placeholder='Enter your Name'
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className='header-btn' onClick={onChangeName}>OK</button>
            <button className='header-btn' onClick={onCancel}>Cancel</button>
          </div>
          :
          <span>
            Hello, {userName}! You have <span className='todo-nmbr'>{todoNumber}</span> todos to complete!
          </span>
      }


      <button
        className='header-btn'
        onClick={() => {
          setNewName(userName);
          setEdit(!edit);
        }}
      >
        Change Name
      </button>
    </div>
  );
}
