import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import Spinner from "./Spinner";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <>
      <div className="h-10 w-full border-b-2 flex items-center justify-center p-2">
        {loading ? (
          <Spinner />
        ) : !user ? (
          <ul className="flex">
            <li onClick={handleSignIn} className="p-2 cursor-pointer">
              Login
            </li>
            <li onClick={handleSignIn} className="p-2 cursor-pointer">
              Sign up
            </li>
          </ul>
        ) : (
          <div>
            <p>Welcome, {user.displayName}</p>
            <p className="cursor-pointer" onClick={handleSignOut}>
              Sign out
            </p>
          </div>
        )}
      </div>
      <div className="navbar">
        <div className="button">
          <Link className="select button_link" href={"/books"}>
            Books
          </Link>
        </div>
        <div className="button">
          <Link className="button_link" href={"/routines"}>
            Routines
          </Link>
        </div>
        <div className="button">
          <Link className="button_link" href={"/shop"}>
            Shop
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
