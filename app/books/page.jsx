"use client";
import AddBook from "./AddBook";
import { UserAuth } from "/context/AuthContext";
import React, { useEffect, useState } from "react";
import PreviewBooks from "./PreviewBooks";
import Modal from "../components/Modal";

export default function Book() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <main>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : user ? (
        <>
          {/* <Link href="/books/?addbook=1">ADD Books</Link> */}
          <PreviewBooks />
          <button
            className="add_book_button"
            onClick={() => setShowAddBookModal(true)}
          >
            Add Book
          </button>
          {showAddBookModal ? (
            <Modal
              onClose={() => {
                setShowAddBookModal(false);
              }}
            >
              <AddBook />
              <button onClick={() => setShowAddBookModal(false)}>
                Add BOOK
              </button>
            </Modal>
          ) : null}
        </>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </main>
  );
}
