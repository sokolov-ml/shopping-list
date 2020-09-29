import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import { CurrentTheme } from '../../contexts/CurrentTheme';

import './List.scss';
import pngMinus from '../../assets/img/icons8-minus-sign-50.png';

export default function List({ onClick, items, onRemove, isRemovable, onClickItem, activeItem }) {
  const currentTheme = React.useContext(CurrentTheme);

  const removeList = (item) => {
    if (window.confirm(`Вы действительно хотите удалить список "${item.name}"?`)) {
      axios.delete(`http://localhost:3001/lists/${item.id}`).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className='list' onClick={onClick}>
      {items.map((item) => {
        return (
          <li
            key={item.id}
            onClick={onClickItem ? () => onClickItem(item) : null}
            className={classNames(item.className, {
              active: item.active ? item.active : activeItem && activeItem.id === item.id,
            })}
          >
            <i className='list__item-icon'>
              {item.icon ? item.icon : <Badge key={item.color.id} color={item.color.name} />}
            </i>
            <span style={currentTheme.sideBar.list}>
              {item.name}
              {item.tasks ? ` (${item.tasks.filter((t) => !t.completed).length})` : ''}
            </span>
            {isRemovable ? (
              <i className='list__item-remove'>
                <img
                  src={pngMinus}
                  alt='Удалить'
                  onClick={() => {
                    removeList(item);
                  }}
                />
              </i>
            ) : (
              ''
            )}
          </li>
        );
      })}
    </ul>
  );
}
