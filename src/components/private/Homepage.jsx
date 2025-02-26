import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/Homepage.css";
import notebook from "../../assets/images/Notebook.png";
import { FaShieldAlt, FaBook, FaHeart, FaSmile, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
      navigate(path);
  };

  return (
    <div className="home-container">
      <Navbar />

      <section className="hero-section">
        <h1>Your Digital Safe Space for <span>Daily Reflections</span></h1>
        <p>Capture your thoughts, track your moods, and cherish your memories in a beautiful and secure digital diary.</p>
      </section>

      {/* Feature Sections */}
      <section className="features-section">
        <div className="feature-card" onClick={() => handleNavigation("/reflect-now")}> 
          <FaBook className="feature-icon" />
          <h3>Write Freely</h3>
          <p>Express yourself in a beautiful, distraction-free writing environment with automatic saving.</p>
        </div>
        <div className="feature-card" onClick={() => handleNavigation("/favorite-moments")}> 
          <FaHeart className="feature-icon" />
          <h3>Favorite Moments</h3>
          <p>Mark and collect your most precious memories in a special favorites section.</p>
        </div>
        <div className="feature-card" onClick={() => handleNavigation("/track-moods")}> 
          <FaSmile className="feature-icon" />
          <h3>Track Moods</h3>
          <p>Monitor your emotional journey with our intuitive mood tracking system.</p>
        </div>
      </section>

      {/* Your Journey Section */}
      <section className="journey-section">
        <div className="journey-text">
          <h2>Your Journey, Your Story</h2>
          <p>Every day brings new experiences worth remembering. Our digital diary helps you capture these moments with:</p>
          <ul className="journey-list">
            <li>
              <FaShieldAlt className="journey-icon" />
              Private and secure entries
            </li>
            <li>
              <FaCalendarAlt className="journey-icon" />
              Beautiful calendar view
            </li>
            <li>
              <FaHeart className="journey-icon" />
              Favorite memories collection
            </li>
          </ul>
        </div>
        <div className="journey-image">
          <img src={notebook} alt="Notebook" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
