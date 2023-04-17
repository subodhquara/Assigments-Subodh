import React, { useState } from 'react';

import './App.css'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    if (editMode) {
      setTodos([
        ...todos.slice(0, editIndex),
        { text: inputValue, completed: todos[editIndex].completed },
        ...todos.slice(editIndex + 1),
      ]);
      setEditMode(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: inputValue, completed: false }]);
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].text);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleToggle = (index) => {
    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], completed: !todos[index].completed },
      ...todos.slice(index + 1),
    ]);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a to-do item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">{editMode ? 'Save' : 'Add'}</button>
      </form>
      <div>
        <h2>All To-Do Items</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
              />
              {todo.text}{' '}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
