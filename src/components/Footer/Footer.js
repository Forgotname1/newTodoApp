import React from 'react';
import './Footer.css';
import propTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

function Footer({ todoCount, filter, onToggleVisible, onToggleSelect, deleteCompleted }) {
  return (
    <footer className={'footer'}>
      <span className={'todo-count'}>{todoCount} items left</span>
      <TasksFilter filter={filter} onToggleVisible={onToggleVisible} onToggleSelect={onToggleSelect} />
      <button type={'button'} className={'clear-completed'} onClick={deleteCompleted}>
        clear completed
      </button>
    </footer>
  );
}
export default Footer;
Footer.defaultProps = {
  onToggleSelect: () => {},
  deleteCompleted: () => {},
};
Footer.propTypes = {
  deleteCompleted: propTypes.func,
  onToggleSelect: propTypes.func,
  onToggleVisible: propTypes.func,
  todoCount: propTypes.number.isRequired,
  filter: propTypes.string.isRequired,
};
