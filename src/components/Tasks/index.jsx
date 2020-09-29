import React from 'react';
import { Link } from 'react-router-dom';

import { CurrentTheme } from '../../contexts/CurrentTheme';

import './Tasks.scss';
import editSvg from '../../assets/img/ikonate/edit.svg';
import AddItemForm from './AddItemForm';
import Task from './Task';

function Tasks({ list, onEditTitle, onAddTask, noEmpty, onEditTask, onRemoveTask, onCompleteTask }) {
  const currentTheme = React.useContext(CurrentTheme);

  const [isAddFormOpened, setIsAddFormOpened] = React.useState(false);

  const editTitle = () => {
    const newTitle = window.prompt('Имя списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
    }
  };

  const onEdit = (taskObj) => {
    onEditTask(list.id, taskObj);
  };

  const onRemove = (taskId) => {
    onRemoveTask(list.id, taskId);
  };

  const onComplete = (taskObj) => {
    onCompleteTask(list.id, taskObj);
  };

  return (
    <div className='tasks' style={currentTheme.icons}>
      <div className='tasks__header'>
        <div className='tasks__title'>
          <Link to={'/lists/' + list.id}>
            <h2 style={{ color: list.color.hex }}>{list.name}</h2>
          </Link>
          <img src={editSvg} alt='Редактировать' onClick={editTitle} />
        </div>

        <div className='tasks__toolbar'>
          <svg
            onClick={() => {
              setIsAddFormOpened(!isAddFormOpened);
            }}
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-labelledby='cartAddIconTitle'
            stroke='#444'
            strokeWidth='2'
            strokeLinecap='square'
            strokeLinejoin='miter'
            fill='none'
            color='#444'
          >
            {' '}
            <title id='cartAddIconTitle'>Добавить покупку</title>{' '}
            <path d='M21.2922 6L19.9463 14.1627C19.8666 14.6457 19.4491 15 18.9596 15H7.04304C6.55355 15 6.136 14.6457 6.05636 14.1627L4.84851 6.83731C4.76887 6.35434 4.35133 6 3.86183 6H2' />{' '}
            <path d='M8 20C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18C7.44772 18 7 18.4477 7 19C7 19.5523 7.44772 20 8 20Z' />{' '}
            <path d='M18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19C17 19.5523 17.4477 20 18 20Z' />{' '}
            <path d='M16 8H10' /> <path d='M13 5V11' />{' '}
          </svg>
          <svg
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            aria-labelledby='filterIconTitle'
            stroke='#444'
            strokeWidth='2'
            strokeLinecap='square'
            strokeLinejoin='miter'
            fill='none'
            color='#444'
          >
            {' '}
            <title id='filterIconTitle'>Filter</title> <path d='M10 12.261L4.028 3.972h16L14 12.329V17l-4 3z' />{' '}
          </svg>
          <svg
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            aria-labelledby='sortingIconTitle'
            stroke='#444'
            strokeWidth='2'
            strokeLinecap='square'
            strokeLinejoin='miter'
            fill='none'
            color='#444'
          >
            {' '}
            <title id='sortingIconTitle'>Sorting</title> <polyline points='8 8.333 12 4.333 16 8.333 16 8.333' />{' '}
            <polyline points='16 15.667 12 19.667 8 15.667 8 15.667' />{' '}
          </svg>
        </div>
      </div>
      <ul className='tasks__items'>
        <AddItemForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
          isOpened={isAddFormOpened}
          setIsOpened={setIsAddFormOpened}
        />
        {list.tasks &&
          list.tasks
            .filter((t) => t.completed === 0)
            .map((task) => (
              <Task key={task.id} task={task} onRemove={onRemove} onEdit={onEdit} onComplete={onComplete} />
            ))}

        {list.tasks &&
          list.tasks
            .filter((t) => t.completed > 0)
            .sort((a, b) => a.completed < b.completed)
            .map((task) => (
              <Task key={task.id} task={task} onRemove={onRemove} onEdit={onEdit} onComplete={onComplete} />
            ))}

        {list.tasks && list.tasks.length === 0 && !noEmpty && <h2>Нет покупок</h2>}
      </ul>
    </div>
  );
}

export default Tasks;
