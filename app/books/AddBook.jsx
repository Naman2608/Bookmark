"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import addData from "/firebase/firestore/addData";
import { UserAuth } from "/context/AuthContext";

export default function AddBook() {
  const router = useRouter();
  const { user } = UserAuth();
  const user_id = user.uid;

  // State variables to hold the form data
  const [bookName, setBookName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { user_id, bookName, totalPages, author };

    // Write book data
    const { res, error } = await addData("books", data);
    if (error) {
      return console.log(error);
    }
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label htmlFor="bookName">Book Name:</label>
        <br />
        <input
          type="text"
          id="bookName"
          name="bookName"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="totalPages">Author:</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="totalPages">Total Pages:</label>
        <br />
        <input
          type="number"
          id="totalPages"
          name="totalPages"
          min="1"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
        />
        <br />
        <br />

        <button className={"button"}>Add Book</button>
      </form>
    </>
  );
}
