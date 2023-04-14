import React from 'react';
import './TasksFilter.css';
import propTypes from 'prop-types';

function TasksFilter({ filter, onToggleSelect }) {
  let btn = [
    { name: 'all', label: 'all' },
    { name: 'active', label: 'active' },
    { name: 'completed', label: 'completed' },
  ];

  btn = btn.map(({ name, label }) => {
    const isActive = filter === name;
    const className = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button onClick={() => onToggleSelect(name)} className={className}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className={'filters'}>{btn}</ul>;
}
export default TasksFilter;
TasksFilter.defaultProps = {
  onToggleSelect: () => {},
};
TasksFilter.propTypes = {
  onToggleSelect: propTypes.func,
  filter: propTypes.string.isRequired,
};
