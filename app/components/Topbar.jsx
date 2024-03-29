import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { UserAuth } from "../../context/AuthContext";
import { addDataWithId } from "/firebase/firestore/addData";

const Topbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

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
      addUser(user);
    };
    checkAuthentication();
  }, [user]);

  function showAccounts() {
    let accounts = document.getElementById("accounts");
    accounts.classList.toggle("accounts-visible");
  }

  function addUser(user) {
    if (user) {
      const userId = user.uid;
      const userName = user.displayName;
      const userEmail = user.email;
      const userData = {
        userId,
        userEmail,
        userName,
      };
      const { res, error } = addDataWithId("users", userId, userData);
      if (error) {
        return console.log(error);
      }
    }
  }
  return (
    <>
      <div className="top-bar">
        <h1 className="top-bar-title">THE BOOKMARK</h1>
        {loading ? (
          <h1 className="loading">Loading...</h1>
        ) : !user ? (
          <div className="login-signup">
            <span onClick={handleSignIn} className="login">
              Login
            </span>
            <span onClick={handleSignIn} className="signup">
              Sign up
            </span>
          </div>
        ) : (
          <div className="header">
            <Image
              className="cursor-pointer"
              priority={true}
              src={user.photoURL}
              width="36"
              height="36"
              alt="profile"
              onClick={showAccounts}
            />
            <div className="accounts" id="accounts">
              <div className="name">{user.displayName}</div>
              <div className="accounts_item" onClick={handleSignOut}>
                Sign out
              </div>
              <div className="accounts_item">About</div>
              <div className="accounts_item">Preferences</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Topbar;
