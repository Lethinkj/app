import './App.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const position = lat && long ? [lat, long] : null;

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Geolocation with Map</h1>
          <p>Click the button to get your location and see it on the map.</p>
        </header>

        <div className="actions">
          <button onClick={getLocation}>Get Location</button>
        </div>

        {error && <p className="error">Error: {error}</p>}

        {position && (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                You are here.
              </Popup>
            </Marker>
          </MapContainer>
        )}

        <section className="result" aria-live="polite">
          <div>
            <span className="label">Latitude</span>
            <span className="value">{lat ?? '--'}</span>
          </div>
          <div>
            <span className="label">Longitude</span>
            <span className="value">{long ?? '--'}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
