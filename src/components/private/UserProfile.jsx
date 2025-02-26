import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            try {
              const response = await axios.get('http://localhost:5000/api/users/:id', {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log(response.data);
            } catch (error) {
              console.error('Error fetching user details', error);
            }
          };
          

        fetchUserDetails();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {user ? (
                <div>
                    <h1>{user.username}'s Profile</h1>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    {/* Display other user details here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
