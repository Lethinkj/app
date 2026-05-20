import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email) {
      setSubmitted(true);
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="app">
        <main className="card">
          <header className="title">
            <h1>Thank You!</h1>
            <p>Your submission has been received.</p>
          </header>
          <button onClick={handleReset}>Submit Another</button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Submit & Reset</h1>
          <p>Fill out the form and submit or reset.</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset} className="secondary">
              Reset
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
