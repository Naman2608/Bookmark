import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      home.classList.add("select");
      books.classList.remove("select");
      routines.classList.remove("select");
    } else if (pathname === "/books") {
      books.classList.add("select");
      home.classList.remove("select");
      routines.classList.remove("select");
    } else {
      routines.classList.add("select");
      home.classList.remove("select");
      books.classList.remove("select");
    }
  }, [pathname]);

  return (
    <>
      <div className="navbar">
        <div className="button">
          <Link className="button_link " id="home" href={"/"}>
            Home
          </Link>
        </div>
        <div className="button">
          <Link className=" button_link" id="books" href={"/books"}>
            Books
          </Link>
        </div>
        <div className="button">
          <Link className=" button_link" id="routines" href={"/routines"}>
            Routines
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
