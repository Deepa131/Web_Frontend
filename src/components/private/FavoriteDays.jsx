import React, { useState, useEffect, useCallback } from "react";
import { getFavorites, removeFavorite, updateFavorite } from "../../api/api";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/FavoriteDays.css";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const FavoriteDays = () => {
  const [favoriteEntries, setFavoriteEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({
    selectedDate: "",
    dayQuality: "",
    thoughts: "",
    highlight: "",
  });
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const token = localStorage.getItem("token");
      const data = await getFavorites(token);
      setFavoriteEntries(data);
    } catch (error) {
      console.error("Error fetching favorite entries:", error);
      setMessage("Failed to load favorite entries. Please try again.");
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemoveFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await removeFavorite(id, token);
      setFavoriteEntries(favoriteEntries.filter(entry => entry.id !== id));
      setMessage("Entry removed from favorite days ❌");
    } catch (error) {
      console.error("Error removing favorite entry:", error);
      setMessage("Failed to remove entry.");
    }
  };

  const handleEditFavorite = (index) => {
    setEditIndex(index);
    setEditedEntry(favoriteEntries[index]);
  };

  const handleSaveEditedEntry = async () => {
    // Validate edited entry before saving
    if (!editedEntry.highlight || !editedEntry.thoughts) {
      setMessage("Highlight and thoughts cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const { id } = favoriteEntries[editIndex];
      await updateFavorite(id, editedEntry, token);
      
      const updatedFavorites = [...favoriteEntries];
      updatedFavorites[editIndex] = { ...editedEntry, id };
      setFavoriteEntries(updatedFavorites);
      setEditIndex(null);
      setMessage("Entry updated successfully! ✏️");
    } catch (error) {
      console.error("Error updating entry:", error);
      setMessage("Failed to update entry.");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedEntry({
      selectedDate: "",
      dayQuality: "",
      thoughts: "",
      highlight: "",
    });
  };

  const uniqueHighlights = [...new Set(favoriteEntries.map(entry => entry.highlight))];
  const filteredEntries = selectedHighlight
    ? favoriteEntries.filter(entry => entry.highlight === selectedHighlight)
    : favoriteEntries;

  return (
    <div className="favorite-days">
      <Navbar />
      <div className="main-container">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li onClick={() => setSelectedHighlight(null)}>Favorite Days</li>
            <h3>Highlights</h3>
            {uniqueHighlights.map((highlight, index) => (
              <li key={index} onClick={() => setSelectedHighlight(highlight)}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="favorites-container">
          <h1>Favorite Days</h1>
          {message && <div className="success-message">{message}</div>}
          {loading ? (
            <p>Loading favorite days...</p>
          ) : filteredEntries.length === 0 ? (
            <p>No favorite days found.</p>
          ) : (
            <div className="entries-list">
              {filteredEntries.map((entry, index) => (
                <div key={entry.id} className="entry-card">
                  {editIndex === index ? (
                    <div className="edit-section">
                      <input
                        type="text"
                        value={editedEntry.highlight}
                        onChange={(e) => setEditedEntry({ ...editedEntry, highlight: e.target.value })}
                        placeholder="Highlight"
                      />
                      <input
                        type="text"
                        value={editedEntry.thoughts}
                        onChange={(e) => setEditedEntry({ ...editedEntry, thoughts: e.target.value })}
                        placeholder="Thoughts"
                      />
                      <button onClick={handleSaveEditedEntry} className="save-btn"><FaSave /> Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div className="entry-header">
                        <strong className="entry-date">
                          {new Date(entry.selectedDate).toLocaleDateString()}
                        </strong>
                        <div className="entry-actions">
                          <FaEdit onClick={() => handleEditFavorite(index)} className="edit-icon" />
                          <FaTrash onClick={() => handleRemoveFavorite(entry.id)} className="delete-icon" />
                        </div>
                      </div>
                      <div className="entry-content">
                        <div className="highlight-section">
                          <span className="highlight-label">Today's Highlight:</span>
                          <p className="highlight-text" style={{ fontWeight: "bold" }}>{entry.highlight}</p>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteDays;