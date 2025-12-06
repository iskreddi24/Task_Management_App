import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../api/axios";

export default function Health() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    api.get("/health").then(r => setStatus(r.data)).catch(e => setStatus("Error: " + e.message));
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="dashboard-content">
          <h2>Health Check</h2>
          <pre>{status}</pre>
        </div>
      </div>
    </div>
  );
}
