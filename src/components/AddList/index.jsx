import React from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';

import { CurrentTheme } from '../../contexts/CurrentTheme';

import './AddList.scss';
import addPng from '../../assets/img/icons8-add-50.png';

function AddButtonList({ colors, onAdd }) {
  const currentTheme = React.useContext(CurrentTheme);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [isPopupOpened, setIsPopupOpened] = React.useState(false);
  const [selectedColorId, setSelectedColorId] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEsc = React.useCallback((e) => {
    // console.log(e.key, isFormOpened);
    if (e.key === 'Escape') {
      setIsPopupOpened(false);
    }
  }, []);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColorId(colors[getRandomInt(0, colors.length - 1)].id);
    }
  }, [colors]);

  React.useEffect(() => {
    // console.log('effect', isFormOpened, handleEsc);
    if (isPopupOpened) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [isPopupOpened, handleEsc]);

  const onClose = () => {
    setIsPopupOpened(false);
    setSelectedColorId(colors[getRandomInt(0, colors.length - 1)].id);
    setInputValue('');
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка!');
      return;
    } else {
      setIsLoading(true);
      axios
        .post('http://localhost:3001/lists', {
          name: inputValue,
          colorId: selectedColorId,
        })
        .then(({ data }) => {
          onAdd({ ...data, tasks: [], color: colors.find((c) => c.id === selectedColorId) });
          onClose();
        })
        .catch(() => {
          console.error('can`t add list');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addList();
  };

  return (
    <div className='add-list'>
      <List
        onClick={() => setIsPopupOpened(!isPopupOpened)}
        items={[
          {
            id: 0,
            className: 'list__add-button',
            name: 'Добавить список',
            icon: <img src={addPng} alt='добавить' />,
            active: false,
          },
        ]}
      />
      {isPopupOpened && (
        <form className='add-list__popup' style={currentTheme.addList} onSubmit={handleSubmit}>
          <div
            className='add-list__popup-close-btn'
            onClick={() => {
              onClose();
            }}
          >
            <svg
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              width='24px'
              height='24px'
              viewBox='0 0 24 24'
              aria-labelledby='closeIconTitle'
              stroke='#444'
              strokeWidth='2'
              strokeLinecap='square'
              strokeLinejoin='miter'
              fill='none'
              color='#444'
              style={currentTheme.icons}
            >
              {' '}
              <title id='closeIconTitle'>Close</title>{' '}
              <path d='M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575' />{' '}
            </svg>
          </div>

          <input
            onChange={(evt) => setInputValue(evt.target.value)}
            type='text'
            placeholder='Название списка'
            value={inputValue}
            className='field'
            name=''
            id=''
            autoFocus
          />
          <div className='add-list__popup-colors'>
            {colors.map((color) => {
              return (
                <Badge
                  onClick={() => {
                    setSelectedColorId(color.id);
                  }}
                  key={color.id}
                  color={color.name}
                  className={selectedColorId === color.id && 'active'}
                />
              );
            })}
          </div>
          <button type='button' className='button' onClick={addList} disabled={!Boolean(inputValue)}>
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddButtonList;
