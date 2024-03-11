
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
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
    return (
        <div class="navbar">
            <div class="button">
                <Link class="select button_link" href={"/books"}>Books</Link>
            </div>
            <div class="button">
                <Link class="button_link" href={"/routines"}>Routines</Link>
            </div>
            <div class="button">
                <Link class="button_link" href={"/shop"}>Shop</Link>
            </div>
            {/* {!user ? null : (
                <>

                </>
            )}
            {loading ? null : !user ? (
                <ul class="button">
                    <li onClick={handleSignIn} class="button_link">
                        Login
                    </li>
                    <li onClick={handleSignIn} class="button_link">
                        Sign up
                    </li>
                </ul>
            ) : (
                <div>
                    <p>Welcome, {user.displayName}</p>
                    <p class="button_link" onClick={handleSignOut}>
                        Sign out
                    </p>
                </div>
            )} */}
        </div>
    );
};
export default Navbar;