import React from 'react';

import { CurrentTheme } from '../../contexts/CurrentTheme';

function Task({ task, onRemove, onEdit, onComplete }) {
  const currentTheme = React.useContext(CurrentTheme);

  const onCheckboxClick = (e) => {
    onComplete(task);
  };

  return (
    <li key={task.id} className={`tasks__items-row ${task.completed && 'tasks__items-row_completed'}`}>
      <div className='checkbox'>
        <input type='checkbox' name='' id={`task-${task.id}`} onChange={onCheckboxClick} checked={task.completed} />
        <label htmlFor={`task-${task.id}`}>
          <svg
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            aria-labelledby='okIconTitle'
            stroke='#444'
            strokeWidth='2'
            strokeLinecap='square'
            strokeLinejoin='miter'
            fill='none'
            color='#444'
          >
            {' '}
            <title id='okIconTitle'>Ok</title> <polyline points='4 13 9 18 20 7' />{' '}
          </svg>
        </label>
      </div>
      <p>{task.text}</p>
      <div className='tasks__items-row-actions'>
        <svg
          onClick={() => {
            onEdit(task);
          }}
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          width='24px'
          height='24px'
          viewBox='0 0 24 24'
          aria-labelledby='editIconTitle'
          stroke='#444'
          strokeWidth='2'
          strokeLinecap='square'
          strokeLinejoin='miter'
          fill='none'
          color='#444'
          style={currentTheme.icons}
        >
          {' '}
          <title id='editIconTitle'>Edit</title>{' '}
          <path d='M18.4142136 4.41421356L19.5857864 5.58578644C20.366835 6.36683502 20.366835 7.63316498 19.5857864 8.41421356L8 20 4 20 4 16 15.5857864 4.41421356C16.366835 3.63316498 17.633165 3.63316498 18.4142136 4.41421356zM14 6L18 10' />{' '}
        </svg>
        <svg
          onClick={() => onRemove(task.id)}
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          width='24px'
          height='24px'
          viewBox='0 0 24 24'
          aria-labelledby='removeIconTitle'
          stroke='#444'
          strokeWidth='2'
          strokeLinecap='square'
          strokeLinejoin='miter'
          fill='none'
          color='#444'
          style={currentTheme.icons}
        >
          {' '}
          <title id='removeIconTitle'>Remove</title> <path d='M17,12 L7,12' /> <circle cx='12' cy='12' r='10' />{' '}
        </svg>
      </div>
    </li>
  );
}

export default Task;
