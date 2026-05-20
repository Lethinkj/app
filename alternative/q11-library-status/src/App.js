import './App.css';
import { useState } from 'react';

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', status: 'Available' },
  { id: 2, title: 'To Kill a Mockingbird', status: 'Checked Out' },
  { id: 3, title: '1984', status: 'Available' },
  { id: 4, title: 'Moby Dick', status: 'Overdue' },
];

function App() {
  const [books, setBooks] = useState(initialBooks);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Checked Out':
        return 'status-checked-out';
      case 'Overdue':
        return 'status-overdue';
      default:
        return '';
    }
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Library Status</h1>
          <p>Check the status of books.</p>
        </header>

        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>
                  <span className={`status-pill ${getStatusClass(book.status)}`}>
                    {book.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
