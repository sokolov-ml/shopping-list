import React from 'react';
import axios from 'axios';

import { Route, useHistory, useLocation } from 'react-router-dom';

import { List, AddList, Tasks } from './components';

import { CurrentTheme, themes } from './contexts/CurrentTheme';

// import DB from './assets/db.json';
import './index.scss';
import listPng from './assets/img/icons8-list-50.png';

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  const [currentTheme, setCurrentTheme] = React.useState({ ...themes.default, dark: false });

  let history = useHistory();

  let location = useLocation();

  const switchTheme = (e) => {
    if (e.target.checked) {
      setCurrentTheme({ ...themes.dark, dark: true });
    } else {
      setCurrentTheme({ ...themes.default, dark: false });
    }
  };

  React.useEffect(() => {
    if (lists) {
      const list = lists.find((list) => list.id === Number(location.pathname.split('/lists/')[1]));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });

    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    setLists([...lists, obj]);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = [...list.tasks, taskObj];
      }
      return list;
    });

    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Введите новый текст:', taskObj.text);

    if (newTaskText) {
      // taskObj.text = newTaskText;
      axios
        .patch(`http://localhost:3001/tasks/${taskObj.id}`, { text: newTaskText })
        .then(() => {
          const newList = lists.map((list) => {
            if (list.id === listId) {
              list.tasks = list.tasks.map((task) => {
                if (task.id === taskObj.id) {
                  task.text = newTaskText;
                }
                return task;
              });
            }
            return list;
          });

          setLists(newList);
        })
        .catch((err) => {
          console.error('Не удалось изменить элемент');
        });
    }
  };

  const onCompleteTask = (listId, taskObj) => {
    axios
      .patch(`http://localhost:3001/tasks/${taskObj.id}`, { completed: taskObj.completed ? 0 : Date.now() })
      .then(() => {
        const newList = lists.map((list) => {
          if (list.id === listId) {
            list.tasks = list.tasks.map((task) => {
              if (task.id === taskObj.id) {
                task.completed = taskObj.completed ? 0 : Date.now();
              }
              return task;
            });
          }
          return list;
        });

        setLists(newList);
      })
      .catch((err) => {
        console.error('Не удалось изменить элемент');
      });
  };
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Удалить?')) {
      axios
        .delete(`http://localhost:3001/tasks/${taskId}`)
        .then((data) => {
          const newList = lists.map((list) => {
            if (list.id === listId) {
              list.tasks = list.tasks.filter((task) => task.id !== taskId);
            }
            return list;
          });

          setLists(newList);
        })
        .catch((err) => {
          console.error('Не удалось удалить элемент');
        });
    }
  };

  const onEditListTitle = (id, title) => {
    axios
      .patch(`http://localhost:3001/lists/${id}`, { name: title })
      .then((data) => {
        const newList = lists.map((list) => {
          if (list.id === id) {
            list.name = title;
          }
          return list;
        });

        setLists(newList);
      })
      .catch((err) => {
        console.error('Не удалось обновить название списка');
      });
  };

  const onRemoveList = (id) => {
    setLists(lists.filter((l) => l.id !== id));
  };

  return (
    <CurrentTheme.Provider value={currentTheme}>
      <div className='todo'>
        <div className='todo__sidebar' style={currentTheme.sideBar}>
          <List
            key='total'
            items={[{ id: 0, name: 'Все покупки', icon: <img src={listPng} alt='Список' />, active: !activeItem }]}
            onClickItem={() => history.push(`/`)}
          />
          {lists && (
            <List
              key='lists'
              items={lists}
              onRemove={onRemoveList}
              onClickItem={(item) => {
                history.push(`/lists/${item.id}`);
              }}
              activeItem={activeItem}
              isRemovable
            />
          )}
          <AddList key='addList' colors={colors} onAdd={onAddList} />

          <div className='checkbox'>
            <input type='checkbox' name='' id='darkTheme' onChange={switchTheme} checked={currentTheme.dark} />
            <label htmlFor='darkTheme'>
              {currentTheme.dark ? (
                <svg
                  width='40px'
                  height='40px'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-labelledby='switchOnIconTitle'
                  stroke='#444'
                  strokeWidth='1'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                  fill='none'
                  color='#444'
                >
                  {' '}
                  <title id='switchOnIconTitle'>Switch on</title>{' '}
                  <path d='M17 7C19.7614 7 22 9.23858 22 12V12C22 14.7614 19.7614 17 17 17L8 17C5.23858 17 3 14.7614 3 12V12C3 9.23858 5.23858 7 8 7L17 7Z' />{' '}
                  <path
                    // fill-rule='evenodd'
                    // clip-rule='evenodd'
                    d='M17 10C18.1046 10 19 10.8954 19 12C19 13.1046 18.1046 14 17 14C15.8954 14 15 13.1046 15 12C15 10.8954 15.8954 10 17 10Z'
                  />{' '}
                </svg>
              ) : (
                <svg
                  width='40px'
                  height='40px'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-labelledby='switchOffIconTitle'
                  stroke='#444'
                  strokeWidth='1'
                  strokeLinecap='square'
                  strokeLinejoin='miter'
                  fill='none'
                  color='#444'
                >
                  {' '}
                  <title id='switchOffIconTitle'>Switch off</title>{' '}
                  <path d='M7 17C4.23858 17 2 14.7614 2 12V12C2 9.23858 4.23858 7 7 7L16 7C18.7614 7 21 9.23858 21 12V12C21 14.7614 18.7614 17 16 17L7 17Z' />{' '}
                  <path
                    // fill-rule='evenodd'
                    // clip-rule='evenodd'
                    d='M7 14C5.89543 14 5 13.1046 5 12C5 10.8954 5.89543 10 7 10C8.10457 10 9 10.8954 9 12C9 13.1046 8.10457 14 7 14Z'
                  />{' '}
                </svg>
              )}
            </label>
          </div>
        </div>

        <div className='todo__tasks' style={currentTheme.tasks}>
          <Route exact path='/'>
            {lists &&
              lists.map((list) => (
                <Tasks
                  key={list.id}
                  list={list}
                  onEditTitle={onEditListTitle}
                  onAddTask={onAddTask}
                  onEditTask={onEditTask}
                  onRemoveTask={onRemoveTask}
                  onCompleteTask={onCompleteTask}
                  noEmpty
                />
              ))}
          </Route>
          <Route path='/lists/:id'>
            {lists && activeItem && (
              <Tasks
                list={activeItem}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onRemoveTask={onRemoveTask}
                onCompleteTask={onCompleteTask}
              />
            )}
          </Route>
        </div>
      </div>
    </CurrentTheme.Provider>
  );
}

export default App;
