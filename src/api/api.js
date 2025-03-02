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

export const loginUser = async (credentials) => {
  try {
      const response = await axios.post(`${BASE_URL}/users/login`, 
          JSON.stringify(credentials),  
          {
              headers: { 
                  'Content-Type': 'application/json'
              },
          }
      );
      return response.data;
  } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to log in");
  }
};


// Function to create a new diary entry
export const createDiaryEntry = async (entryData) => {
    const token = localStorage.getItem('token'); 
    try {
        const response = await axios.post(`${BASE_URL}/diaries/create`, entryData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching diary entries:", error.response ? error.response.data : error);
      throw new Error("Failed to fetch diary entries"); 
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
      
      if (!response.data) {
          throw new Error("No data returned from the API");
      }

      return response.data; 
  } catch (error) {
      if (error.response) {
          console.error("Error fetching favorites:", {
              status: error.response.status,
              data: error.response.data,
              message: error.message,
          });
      } else {
          console.error("Error fetching favorites:", error.message);
      }
      
      throw new Error(`Failed to fetch favorite entries: ${error.response ? error.response.data.message : error.message}`);
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
      const response = await axios.put(
          `${BASE_URL}/diaries/favorites/${id}`,
          favoriteData,
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }
      );
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

export const toggleFavorite = async (token, entryId) => {
  if (!entryId) {
    console.error("Error: Missing entryId for toggling favorite.");
    return;
  }

  console.log("Toggling favorite for entryId:", entryId);

  try {
    const response = await fetch("http://localhost:5000/api/diaries/favorites/add_favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ diaryId: entryId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to toggle favorite");
    }

    const result = await response.json();
    console.log("Favorite Toggle Response:", result);
    return result;
  } catch (error) {
    console.error("API Error toggling favorite:", error.message);
    throw error;
  }
};




