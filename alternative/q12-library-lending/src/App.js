import './App.css';
import { useState } from 'react';

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', isLent: false },
  { id: 2, title: 'To Kill a Mockingbird', isLent: true },
  { id: 3, title: '1984', isLent: false },
];

function App() {
  const [books, setBooks] = useState(initialBooks);

  const toggleLentStatus = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isLent: !book.isLent } : book
      )
    );
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Library Lending</h1>
          <p>Manage book lending status.</p>
        </header>

        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className={book.isLent ? 'lent' : 'available'}>
              <span>{book.title}</span>
              <button onClick={() => toggleLentStatus(book.id)}>
                {book.isLent ? 'Return Book' : 'Lend Book'}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
