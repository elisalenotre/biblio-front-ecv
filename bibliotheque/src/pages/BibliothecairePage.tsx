import React, { useState } from 'react';

type Book = {
  id: number;
  title: string;
  available: boolean;
};

const BibliothecairePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'Livre 1', available: true },
    { id: 2, title: 'Livre 2', available: false },
    { id: 3, title: 'Livre 3', available: true },
  ]);
  const [newBook, setNewBook] = useState<string>('');

  const addBook = () => {
    const book = { id: books.length + 1, title: newBook, available: true };
    setBooks([...books, book]);
    setNewBook('');
  };

  const deleteBook = (bookId: number) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  return (
    <div>
      <h2>Page des Bibliothécaires</h2>
      <h3>Ajouter un livre</h3>
      <input
        type="text"
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
        placeholder="Nom du livre"
      />
      <button onClick={addBook}>Ajouter</button>
      <h3>Liste des livres</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} <button onClick={() => deleteBook(book.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BibliothecairePage;