import './App.css';
import { useState } from 'react';

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Geo Location</h1>
          <p>Click the button to get your location.</p>
        </header>

        <div className="actions">
          <button onClick={getLocation}>Get Location</button>
        </div>

        {error && <p className="error">Error: {error}</p>}

        {location && (
          <section className="result" aria-live="polite">
            <div>
              <span className="label">Latitude</span>
              <span className="value">{location.latitude}</span>
            </div>
            <div>
              <span className="label">Longitude</span>
              <span className="value">{location.longitude}</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
