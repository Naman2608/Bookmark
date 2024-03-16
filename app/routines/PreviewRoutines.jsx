import React from "react";
import getData from "/firebase/firestore/getData";
import { useState, useMemo } from "react";
import { UserAuth } from "/context/AuthContext";

const PreviewBooks = () => {
  const [books, setBooks] = useState([]);
  const [routines, setRoutines] = useState([]);
  const { user } = UserAuth();

  const fetchBooks = async (user) => {
    if (user) {
      const query = ["user_id", "==", `${user.uid}`];
      const { result, error } = await getData("books", query);
      if (error) {
        console.log(error);
      } else {
        const booksData = result.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      }
    }
  };
  console.log(books);
  useMemo(() => {
    fetchBooks(user);
  }, [user]);

  const listItems = books.map((book) => (
    <li key={book.id}>
      <p>
        <b>{book.bookName}</b>
        {"  "}author: {" " + book.author + " "}
        {"  "}pages: {book.totalPages}
      </p>
    </li>
  ));
  {
    return <ul>{listItems}</ul>;
  }
};

export default PreviewBooks;
