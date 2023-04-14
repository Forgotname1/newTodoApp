import React from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends React.Component {
  maxId = 1;

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(label, minutes, seconds) {
    return {
      label,
      important: false,
      done: false,
      created: Date.now(),
      id: this.maxId++,
      edit: false,
      time: Number(minutes) * 60 + Number(seconds),
    };
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState((state) => ({ todoData: this.toggleProperty(state.todoData, id, 'done') }));
  };

  onToggleEdit = (id) => {
    this.setState((state) => ({ todoData: this.toggleProperty(state.todoData, id, 'edit') }));
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleVisible = (selector) => {
    this.setState(() => ({ filter: selector }));
  };

  onToggleSelect = (btn) => {
    this.setState(() => ({ filter: btn }));
    this.onToggleVisible(btn);
  };

  showList = (visible) => {
    const { todoData } = this.state;
    switch (visible) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((data) => !data.done);
      default:
        return todoData.filter((data) => data.done);
    }
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((data) => !data.done);
      return { todoData: newArr };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleList = this.showList(filter);
    return (
      <div className={'todoapp'}>
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={visibleList}
          todoCount={todoCount}
          onToggleDone={this.onToggleDone}
          onDeleted={this.deleteItem}
          onToggleEdit={this.onToggleEdit}
          addItem={this.addItem}
        />
        <Footer
          filter={filter}
          todoCount={todoCount}
          deleteCompleted={this.deleteCompleted}
          onToggleVisible={this.onToggleVisible}
          onToggleSelect={this.onToggleSelect}
        />
      </div>
    );
  }
}
