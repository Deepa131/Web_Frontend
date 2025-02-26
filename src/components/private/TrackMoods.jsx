import React, { useState } from "react";
import { FaSmile, FaFrown, FaMeh, FaSadTear, FaGrinStars } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/TrackMoods.css";

const moods = [
  { id: 1, icon: <FaGrinStars />, label: "Happy" },
  { id: 2, icon: <FaSmile />, label: "Content" },
  { id: 3, icon: <FaMeh />, label: "Neutral" },
  { id: 4, icon: <FaFrown />, label: "Sad" },
  { id: 5, icon: <FaSadTear />, label: "Very Sad" },
];

const TrackMoods = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    setMoodHistory([...moodHistory, { mood, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div className="track-moods-container">
      <Navbar />
      <section className="mood-selection">
        <h1>How Are You Feeling Today?</h1>
        <div className="mood-options">
          {moods.map((m) => (
            <button
              key={m.id}
              className={`mood-button ${selectedMood === m.label ? "active" : ""}`}
              onClick={() => handleMoodSelection(m.label)}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {moodHistory.length > 0 && (
        <section className="mood-history">
          <h2>Your Mood History</h2>
          <ul>
            {moodHistory.map((entry, index) => (
              <li key={index}>
                <span>{entry.date}</span> - <strong>{entry.mood}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default TrackMoods;
