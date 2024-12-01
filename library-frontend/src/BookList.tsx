import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  status: "available" | "borrowed";
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} - {book.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
