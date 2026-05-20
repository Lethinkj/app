import './App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (event) => {
    event.preventDefault();
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Todo List</h1>
          <p>Add, complete, and delete tasks.</p>
        </header>

        <form className="form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
