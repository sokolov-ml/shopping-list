import React from 'react';
import axios from 'axios';

function AddItemForm({ list, onAddTask, isOpened, setIsOpened }) {
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleForm = () => {
    setIsOpened(!isOpened);
    setInputValue('');
  };

  const addTask = () => {
    const newTask = {
      listId: list.id,
      text: inputValue,
      completed: 0,
    };

    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', newTask)
      .then(({ data }) => {
        onAddTask(list.id, data);
      })
      .catch(() => {
        console.error('can`t add task');
      })
      .finally(() => {
        setIsLoading(false);
        // toggleForm();
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
    setInputValue('');
  };

  const handleEsc = React.useCallback((e) => {
    // console.log(e.key, isFormOpened);
    console.log(e.key);
    if (e.key === 'Escape') {
      setIsOpened(false);
    }
  }, []);

  React.useEffect(() => {
    // console.log('effect', isFormOpened, handleEsc);
    if (isOpened) {
      document.addEventListener('keydown', handleEsc);
    } else {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpened, handleEsc]);

  return (
    <div className='tasks__form'>
      {isOpened && (
        <form className='tasks__form-create' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Что купить?'
            className='field'
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
          />

          <button type='submit' disabled={!Boolean(inputValue)} className='button'>
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>

          <button className='button button_cancel' onClick={toggleForm}>
            Отмена
          </button>
        </form>
      )}
    </div>
  );
}

export default AddItemForm;
