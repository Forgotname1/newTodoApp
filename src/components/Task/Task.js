import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';

const classNames = require('classnames');

export default class Task extends React.Component {
  static defaultProps = {
    onToggleDone: () => {},
    onToggleEdit: () => {},
    onDeleted: () => {},
  };
  static propTypes = {
    onToggleDone: propTypes.func,
    onToggleEdit: propTypes.func,
    onDeleted: propTypes.func,
    done: propTypes.bool.isRequired,
    label: propTypes.node.isRequired,
    editing: propTypes.node,
    created: propTypes.node.isRequired,
  };

  state = {
    edit: false,
    editing: this.props.label,
  };
  onEdit = () => {
    this.setState({
      edit: true,
    });
  };

  onLabelChange = (e) => {
    if (e.target.value.length < 10) {
      this.setState({
        editing: e.target.value,
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.editing.length > 0 && !this.state.editing[0].match(/\s/)) {
      this.props.onToggleEdit(this.state.editing);
      this.setState({
        edit: false,
      });
    } else {
      this.setState({
        edit: true,
      });
    }
  };
  render() {
    const { onDeleted, onToggleDone, done, created } = this.props;
    const { edit, editing } = this.state;
    const howMuchTime = formatDistanceToNow(created, { addSuffix: true });
    // let spanClassName = 'view';
    // // done ? (spanClassName += 'completed') : (spanClassName += '');
    const claus = classNames({ completed: done }, { editing: edit });
    return (
      <li className={claus}>
        <div className={'view'}>
          <input className={'toggle'} type={'checkbox'} onClick={onToggleDone} readOnly />
          <label onClick={onToggleDone}>
            <span className={'description'}>{editing}</span>
            <span className={'created'}>created {howMuchTime} ago</span>
          </label>
          <button onClick={this.onEdit} className={'icon icon-edit'} />
          <button onClick={onDeleted} className={'icon icon-destroy'} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type={'text'}
            className={'edit'}
            onChange={this.onLabelChange}
            value={editing}
            minLength={1}
            required
          />
        </form>
      </li>
    );
  }
}
