// Topbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaSignOutAlt, FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/topbar.css";

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleMenuToggle = () => {
    if (window.innerWidth <= 768) {
      document.body.classList.toggle("sidebar-open-mobile");
    } else if (window.globalSidebarToggle) {
      window.globalSidebarToggle();
    } else {
      document.body.classList.toggle("sidebar-closed-desktop");
    }
  };

  /* ✅ Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <button className="menu-toggle" onClick={handleMenuToggle}>
          <FaBars />
        </button>

        <div className="user-info">
          <div className="username">{user?.username || "User"}</div>
          <div className="user-role">{user?.role}</div>
        </div>
      </div>

      {/* CENTER (DESKTOP ONLY) */}
      <div className="topbar-center desktop-only">
        <Link to="/profile" className="topbar-link">My Profile</Link>
      </div>

      {/* RIGHT */}
      <div className="topbar-right" ref={dropdownRef}>
        {/* DESKTOP LOGOUT */}
        <button className="logout-btn desktop-only" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>

        {/* MOBILE DROPDOWN */}
        <button className="avatar-btn mobile-only" onClick={() => setOpen(!open)}>
          <FaUserCircle />
        </button>

        <div className={`mobile-dropdown ${open ? "show" : ""}`}>
          <Link to="/profile" onClick={() => setOpen(false)}>
            <FaUserCircle /> My Profile
          </Link>
          <button onClick={logout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
