import { useState } from 'react';
import './App.css';

const initialBooks = [
  {
    id: 1,
    title: 'A Promised Land',
    author: 'Barack Obama',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41L5q312gIL._SX322_BO1,204,203,200_.jpg',
  },
  {
    id: 2,
    title: 'Beach Read',
    author: 'Emily Henry',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51mI3rKFP-L._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 3,
    title: 'In Five Years',
    author: 'Rebecca Serle',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51i2gS2pP-L._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 4,
    title: 'The Guest List',
    author: 'Lucy Fokley',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41y6h97mJ3L._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 5,
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51-tV8P5vVL._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 6,
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41aI5-pS-LL._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 7,
    title: 'The Ballad of Songbirds and Snakes',
    author: 'Suzanne Collins',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41P4k5B4J0L._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 8,
    title: 'House of Earth and Blood',
    author: 'Sarah J. Maas',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51D5aL6S8-L._SX329_BO1,204,203,200_.jpg',
  },
];

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const addToWishlist = (book) => {
    if (!wishlist.find((item) => item.id === book.id)) {
      setWishlist([...wishlist, book]);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter((item) => item.id !== bookId));
  };

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <span>8:22</span>
          <div>
            <span>78%</span>
          </div>
        </div>
        <div className="header-main">
          <button className="menu-button">☰</button>
          <h1>Library</h1>
          <div className="header-icons">
            <span>🔍</span>
            <span>⇅</span>
            <span>▦</span>
          </div>
        </div>
        <nav className="app-nav">
          <a href="#shelves">Shelves</a>
          <a href="#books" className={!showWishlist ? 'active' : ''} onClick={() => setShowWishlist(false)}>Books</a>
          <a href="#lend-borrow">Lend/Borrow</a>
          <button onClick={toggleWishlist} className={`wishlist-button ${showWishlist ? 'active' : ''}`}>
            Wishlist ({wishlist.length})
          </button>
        </nav>
      </header>
      {showWishlist ? (
        <div className="wishlist-view">
          <h2>My Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul className="wishlist-items">
              {wishlist.map((book) => (
                <li key={book.id}>
                  <img src={book.image} alt={book.title} />
                  <div className="wishlist-item-info">
                    <p className="book-title">{book.title}</p>
                    <p className="book-author">{book.author}</p>
                  </div>
                  <button onClick={() => removeFromWishlist(book.id)} className="remove-button">Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      ) : (
        <main className="book-grid">
          {initialBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-cover" />
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <button onClick={() => addToWishlist(book)} className="add-to-wishlist-button">
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
