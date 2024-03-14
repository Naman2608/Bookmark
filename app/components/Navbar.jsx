import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    console.log(user);
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
          <div className="header">
            <Image
              className="cursor-pointer"
              src={user.photoURL}
              width="48"
              height="48"
              alt="profile"
            ></Image>
            <p>Welcome, {user.displayName}</p>
            <p className="cursor-pointer" onClick={handleSignOut}>
              Sign out
            </p>
          </div>
        )}
      </div>
      <div className="navbar">
        <div className="button">
          <Link className="select button_link" href={"/"}>
            Home
          </Link>
        </div>
        <div className="notification button">
          <Link className=" button_link" href={"/books"}>
            Books
          </Link>
        </div>
        <div className="selection button">
          <Link className=" button_link" href={"/routines"}>
            Routines
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
