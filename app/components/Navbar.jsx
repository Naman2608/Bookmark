
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav>
            <h2>Nav Bar</h2>
            <Link href={"/"}>Home</Link>
            <Link href={"/signin"}>Sign In</Link>
            <Link href={"/signup"}>Sign Up</Link>
            <Link href={"/admin"}>Admins</Link>
            <Link href={"/users"}>Users</Link>
            <Link href={"/users/create"}>Create User</Link>


        </nav>
    )
}
