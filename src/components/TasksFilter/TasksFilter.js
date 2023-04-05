import React from 'react';
import './TasksFilter.css';
import propTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onToggleSelect: () => {},
  };
  static propTypes = {
    onToggleSelect: propTypes.func,
    filter: propTypes.string.isRequired,
  };
  btn = [
    { name: 'all', label: 'all' },
    { name: 'active', label: 'active' },
    { name: 'completed', label: 'completed' },
  ];

  render() {
    const { filter, onToggleSelect } = this.props;
    const btn = this.btn.map(({ name, label }) => {
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
}
