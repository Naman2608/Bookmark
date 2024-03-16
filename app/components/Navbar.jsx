import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="button">
          <Link className="select button_link" href={"/"}>
            Home
          </Link>
        </div>
        <div className="button">
          <Link className=" button_link" href={"/books"}>
            Books
          </Link>
        </div>
        <div className="button">
          <Link className=" button_link" href={"/routines"}>
            Routines
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
