import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="app">
        <main className="card">
          <header className="title">
            <h1>Welcome, {username}!</h1>
            <p>You are logged in.</p>
          </header>
          <button onClick={handleLogout}>Logout</button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Login</h1>
          <p>Enter your credentials to log in.</p>
        </header>

        <form className="form" onSubmit={handleLogin}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}

export default App;
