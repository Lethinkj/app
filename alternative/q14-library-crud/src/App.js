import './App.css';
import { useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !author) return;

    if (editingId !== null) {
      setBooks(
        books.map((book) =>
          book.id === editingId ? { ...book, title, author } : book
        )
      );
      setEditingId(null);
    } else {
      setBooks([...books, { id: Date.now(), title, author }]);
    }
    setTitle('');
    setAuthor('');
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditingId(book.id);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Library CRUD</h1>
          <p>Add, edit, and delete books from the library.</p>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit">{editingId !== null ? 'Update Book' : 'Add Book'}</button>
        </form>

        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <div>
                <span className="book-title">{book.title}</span>
                <span className="book-author">by {book.author}</span>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
