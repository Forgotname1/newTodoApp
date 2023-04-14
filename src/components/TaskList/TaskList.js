import React from 'react';
import propTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

function TaskList({ todos, onToggleDone, onDeleted, onToggleEdit }) {
  const elements = todos.map((todo) => {
    const { id, ...todoProps } = todo;
    return (
      <Task
        {...todoProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={(label) => onToggleEdit(id, label)}
        key={id}
      />
    );
  });
  return (
    <ul id={'ul-task'} className={'todo-list'}>
      {elements}
    </ul>
  );
}

export default TaskList;
TaskList.defaultProps = {
  onToggleDone: () => {},
  onDeleted: () => {},
  onToggleEdit: () => {},
};
TaskList.propTypes = {
  onToggleDone: propTypes.func,
  onDeleted: propTypes.func,
  onToggleEdit: propTypes.func,
  todos: propTypes.arrayOf(propTypes.object).isRequired,
};
