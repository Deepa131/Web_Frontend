import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/images/logo-diginote.png';
import "../styles/NavbarFooter.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(user?.loggedIn || false);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={Logo} alt="DigiNote Logo" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><a onClick={() => navigate("/homepage")}>Home</a></li>
          <li><a onClick={() => navigate("/about")}>About</a></li>
          <li><a onClick={() => navigate("/my-entries")}>My Entries</a></li>
          <li><a onClick={() => navigate("/contact")}>Contact</a></li>
          {!isLoggedIn ? (
            <>
              <li><button className="btn" onClick={() => navigate("/login")}>Login</button></li>
              <li><button className="btn" onClick={() => navigate("/signup")}>Sign Up</button></li>
            </>
          ) : (
            <li><button className="btn logout" onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
