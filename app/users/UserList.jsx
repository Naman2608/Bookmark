import getData from "@/firebase/firestore/getData";

async function getUsers() {
  
    const { res, error } = await getData('users')

    if (error) {
        return console.log(error)
    }

    return res;
}
export default async function UserList() {

    const users = await getUsers()

    return (
        <>
            {}
        </>

    )
}
