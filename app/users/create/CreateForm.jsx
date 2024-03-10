"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import addData from "@/firebase/firestore/addData";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
// import { AuthUI } from "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"

// const appSettings = {
//     databaseURL: "https://bookmark-001-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// // const listDBref = ref(database, "List")
// const AsapListDBref = ref(database, "user")

export default function CreateForm() {

    const router = useRouter()

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [City, setCity] = useState('')
    const [Number, setNumber] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { Name, Email, City, Number }

        // const res = await fetch('http://localhost:4000/users', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newUser)
        // })
        // // console.log(res.status);
        // if (res.status === 201) {
        //     router.push('/users')
        //     router.refresh()
        // }
        const { res, error } = await addData('users', data)

        if (error) {
            return console.log(error)
        }
        console.log(res);
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2">
            <label>
                <span>Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                />
            </label>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                />
            </label><label>
                <span>City:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={City}
                />
            </label><label>
                <span>Number:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setNumber(e.target.value)}
                    value={Number}
                />
            </label>

            <button
                className="btn-primary"
            >Submit
            </button>
        </form>
    )
}
