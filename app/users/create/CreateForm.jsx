"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function CreateForm() {

    const router = useRouter()

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [City, setCity] = useState('')
    const [Number, setNumber] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUser = { Name, Email, City, Number }

        const res = await fetch('http://localhost:4000/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        // console.log(res.status);
        if (res.status === 201) {
            router.push('/users')
            router.refresh()
        }

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
