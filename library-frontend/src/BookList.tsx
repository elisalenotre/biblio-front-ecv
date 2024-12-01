import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const borrowBook = (id: string) => {
    axios.post(`http://localhost:3000/books/borrow/${id}`)
      .then(() => {
        setBooks(books.map(book =>
          book.id === id ? { ...book, available: false } : book
        ));
      });
  };

  const returnBook = (id: string) => {
    axios.post(`http://localhost:3000/books/return/${id}`)
      .then(() => {
        setBooks(books.map(book =>
          book.id === id ? { ...book, available: true } : book
        ));
      });
  };

  return (
    <div>
      <h1>Library</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} - {book.available ? 'Available' : 'Borrowed'}
            {book.available ? (
              <button onClick={() => borrowBook(book.id)}>Borrow</button>
            ) : (
              <button onClick={() => returnBook(book.id)}>Return</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
