import React, { useState } from 'react';

import './App.css';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  let maxId = 1;
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');

  const createTodoItem = (label, minutes, seconds) => {
    return {
      label,
      important: false,
      done: false,
      created: Date.now(),
      id: maxId++,
      edit: false,
      time: Number(minutes) * 60 + Number(seconds),
    };
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text, minutes, seconds);
    setTodoData(() => {
      const newArray = [...todoData, newItem];
      return newArray;
    });
  };

  const deleteItem = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onToggleEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'edit'));
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleVisible = (selector) => {
    setFilter(selector);
  };

  const onToggleSelect = (btn) => {
    setFilter(btn);
    onToggleVisible(btn);
  };

  const showList = (visible) => {
    switch (visible) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((data) => !data.done);
      default:
        return todoData.filter((data) => data.done);
    }
  };

  const deleteCompleted = () => {
    setTodoData(() => {
      const newArr = todoData.filter((data) => !data.done);
      return newArr;
    });
  };
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;
  const visibleList = showList(filter);
  return (
    <div className={'todoapp'}>
      <NewTaskForm addItem={addItem} />
      <TaskList
        todos={visibleList}
        todoCount={todoCount}
        onToggleDone={onToggleDone}
        onDeleted={deleteItem}
        onToggleEdit={onToggleEdit}
        addItem={addItem}
      />
      <Footer
        filter={filter}
        todoCount={todoCount}
        deleteCompleted={deleteCompleted}
        onToggleVisible={onToggleVisible}
        onToggleSelect={onToggleSelect}
      />
    </div>
  );
}
export default App;
