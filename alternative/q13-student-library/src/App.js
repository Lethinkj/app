import './App.css';
import { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Alice', books: ['The Great Gatsby'] },
  { id: 2, name: 'Bob', books: ['1984', 'To Kill a Mockingbird'] },
  { id: 3, name: 'Charlie', books: [] },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Student Library</h1>
          <p>Track books borrowed by students.</p>
        </header>

        <div className="student-list">
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <h2>{student.name}</h2>
              {student.books.length > 0 ? (
                <ul>
                  {student.books.map((book, index) => (
                    <li key={index}>{book}</li>
                  ))}
                </ul>
              ) : (
                <p>No books borrowed.</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
