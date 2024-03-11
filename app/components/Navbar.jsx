
import Link from 'next/link'

export default function Navbar() {
    return (
        <div class="navbar">
            <div class="button">
                <Link class = "select button_link"  href={"/"}>Books</Link>
            </div>
            <div class="button">
                <Link class = "button_link"  href={"/"}>Routines</Link>
            </div>
            <div class="button">
                <Link class = "button_link"  href={"/"}>Shop</Link>
            </div>
        </div>
    )
}
