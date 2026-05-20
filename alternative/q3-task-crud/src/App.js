import './App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.trim() === '') return;
    if (editingIndex !== null) {
      const newTasks = [...tasks];
      newTasks[editingIndex] = { ...newTasks[editingIndex], text: taskInput };
      setTasks(newTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: taskInput, completed: false }]);
    }
    setTaskInput('');
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>To do list</h1>
          <p>update your day to day task</p>
        </header>

        <form className="form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Enter a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        </form>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span onClick={() => handleToggleComplete(index)}>{task.text}</span>
              <div className="actions">
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
