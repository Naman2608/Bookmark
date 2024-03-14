"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import addData from "@/firebase/firestore/addData";

export default function CreateRoutine() {
  const router = useRouter();

  const [bookId, setBookId] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [readingHours, setReadingHours] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { bookId, selectedDays, readingHours };

    const { res, error } = await addData("routines", data);

    if (error) {
      return console.log(error);
    }
    router.push("/");
    router.refresh();
    console.log(res);
  };
  // Function to handle checkbox change
  const handleDayChange = (event) => {
    const day = parseInt(event.target.value);
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      // If the day is not selected, add it
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Book ID:</span>
        <input
          required
          type="text"
          onChange={(e) => setBookId(e.target.value)}
          value={bookId}
        />
      </label>
      <label>
        {/* <span>Frequency:</span> */}
        <label>Select Days:</label>

        <label htmlFor="monday">Monday</label>
        <input
          type="checkbox"
          id="monday"
          name="days"
          value="1"
          onChange={handleDayChange}
        />
        <label htmlFor="tuesday">Tuesday</label>
        <input
          type="checkbox"
          id="tuesday"
          name="days"
          value="2"
          onChange={handleDayChange}
        />
        <label htmlFor="wednesday">Wednesday</label>
        <input
          type="checkbox"
          id="wednesday"
          name="days"
          value="3"
          onChange={handleDayChange}
        />
        <label htmlFor="thursday">Thursday</label>
        <input
          type="checkbox"
          id="thursday"
          name="days"
          value="4"
          onChange={handleDayChange}
        />
        <label htmlFor="friday">Friday</label>
        <input
          type="checkbox"
          id="friday"
          name="days"
          value="5"
          onChange={handleDayChange}
        />
        <label htmlFor="saturday">Saturday</label>
        <input
          type="checkbox"
          id="saturday"
          name="days"
          value="6"
          onChange={handleDayChange}
        />
        <label htmlFor="sunday">Sunday</label>
        <input
          type="checkbox"
          id="sunday"
          name="days"
          value="7"
          onChange={handleDayChange}
        />
        <br />
        <br />

        <label htmlFor="readingDays">Reading Hours per Day:</label>
        <input
          type="number"
          id="readingHours"
          name="readingHours"
          min="1"
          max="24"
          required
          onChange={(e) => setReadingHours(e.target.value)}
          value={readingHours}
        />
      </label>

      <button className="btn-primary">Submit</button>
    </form>
  );
}
