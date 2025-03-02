import React, { useState, useEffect } from "react";
import {
  getAllDiaryEntries,
  updateDiaryEntry,
  deleteDiaryEntry,
  toggleFavorite,
  getFavorites,
} from "../../api/api"; 
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
      if (!token) return;
      try {
        const data = await getAllDiaryEntries(token);
        const formattedEntries = data.map(entry => ({
          ...entry,
          highlight: entry.highlight?.trim() || "No highlight.",
          thoughts: entry.thoughts?.trim() || "No thoughts provided.",
          dayQuality: entry.dayQuality?.trim() || "Unknown",
        }));
        setEntries(formattedEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchEntries();
  }, [token]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const favoriteData = await getFavorites(token);
        setFavorites(favoriteData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  const saveEditedEntry = async () => {
    if (!selectedEntry.entryId) {
      alert("Invalid entry ID");
      return;
    }
    try {
      await updateDiaryEntry(selectedEntry.entryId, selectedEntry, token);
      setEditIndex(null);
      setSelectedEntry({});
      const updatedEntries = await getAllDiaryEntries(token);
      setEntries(updatedEntries);
    } catch (error) {
      alert("Failed to update the entry. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setSelectedEntry({});
  };

  const deleteEntry = async (index) => {
    const entryToDelete = entries[index];
    if (!entryToDelete || !entryToDelete.entryId) {
      alert("Invalid entry");
      return;
    }
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteDiaryEntry(entryToDelete.entryId, token);
        setEntries(prevEntries => prevEntries.filter(entry => entry.entryId !== entryToDelete.entryId));
      } catch (error) {
        alert("Failed to delete entry. Please try again.");
      }
    }
  };

  const toggleFavoriteEntry = async (index) => {
    const entry = entries[index];
    if (!entry || !entry.entryId) {
      alert("Invalid entry. Please try again.");
      return;
    }
    try {
      await toggleFavorite(token, entry.entryId);
      setFavorites(prevFavorites =>
        prevFavorites.some(fav => fav.entryId === entry.entryId)
          ? prevFavorites.filter(fav => fav.entryId !== entry.entryId)
          : [...prevFavorites, entry]
      );
    } catch (error) {
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
                        className={`favorite-icon ${favorites.some(fav => fav.entryId === entry.entryId) ? "favorited" : ""}`}
                        onClick={() => toggleFavoriteEntry(index)}
                      />
                    </div>
                  </div>

                  {editIndex === index ? (
                    <div className="edit-form">
                      <label>Highlight</label>
                      <input type="text" value={selectedEntry.highlight} onChange={(e) => setSelectedEntry({ ...selectedEntry, highlight: e.target.value })} />
                      <label>Day Quality</label>
                      <input type="text" value={selectedEntry.dayQuality} onChange={(e) => setSelectedEntry({ ...selectedEntry, dayQuality: e.target.value })} />
                      <label>Thoughts</label>
                      <textarea value={selectedEntry.thoughts} onChange={(e) => setSelectedEntry({ ...selectedEntry, thoughts: e.target.value })} />
                      <button onClick={saveEditedEntry}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="entry-content">
                      <p><strong>Today's Highlight:</strong> {entry.highlight}</p>
                      <p><strong>My day was:</strong> {entry.dayQuality}</p>
                      <p><strong>Thoughts:</strong> {entry.thoughts}</p>
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
