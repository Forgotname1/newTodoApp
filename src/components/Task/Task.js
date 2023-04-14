import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';
import classNames from 'classnames';

import TaskTimer from '../TaskTimer/TaskTimer';

function Task({ label, onToggleEdit, onDeleted, onToggleDone, done, created, time }) {
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState(label);

  const onEdit = () => {
    setEdit(true);
  };

  const onLabelChange = (e) => {
    if (e.target.value.length < 10) {
      setEditing(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editing.length > 0 && !editing[0].match(/\s/)) {
      onToggleEdit(editing);
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const howMuchTime = formatDistanceToNow(created, { addSuffix: true });
  const claus = classNames({ completed: done }, { editing: edit });
  return (
    <li className={claus}>
      <div className={'view'}>
        <input className={'toggle'} type={'checkbox'} onClick={onToggleDone} readOnly />
        <label>
          <span className="title">{editing}</span>
          <span className={'description'}>
            <TaskTimer time={time} />
          </span>
          <span className={'created'}>created {howMuchTime} ago</span>
          <span></span>
        </label>
        <button onClick={onEdit} className={'icon icon-edit'} />
        <button onClick={onDeleted} className={'icon icon-destroy'} />
      </div>
      <form onSubmit={onSubmit}>
        <input type={'text'} className={'edit'} onChange={onLabelChange} value={editing} minLength={1} required />
      </form>
    </li>
  );
}
export default Task;
Task.defaultProps = {
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onDeleted: () => {},
};
Task.propTypes = {
  onToggleDone: propTypes.func,
  onToggleEdit: propTypes.func,
  onDeleted: propTypes.func,
  done: propTypes.bool.isRequired,
  label: propTypes.node.isRequired,
  editing: propTypes.node,
  created: propTypes.node.isRequired,
  time: propTypes.number.isRequired,
};
