import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [editedTask, setEditedTask] = useState({ index: null, text: '' });
  const [error, setError] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      setError('Task cannot be empty!');
      return; // Prevent adding empty tasks
    }

    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    setError('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, text) => {
    setEditedTask({ index, text });
  };

  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedTask.index].text = editedTask.text;
    setTasks(updatedTasks);
    setEditedTask({ index: null, text: '' });
  };

  const filterTasks = (task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'incomplete':
        return !task.completed;
      default:
        return true;
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <label>Show:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {tasks.filter(filterTasks).map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            {editedTask.index === index ? (
              <input
                type="text"
                value={editedTask.text}
                onChange={(e) => setEditedTask({ index, text: e.target.value })}
                onBlur={saveEditedTask}
                autoFocus
              />
            ) : (
              <>
                <span onClick={() => editTask(index, task.text)}>
                  {task.text}
                </span>
                <button onClick={() => editTask(index, task.text)}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => deleteTask(index)} className="delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
