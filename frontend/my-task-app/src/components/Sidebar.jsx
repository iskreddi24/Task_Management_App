// // Sidebar.jsx
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FaHome, FaUsers, FaBuilding, FaChartBar, FaTasks } from "react-icons/fa";
// import "../styles/sidebar.css";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   // Use a class to determine if it's a mobile screen to simplify state logic
//   const isMobile = () => window.innerWidth <= 768;

//   useEffect(() => {
//     const handleResize = () => {
//       // On large screens, set to open (default desktop state)
//       if (window.innerWidth > 768) {
//         setOpen(true);
//         // Ensure body class is removed for desktop layout
//         document.body.classList.remove("sidebar-closed-desktop");
//         document.body.classList.remove("sidebar-open-mobile");
//       } else {
//         // On mobile, set to closed initially
//         setOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Set initial state

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Use a separate effect to manage the desktop 'collapsed' state
//   const handleToggle = () => {
//     if (isMobile()) {
//       // Mobile: Toggle the state, Topbar handles the body class via the hamburger button
//       setOpen(!open);
//     } else {
//       // Desktop: Toggle a class on the body to shift the main content
//       document.body.classList.toggle("sidebar-closed-desktop");
//       setOpen(!open);
//     }
//   };

//   // This function is passed to Topbar to allow the hamburger button to toggle the mobile view
//   if (!window.globalSidebarToggle) {
//     window.globalSidebarToggle = handleToggle;
//   }

//   const handleNavLinkClick = () => {
//     if (isMobile()) {
//       // Close the sidebar when a link is clicked on mobile
//       document.body.classList.remove("sidebar-open-mobile");
//       setOpen(false);
//     }
//   };

//   // The sidebar state logic is slightly different from the previous attempt
//   // On mobile, we rely on the CSS class applied to <body> to show/hide
//   // On desktop, the state controls the visual collapse
//   const sidebarClass = isMobile()
//     ? (document.body.classList.contains("sidebar-open-mobile") ? "open" : "closed") // Use body class for mobile
//     : (open ? "open" : "collapsed"); // Use component state for desktop

//   return (
//     // Note: The `open` state is primarily used to control the visual collapse on DESKTOP
//     // On MOBILE, we rely on the `sidebar-open-mobile` class on the body, toggled by the Topbar button.
//     <nav className={`sidebar ${sidebarClass}`}>
//       <div className="sidebar-brand">
//         <h1 className="brand-title">
//           <span className="logo-sri">SRI</span>
//           <span className="logo-balaji"> BALAJI </span>
//           <span className="logo-ads">ADS</span>
//         </h1>
//       </div>


//       <ul>
//         <li>
//           <NavLink to="/dashboard" onClick={handleNavLinkClick}>
//             <FaHome /> <span className="link-text">Dashboard</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/users" onClick={handleNavLinkClick}>
//             <FaUsers /> <span className="link-text">Employees</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/departments" onClick={handleNavLinkClick}>
//             <FaBuilding /> <span className="link-text">Departments</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/reports" onClick={handleNavLinkClick}>
//             <FaChartBar /> <span className="link-text">Reports</span>
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/tasks" onClick={handleNavLinkClick}>
//             <FaTasks /> <span className="link-text">Tasks</span>
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }
// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaUsers, 
  FaBuilding, 
  FaChartBar, 
  FaTasks, 
  FaTimes 
} from "react-icons/fa";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(true);
        document.body.classList.remove("sidebar-open-mobile");
        document.body.classList.remove("sidebar-closed-desktop");
      } else {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape" && isMobile()) {
        closeMobileSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEsc);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const toggleSidebar = () => {
    if (isMobile()) {
      document.body.classList.toggle("sidebar-open-mobile");
      setOpen(prev => !prev);
    } else {
      document.body.classList.toggle("sidebar-closed-desktop");
      setOpen(prev => !prev);
    }
  };

  // expose toggle to Topbar
  if (!window.globalSidebarToggle) {
    window.globalSidebarToggle = toggleSidebar;
  }

  const closeMobileSidebar = () => {
    document.body.classList.remove("sidebar-open-mobile");
    setOpen(false);
  };

  const handleNavLinkClick = () => {
    if (isMobile()) {
      closeMobileSidebar();
    }
  };

  const sidebarClass = isMobile()
    ? document.body.classList.contains("sidebar-open-mobile")
      ? "open"
      : "closed"
    : open
    ? "open"
    : "collapsed";

  return (
    <>
      {/* Mobile overlay for outside click */}
      {isMobile() && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      <nav className={`sidebar ${sidebarClass}`}>
        {/* Mobile header */}
        <div className="sidebar-mobile-header">
          <h1 className="brand-title">
            <span className="logo-sri">SRI</span>
            <span className="logo-balaji"> BALAJI </span>
            <span className="logo-ads">ADS</span>
          </h1>

          <button
            className="sidebar-close-btn"
            onClick={closeMobileSidebar}
          >
            <FaTimes />
          </button>
        </div>

        {/* Desktop brand */}
        <div className="sidebar-brand desktop-only">
          <h1 className="brand-title">
            <span className="logo-sri">SRI</span>
            <span className="logo-balaji"> BALAJI </span>
            <span className="logo-ads">ADS</span>
          </h1>
        </div>

        <ul>
          <li>
            <NavLink to="/dashboard" onClick={handleNavLinkClick}>
              <FaHome />
              <span className="link-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" onClick={handleNavLinkClick}>
              <FaUsers />
              <span className="link-text">Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" onClick={handleNavLinkClick}>
              <FaBuilding />
              <span className="link-text">Departments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" onClick={handleNavLinkClick}>
              <FaChartBar />
              <span className="link-text">Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" onClick={handleNavLinkClick}>
              <FaTasks />
              <span className="link-text">Tasks</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
