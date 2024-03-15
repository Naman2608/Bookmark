import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { UserAuth } from "@/context/AuthContext";
import Spinner from "./Spinner";
import addData from "@/firebase/firestore/addData";

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
        };
        checkAuthentication();
    }, [user]);

    useMemo(() => {
        if (user) {
            const userId = user.uid;
            const userName = user.displayName;
            const userEmail = user.email;
            const userData = {
                userId,
                userEmail,
                userName,
            };
            const { res, error } = addData("users", userData);
            if (error) {
                return console.log(error);
            }
        }
    }, [user]);
    return (
        <>
            <div className="top-bar">
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
                            width="36"
                            height="36"
                            alt="profile"
                        ></Image>
                        <div class="accounts">
                            <p>{user.displayName}</p>
                            <p className="Sign Out  " onClick={handleSignOut}>
                                Sign out
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default Topbar;
