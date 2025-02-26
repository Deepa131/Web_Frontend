import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/DailyInsights.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { FaCalendarAlt, FaSave } from "react-icons/fa";
import { createDiaryEntry } from "../../api/api";

const DailyInsights = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayQuality, setDayQuality] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [highlight, setHighlight] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Function to handle saving the entry to the backend
  const saveEntry = async () => {
    if (!dayQuality || !thoughts || !highlight) {
      alert("Please fill in all fields before saving.");
      return;
    }
    try {
      const newEntry = {
        selectedDate,
        dayQuality,
        thoughts,
        highlight,
      };


      const response = await createDiaryEntry(newEntry); // Use the createDiaryEntry function

      if (response) {
        setMessage("Entry saved successfully! 🎉");
        // Reset fields after successful save
        setDayQuality("");
        setThoughts("");
        setHighlight("");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      setMessage("Failed to save entry. Please try again.");
    }
  };

  return (
    <div className="daily-insights">
      <Navbar />
      <div className="insights-container">
        <h1>Daily Insights</h1>

        {message && <div className="success-message">{message}</div>}

        <div className="input-group">
          <label>Select Date</label>
          <div className="date-picker">
            <FaCalendarAlt className="icon" />
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>

        <div className="input-group">
          <label>How was your day?</label>
          <select value={dayQuality} onChange={(e) => setDayQuality(e.target.value)}>
            <option value="">Select...</option>
            <option value="Excellent">Excellent 🤩</option>
            <option value="Good">Good 😊</option>
            <option value="Average">Average 😐</option>
            <option value="Bad">Bad 😞</option>
            <option value="Terrible">Terrible 😢</option>
          </select>
        </div>

        <div className="input-group">
          <label>Write your thoughts...</label>
          <textarea
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </div>

        <div className="input-group">
          <label>Today's Highlight</label>
          <input
            type="text"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="Add a highlight..."
          />
        </div>

        <button className="save-btn" onClick={saveEntry}>
          <FaSave /> Save Entry
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default DailyInsights;
