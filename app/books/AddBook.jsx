"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import addData from "@/firebase/firestore/addData";

export default function AddBook() {

    const router = useRouter()

    // State variables to hold the form data
    const [bookName, setBookName] = useState('');
    const [totalPages, setTotalPages] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { bookName, totalPages }

        // const res = await fetch('http://localhost:4000/users', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newUser)
        // })
        // // console.log(res.status);

        const { res, error } = await addData('books', data)

        if (error) {
            return console.log(error)
        }
        router.push('/')
        router.refresh()
        console.log(res);
    };
    // Function to handle checkbox change
    const handleDayChange = (event) => {
        const day = parseInt(event.target.value);
        if (selectedDays.includes(day)) {
            // If the day is already selected, remove it
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            // If the day is not selected, add it
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit} className="w-1/2">

                <label htmlFor="bookName">Book Name:</label><br />
                <input type="text" id="bookName" name="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} /><br /><br />

                <label htmlFor="totalPages">Total Pages:</label><br />
                <input type="number" id="totalPages" name="totalPages" min="1" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} /><br /><br />

                <button
                    className="btn-primary"
                >Add Book
                </button>
            </form>
        </>
    )
}
