import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/About.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="highlight">Diginote</span>
        </motion.h1>

        <motion.p
          className="about-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Diginote is your personal digital diary, designed to help you 
          document your thoughts, track your moods, and cherish your 
          favorite moments. Our platform ensures a secure and 
          interactive journaling experience.
        </motion.p>

        <div className="features-section">
          <motion.div
            className="feature-box"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>✍️ Write Freely</h2>
            <p>Capture your thoughts and emotions with ease.</p>
          </motion.div>

          <motion.div
            className="feature-box"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>❤️ Favorite Moments</h2>
            <p>Save and revisit your most cherished memories.</p>
          </motion.div>

          <motion.div
            className="feature-box"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>📊 Mood Tracker</h2>
            <p>Analyze your moods over time to improve well-being.</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
