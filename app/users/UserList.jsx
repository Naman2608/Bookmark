import getData from "@/firebase/firestore/getData";

async function getUsers() {
    // const res = await fetch('http://localhost:4000/users', {
    //     next: {
    //         revalidate: 0
    //     }
    // })
    const { res, error } = await getData('users', 'user-id')

    if (error) {
        return console.log(error)
    }
    console.log(res);
    return res;
}
export default async function UserList() {

    const users = await getUsers()

    return (
        <>
            {
                users.map((user) => (
                    <div key={user.id} className="card my-5">
                        <table>
                            <tr>
                                <td><b>Name</b>:{user.Name}</td>
                                <td><b>Email</b>{user.Email}</td>
                                <td><b>City</b>{user.City}</td>
                                <td><b>Mobile Number</b>{user.Number}</td>

                            </tr>
                        </table>
                    </div>
                ))
            }
            {users.length === 0 && (
                <p className="text-center">
                    No User Found in Database
                </p>
            )}
        </>

    )
}
