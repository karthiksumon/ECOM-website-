import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(() => Boolean(localStorage.getItem("token") || sessionStorage.getItem("token")));
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuthState = () => {
      setIsSignedIn(Boolean(localStorage.getItem("token") || sessionStorage.getItem("token")));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);

    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsSignedIn(false);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="site-nav">
      <Link to="/" className="site-nav__logo">
        GadgetDom
      </Link>

      <button
        type="button"
        className="site-nav__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="site-nav__bar"></span>
        <span className="site-nav__bar"></span>
        <span className="site-nav__bar"></span>
      </button>

      <div className={`site-nav__links ${isOpen ? "site-nav__links--open" : ""}`}>
        
        {isSignedIn ? null : (
          <>
            <Link to="/login" className="site-nav__link" onClick={() => setIsOpen(false)}>Sign In</Link>
            <Link to="/signup" className="site-nav__link site-nav__link--cta" onClick={() => setIsOpen(false)}>Sign Up</Link>
          </>
        )}
        {isSignedIn ? (
          <button type="button" className="site-nav__logout" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
