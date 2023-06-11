import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'This is the first task',
      completed: false
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is the second task',
      completed: true
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'This is the third task',
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
