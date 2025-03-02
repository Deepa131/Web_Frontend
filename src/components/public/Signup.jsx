import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/api"; 
import "../../styles/Style.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSignup = async () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are required. Please complete the form.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await signupUser({
        username,
        email,
        password,
      });
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="signup-container">
        <h2>Signup</h2>
        <form>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleSignup}>Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
