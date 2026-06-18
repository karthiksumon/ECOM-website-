
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsOpen(false);
    navigate("/login");
  };

  // Inline Style Objects
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "rgb(13, 4, 42)", 
      boxShadow: "0 2px 4px rgb(0, 0, 0)",
      fontFamily: "sans-serif",
      position: "relative",
      borderRadius:"5px",
      margin:"5px",
    },
    logo: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#ffffff",
      textDecoration: "none",
    },
    menuToggle: {
      display: "none", // Managed by media queries in pure CSS, handled structural logic below
      flexDirection: "column",
      gap: "5px",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    bar: {
      width: "25px",
      height: "3px",
      backgroundColor: "#ffffff",
      borderRadius: "2px",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      textDecoration: "none",
      color: "#a8b0ec",
      fontSize: "15px",
      fontWeight: "600",
      
    },
    btnLink: {
      textDecoration: "none",
      backgroundColor: "#3154df",
      color: "#a5adec",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "15px",
      fontWeight: "600",
    },
    logoutButton: {
      border: "1px solid rgba(165, 173, 236, 0.35)",
      backgroundColor: "transparent",
      color: "#ffffff",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
    },
   
  };

  // Simplistic fallback logic for window dimensions in React state could be applied, 
  // but for clean implementation this presents regular desktop flex + optional menu dropdown.
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        
      </Link>

      {/* Hamburger Icon for Mobile Displays */}
      <button 
        style={{...styles.menuToggle, display: window.innerWidth <= 768 ? "flex" : "none"}} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={styles.bar}></span>
        <span style={styles.bar}></span>
        <span style={styles.bar}></span>
      </button>

      {/* Navigation Links */}
      <div style={window.innerWidth <= 768 && isOpen ? styles.mobileLinks : (window.innerWidth <= 768 ? {display: "none"} : styles.navLinks)}>
        <Link to="/" style={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/login" style={styles.link} onClick={() => setIsOpen(false)}>Sign In</Link>
        <Link to="/signup" style={styles.btnLink} onClick={() => setIsOpen(false)}>Sign Up</Link>
        <button type="button" style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
