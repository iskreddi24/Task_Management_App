// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { listDepartments } from "../api/departments";
import { listTasks } from "../api/tasks";
import { AuthContext } from "../context/AuthProvider";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function load() {
      try { setDepartments(await listDepartments()); } catch {}
      try { setTasks(await listTasks()); } catch {}
    }
    load();
  }, []);

  return (
    <div className="dashboard">
      {}
      <Sidebar />
      
      {}
      <div className="main">
        <Topbar />
        <div className="dashboard-content">
          <h1>Dashboard</h1>
          <p className="welcome">Welcome, {user?.username || "User"}</p>

          {}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Departments: {departments.length}</h3>
            </div>
            <div className="stat-card">
              <h3>Tasks: {tasks.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}