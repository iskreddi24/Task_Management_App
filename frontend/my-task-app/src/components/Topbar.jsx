// Topbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import "../styles/topbar.css";

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);

  const handleMenuToggle = () => {
    // Check screen size to determine if it's a mobile or desktop toggle
    if (window.innerWidth <= 768) {
      // Mobile toggle: Slide-out menu
      document.body.classList.toggle("sidebar-open-mobile");
    } else {
      // Desktop toggle: Collapse/Expand menu, also handled in Sidebar.jsx via global function
      if (window.globalSidebarToggle) {
          window.globalSidebarToggle();
      } else {
          // Fallback if the global function isn't set yet
          document.body.classList.toggle("sidebar-closed-desktop");
      }
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Hamburger/Menu Toggle Button */}
        <button className="menu-toggle" onClick={handleMenuToggle}>
          <FaBars />
        </button>

        {/* User Info Group */}
        <div className="user-info">
          <div className="username">{user?.username || "User"}</div>
          <div className="user-role">{user?.role || "USER"}</div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> <span className="logout-text">Logout</span>
      </button>
    </header>
  );
}