import './App.css';
import { useState, useMemo } from 'react';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!weight || weight <= 0) newErrors.weight = 'Weight must be a positive number.';
    if (!height || height <= 0) newErrors.height = 'Height must be a positive number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const bmi = useMemo(() => {
    if (validate()) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  }, [weight, height]);

  const category = useMemo(() => {
    if (!bmi) return '';
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
          <p>Enter your weight and height with validation.</p>
        </header>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <div className="field">
            <label>Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 175"
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>
        </form>

        {bmi && (
          <section className="result" aria-live="polite">
            <div>
              <span className="label">Your BMI</span>
              <span className="value">{bmi}</span>
            </div>
            <div>
              <span className="label">Category</span>
              <span className="value">{category}</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
