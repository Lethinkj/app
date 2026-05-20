import './App.css';
import { useMemo, useState } from 'react';

function App() {
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');

  const bmi = useMemo(() => {
    const weight = Number(weightKg);
    const height = Number(heightCm) / 100;
    if (!weight || !height) return null;
    const value = weight / (height * height);
    if (!Number.isFinite(value)) return null;
    return Math.round(value * 10) / 10;
  }, [weightKg, heightCm]);

  const category = useMemo(() => {
    if (bmi === null) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }, [bmi]);

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>BMI Calculator</h1>
          <p>Enter your weight and height to calculate your BMI.</p>
        </header>

        <form className="form" onSubmit={(event) => event.preventDefault()}>
          <label className="field">
            <span>Weight (kg)</span>
            <input
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g. 70"
              value={weightKg}
              onChange={(event) => setWeightKg(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Height (cm)</span>
            <input
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(event) => setHeightCm(event.target.value)}
            />
          </label>
        </form>

        <section className="result" aria-live="polite">
          <div>
            <span className="label">BMI</span>
            <span className="value">{bmi ?? '--'}</span>
          </div>
          <div>
            <span className="label">Category</span>
            <span className="value">{category || '--'}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
