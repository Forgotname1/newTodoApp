import React, { useState } from 'react';
import propTypes from 'prop-types';

import './NewTaskForm.css';

function NewTaskForm({ addItem }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (element) => {
    if (element.target.value.length < 10) {
      setLabel(element.target.value);
    }
  };

  const changeMinutes = (event) => {
    setMinutes(event.target.value);
  };

  const changeSeconds = (event) => {
    setSeconds(event.target.value);
  };

  const onSubmit = (event) => {
    if (event.key === 'Enter') {
      if (label.length > 0 && !label[0].match(/\s/)) {
        addItem(label, minutes, seconds);
        setLabel('');
        setMinutes('');
        setSeconds('');
      }
    }
  };

  return (
    <header id="todoapp-header" className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
          minLength={1}
          required
          onKeyDown={onSubmit}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={minutes}
          onChange={changeMinutes}
          onKeyDown={onSubmit}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={seconds}
          onChange={changeSeconds}
          onKeyDown={onSubmit}
        />
      </form>
    </header>
  );
}
export default NewTaskForm;
NewTaskForm.propTypes = {
  addItem: propTypes.func,
};
