import React from 'react';
import propTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static propTypes = {
    addItem: propTypes.func,
  };

  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (element) => {
    if (element.target.value.length < 10) {
      this.setState({
        label: element.target.value,
      });
    }
  };

  changeMinutes = (event) => {
    this.setState({ minutes: event.target.value });
  };

  changeSeconds = (event) => {
    this.setState({ seconds: event.target.value });
  };

  render() {
    const { label, minutes, seconds } = this.state;
    // const onSubmit = (element) => {
    //   element.preventDefault();
    //   if (this.state.label.length > 0 && !this.state.label[0].match(/\s/)) {
    //     this.props.addItem(this.state.label, this.state.minutes, this.state.seconds);
    //   }
    //   this.setState({
    //     label: '',
    //     minutes: '',
    //     seconds: '',
    //   });
    // };
    const onSubmit = (event) => {
      if (event.key === 'Enter') {
        if (this.state.label.length > 0 && !this.state.label[0].match(/\s/)) {
          this.props.addItem(label, minutes, seconds);
          this.setState({
            label: '',
            minutes: '',
            seconds: '',
          });
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
            onChange={this.onLabelChange}
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
            value={this.state.minutes}
            onChange={this.changeMinutes}
            onKeyDown={onSubmit}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.seconds}
            onChange={this.changeSeconds}
            onKeyDown={onSubmit}
          />
        </form>
      </header>
    );
  }
}
