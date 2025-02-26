import React, { useState, useEffect } from "react";
import { getAllDiaryEntries, getDiaryEntryById, updateDiaryEntry, deleteDiaryEntry, toggleFavorite } from "../../api/api"; 
import "../../styles/MyEntries.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

const MyEntries = () => {
  const [entries, setEntries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState({});
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getAllDiaryEntries(token);
        console.log("Fetched entries:", data);
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, [token]);

  const saveEditedEntry = async () => {
    console.log("Selected entry before saving:", selectedEntry);

    if (!selectedEntry.entryId) {
      console.error("Entry ID is missing or invalid", selectedEntry);
      alert("Invalid entry ID");
      return;
    }

    try {
      const updatedEntry = await updateDiaryEntry(selectedEntry.entryId, selectedEntry, token);
      console.log("Updated entry response:", updatedEntry);

      const updatedEntries = entries.map((entry) =>
        entry.entryId === selectedEntry.entryId ? updatedEntry : entry
      );

      setEntries(updatedEntries);
      setEditIndex(null);
      setSelectedEntry({});
    } catch (error) {
      console.error("Error editing entry:", error.message);
      alert("Failed to update the entry. Please try again later.");
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setSelectedEntry({});
  };

  const deleteEntry = async (index) => {
    const entryToDelete = entries[index];
    console.log("Deleting entry:", entryToDelete);

    if (!entryToDelete || !entryToDelete.entryId) {
      console.error("Invalid entry or missing entry ID for deletion");
      alert("Unable to delete this entry. Please try again.");
      return;
    }

    const confirmMessage = "Are you sure you want to delete this entry?";
    if (window.confirm(confirmMessage)) {
      try {
        await deleteDiaryEntry(entryToDelete.entryId, token);
        const updatedEntries = entries.filter(
          (entry) => entry.entryId !== entryToDelete.entryId
        );
        setEntries(updatedEntries);
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry. Please try again later.");
      }
    }
  };

  const toggleFavoriteEntry = async (index) => {
    const entry = entries[index];
    console.log("Toggling favorite for entry:", entry);

    // Validate entry and entryId
    if (!entry || !entry.entryId) {
        console.error("Invalid entry or missing entry ID for favorite action");
        alert("Unable to toggle favorite. Please try again.");
        return;
    }

    const token = localStorage.getItem("token"); // Ensure token is fetched
    if (!token) {
        alert("You must be logged in to toggle favorites.");
        return;
    }

    const isFavorited = favorites.some((fav) => fav.entryId === entry.entryId);

    try {
        // Toggle favorite status
        if (isFavorited) {
            await deleteDiaryEntry(entry.entryId, token); // Call your delete function here for unfavoriting
            const updatedFavorites = favorites.filter((fav) => fav.entryId !== entry.entryId);
            setFavorites(updatedFavorites);
        } else {
            await toggleFavorite(entry.entryId, token); // Call the toggleFavorite API
            setFavorites([...favorites, entry]); // Add entry to favorites
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
        alert("Failed to update favorite. Please try again.");
    }
};

  const editEntry = (index) => {
    setEditIndex(index);
    setSelectedEntry(entries[index]);
  };

  const uniqueHighlights = [...new Set(entries.map((entry) => entry.highlight))];

  const filteredEntries = selectedHighlight
    ? entries.filter((entry) => entry.highlight === selectedHighlight)
    : entries;

  return (
    <div className="my-entries">
      <Navbar />
      <div className="main-container">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li onClick={() => setSelectedHighlight(null)}>My Entries</li>
            <h3>Highlights</h3>
            {uniqueHighlights.map((highlight, index) => (
              <li key={index} onClick={() => setSelectedHighlight(highlight)}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="entries-container">
          {selectedHighlight && <h1>Entries for: {selectedHighlight}</h1>}
          <div className="entries-list">
            {filteredEntries.length === 0 ? (
              <p>Select a highlight to view entries.</p>
            ) : (
              filteredEntries.map((entry, index) => (
                <div key={entry.entryId} className="entry-card">
                  <div className="entry-header">
                    <strong className="entry-date">
                      {new Date(entry.selectedDate).toLocaleDateString()}
                    </strong>
                    <div className="entry-actions">
                      <FaEdit onClick={() => editEntry(index)} className="edit-icon" />
                      <FaTrash onClick={() => deleteEntry(index)} className="delete-icon" />
                      <FaHeart
                        className={`favorite-icon ${
                          favorites.some((fav) => fav.entryId === entry.entryId) ? "favorited" : ""
                        }`}
                        onClick={() => toggleFavoriteEntry(index)}
                      />
                    </div>
                  </div>

                  {editIndex === index ? (
                    <div className="edit-form">
                      <div>
                        <label>Highlight</label>
                        <input
                          type="text"
                          value={selectedEntry.highlight}
                          onChange={(e) =>
                            setSelectedEntry({ ...selectedEntry, highlight: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label>Day Quality</label>
                        <input
                          type="text"
                          value={selectedEntry.dayQuality}
                          onChange={(e) =>
                            setSelectedEntry({ ...selectedEntry, dayQuality: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label>Thoughts</label>
                        <textarea
                          value={selectedEntry.thoughts}
                          onChange={(e) =>
                            setSelectedEntry({ ...selectedEntry, thoughts: e.target.value })
                          }
                        />
                      </div>
                      <button onClick={saveEditedEntry}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="entry-content">
                      <div className="highlight-section">
                        <span className="highlight-label">Today's Highlight:</span>
                        <p className="highlight-text" style={{ fontWeight: "bold" }}>
                          {entry.highlight}
                        </p>
                      </div>
                      <div className="quality-section">
                        <span className="quality-label">My day was:</span>
                        <p className="quality-text">{entry.dayQuality}</p>
                      </div>
                      <div className="thoughts-section">
                        <span className="thoughts-label">Thoughts:</span>
                        <p className="thoughts-text">{entry.thoughts}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyEntries;
