
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav>
            <h2>Nav Bar</h2>
            <Link href={"/"}>Home</Link>
            <Link href={"/users"}>Users</Link>
            <Link href={"/users/create"}>Create User</Link>


        </nav>
    )
}
