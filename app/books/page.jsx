"use client";
import AddBook from "./AddBook";
import { UserAuth } from "@/context/AuthContext";
import Spinner from "../components/Spinner";
import React, { useEffect, useState } from "react";

export default function CreateUser() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

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
        <Spinner />
      ) : user ? (
        <>
          <h1 className="text-enter">Books</h1>
          <AddBook />
        </>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </main>
  );
}
