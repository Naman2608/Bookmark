"use client";
import { useState, useMemo } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { UserAuth } from "/context/AuthContext";
import getData from "/firebase/firestore/getData";
import addData from "/firebase/firestore/addData";
import { useRouter } from "next/navigation";

const AddRoutine = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [readingHours, setReadingHours] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [activity, setActivity] = useState("");
  const { user } = UserAuth();
  const fetchBooks = async (user) => {
    if (user) {
      const query = ["user_id", "==", `${user.uid}`];
      const { result, error } = await getData("books", query);
      if (error) {
        console.log(error);
      } else {
        const booksData = result.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      }
    }
  };
  useMemo(() => {
    fetchBooks(user);
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const routineData = {
        bookId: selectedBookId,
        selectedDays,
        readingHours,
        startTime,
        endTime,
        activity,
      };

      const { res, error } = await addData("routines", routineData);
      if (error) {
        return console.log(error);
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error adding routine:", error.message);
    }
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
    <div>
      <h1>Add Routine</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="bookId">Select Book:</label>
        <select
          id="bookId"
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          required
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.bookName} ({book.id})
            </option>
          ))}
        </select>
        <br />
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
        <br />
        <label htmlFor="timeRange">Time Range:</label>
        <div required>
          <Flatpickr
            value={startTime}
            onChange={(selectedDates) => setStartTime(selectedDates[0])}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "h:i K",
              time_24hr: false,
              enableSeconds: false,
              placeholder: "Select start time",
              allowInput: true,
            }}
          />
          {" - "}
          <Flatpickr
            value={endTime}
            onChange={(selectedDates) => setEndTime(selectedDates[0])}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "h:i K",
              time_24hr: false,
              enableSeconds: false,
              placeholder: "Select end time",
              allowInput: true,
            }}
          />
        </div>
        <br />
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter activity"
        />
        <br />
        <button type="submit">Add Routine</button>
      </form>
    </div>
  );
};

export default AddRoutine;
