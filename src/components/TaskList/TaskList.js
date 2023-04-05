import React from 'react';
import propTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

export default class TaskList extends React.Component {
  static defaultProps = {
    onToggleDone: () => {},
    onDeleted: () => {},
    onToggleEdit: () => {},
  };
  static propTypes = {
    onToggleDone: propTypes.func,
    onDeleted: propTypes.func,
    onToggleEdit: propTypes.func,
    todos: propTypes.arrayOf(propTypes.object).isRequired,
  };
  render() {
    const { todos, onToggleDone, onDeleted, onToggleEdit } = this.props;
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
}
