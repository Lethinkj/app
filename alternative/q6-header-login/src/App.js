import './App.css';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter username and password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src="https://picsum.photos/seed/picsum/1200/300" alt="Header" className="header-image" />
        <div className="header-content">
          <div className="logo">MyApp</div>
          <nav className="navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main className="content">
        {isLoggedIn ? (
          <div className="welcome-container">
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
              <h2>Login</h2>
              <div className="form-control">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
