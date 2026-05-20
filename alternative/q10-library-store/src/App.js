import './App.css';
import { useState } from 'react';

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, inCart: false },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.50, inCart: false },
  { id: 3, title: '1984', author: 'George Orwell', price: 9.99, inCart: false },
];

function App() {
  const [books, setBooks] = useState(initialBooks);

  const toggleCart = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, inCart: !book.inCart } : book
      )
    );
  };

  const cartItems = books.filter(book => book.inCart);
  const total = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="app">
      <main className="card">
        <header className="title">
          <h1>Library Store</h1>
          <p>Add books to your cart.</p>
        </header>

        <div className="store-layout">
          <div className="book-list">
            {books.map((book) => (
              <div key={book.id} className="book-item">
                <div className="book-info">
                  <span className="book-title">{book.title}</span>
                  <span className="book-author">by {book.author}</span>
                  <span className="book-price">${book.price.toFixed(2)}</span>
                </div>
                <button onClick={() => toggleCart(book.id)}>
                  {book.inCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>

          <div className="cart">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.title} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <strong>Total: ${total.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
