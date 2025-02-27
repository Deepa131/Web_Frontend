import React, { useState } from "react";
import "../../styles/Contact.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
        <Navbar />
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Send us a message.</p>
        {submitted && (
          <p className="success-message">Your message has been sent successfully!</p>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
