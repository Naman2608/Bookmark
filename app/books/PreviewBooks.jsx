import React from "react";
import getData from "/firebase/firestore/getData";
import { useState, useMemo } from "react";
import { UserAuth } from "/context/AuthContext";

const PreviewBooks = () => {
  const [books, setBooks] = useState([]);
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
  useMemo(() => {
    fetchBooks(user);
  }, [user]);

  const listItems = books.map((book) => (
    <div className={"book_id"} key={book.id}>
      <span className={"book_entity"}>
        <span className={"book_name"}>{book.bookName}</span>
        <span className={"author"}>
          <span className={"by"}>by</span>
          <span className={"author_name"}>{book.author}</span>
        </span>
        <span className={"total_pages"}>{book.totalPages} Pages</span>
      </span>
    </div>
  ));
  {
    return <div className={"books_shelf"}>{listItems}</div>;
  }
};

export default PreviewBooks;
