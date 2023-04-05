import React from 'react';
import propTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    label: propTypes.node,
    addItem: propTypes.func,
  };

  state = {
    label: '',
  };

  onLabelChange = (element) => {
    if (element.target.value.length < 10) {
      this.setState({
        label: element.target.value,
      });
    }
  };
  onSubmit = (element) => {
    element.preventDefault();
    if (this.state.label.length > 0 && !this.state.label[0].match(/\s/)) {
      this.props.addItem(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <header id="todoapp-header" className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
            minLength={1}
            required
          />
        </form>
      </header>
    );
  }
}
