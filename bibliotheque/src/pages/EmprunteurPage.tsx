import React, { useState } from 'react';

type Book = {
  id: number;
  title: string;
  available: boolean;
};

const EmprunteurPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'Livre 1', available: true },
    { id: 2, title: 'Livre 2', available: false },
    { id: 3, title: 'Livre 3', available: true },
  ]);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  const borrowBook = (book: Book) => {
    if (book.available) {
      setBorrowedBooks([...borrowedBooks, book]);
      setBooks(books.map((b) => (b.id === book.id ? { ...b, available: false } : b)));
    }
  };

  const returnBook = (book: Book) => {
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== book.id));
    setBooks(books.map((b) => (b.id === book.id ? { ...b, available: true } : b)));
  };

  return (
    <div>
      <h2>Page des Emprunteurs</h2>
      <h3>Liste des livres</h3>
      <ul>
        {books.map((book) =>
          book.available ? (
            <li key={book.id}>
              {book.title} <button onClick={() => borrowBook(book)}>Emprunter</button>
            </li>
          ) : null
        )}
      </ul>
      <h3>Livres empruntés</h3>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.id}>
            {book.title} <button onClick={() => returnBook(book)}>Rendre</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmprunteurPage;