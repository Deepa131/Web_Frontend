// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

// Function to sign up a new user
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/signup`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to sign up user');
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Login error response:", error.response);
        throw new Error('Failed to log in user');
    }
};

// Function to create a new diary entry
export const createDiaryEntry = async (entryData) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    try {
        const response = await axios.post(`${BASE_URL}/diaries/create`, entryData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("Create entry error response:", error.response);
        throw new Error('Failed to create diary entry');
    }
};

export const getAllDiaryEntries = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/diaries/all`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT for authentication
        },
      });
      return response.data; // Return the data received from the API
    } catch (error) {
      console.error("Error fetching diary entries:", error.response ? error.response.data : error);
      throw new Error("Failed to fetch diary entries"); // Throw an error for handling in the component
    }
};

export const getDiaryEntryById = async (id, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/diaries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching diary entry:", error.response ? error.response.data : error);
      throw new Error("Failed to fetch diary entry");
    }
};

export const updateDiaryEntry = async (id, updatedData, token) => {
    try {
      const response = await axios.put(`${BASE_URL}/diaries/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating diary entry:", error.response ? error.response.data : error);
      throw new Error("Failed to update diary entry");
    }
};

export const deleteDiaryEntry = async (id, token) => {
    try {
      const response = await axios.delete(`${BASE_URL}/diaries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error deleting diary entry:", error.response ? error.response.data : error);
      throw new Error("Failed to delete diary entry");
    }
};

export const addFavorite = async (userId, diaryId, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/diaries/favorites/add_favorite`, { userId, diaryId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error adding favorite:", error.response ? error.response.data : error);
      throw new Error("Failed to add favorite");
    }
};

export const getFavorites = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/diaries/favorites/get_favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching favorites:", error.response ? error.response.data : error);
      throw new Error("Failed to fetch favorite entries");
    }
};

export const getFavoriteById = async (id, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/diaries/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching favorite entry by ID:", error.response ? error.response.data : error);
      throw new Error("Failed to fetch favorite entry");
    }
};

export const updateFavorite = async (id, favoriteData, token) => {
    try {
      const response = await axios.put(`${BASE_URL}/diaries/favorites/${id}`, favoriteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error updating favorite entry:", error.response ? error.response.data : error);
      throw new Error("Failed to update favorite entry");
    }
};

export const removeFavorite = async (id, token) => {
    try {
      const response = await axios.delete(`${BASE_URL}/diaries/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error removing favorite entry:", error.response ? error.response.data : error);
      throw new Error("Failed to remove favorite entry");
    }
};

export const toggleFavorite = async (entryId) => {
  try {
      const response = await fetch(`http://localhost:5000/api/diaries/favorites/${entryId}/toggle`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to toggle favorite entry");
      }

      return await response.json();
  } catch (error) {
      console.error("Error toggling favorite entry:", error);
      throw error;
  }
};

