import React, { useState, useEffect } from 'react';
import './TodoApp.css';


const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Coding Prep',
      description: 'By the end of today, I should have solved over 10 coding challenges',
      completed: false
    },
    {
      id: 2,
      title: 'Work Out',
      description: 'In order to stay fit, I must complete at least 200 push-ups',
      completed: true
    },
    {
      id: 3,
      title: 'Task Delivery',
      description: 'I will complete ant submit any pending task for today',
      completed: false
    }
  ]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTodo = () => {
    if (newTodo.title.trim() !== '') {
      const todo = {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.completed
      };

      setTodos([...todos, todo]);
      setNewTodo({
        title: '',
        description: '',
        completed: false
      });
    }
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        name="title"
        value={newTodo.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={newTodo.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleStatus(todo.id)}
            />
            {todo.title} - {todo.description}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
