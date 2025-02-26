import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API requests
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/FavoriteDays.css";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Import icons for editing and deleting

const API_URL = "http://localhost:5000/api/diaries/favorites"; // Update API endpoint

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

  // Fetch favorites from the backend
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`${API_URL}`, config);
        setFavorites(response.data);
    } catch (error) {
        console.error("Error fetching favorite entries:", error);
        alert("Failed to load favorite entries. Please try again.");
    }
};

  // Remove favorite entry from backend
  const removeFavorite = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFavoriteEntries(favoriteEntries.filter(entry => id !== id));
      setMessage("Entry removed from favorite days ❌");
    } catch (error) {
      console.error("Error removing favorite entry:", error);
      setMessage("Failed to remove entry.");
    }
  };

  // Edit favorite entry
  const editFavorite = (index) => {
    setEditIndex(index);
    setEditedEntry(favoriteEntries[index]);
  };

  // Save edited favorite entry to backend
  const saveEditedEntry = async () => {
    try {
      const { id } = favoriteEntries[editIndex];
      await axios.put(`${API_URL}/${id}`, editedEntry);
      
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

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setEditedEntry({
      selectedDate: "",
      dayQuality: "",
      thoughts: "",
      highlight: "",
    });
  };

  // Get unique highlights for sidebar
  const uniqueHighlights = [...new Set(favoriteEntries.map(entry => entry.highlight))];

  // Filter entries by selected highlight
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
                      <button onClick={saveEditedEntry} className="save-btn"><FaSave /> Save</button>
                      <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div className="entry-header">
                        <strong className="entry-date">
                          {new Date(entry.selectedDate).toLocaleDateString()}
                        </strong>
                        <div className="entry-actions">
                          <FaEdit onClick={() => editFavorite(index)} className="edit-icon" />
                          <FaTrash onClick={() => removeFavorite(entry.id)} className="delete-icon" />
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
