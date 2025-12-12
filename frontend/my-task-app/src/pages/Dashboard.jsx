// Dashboard.jsx
import React, { useContext, useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { listDepartments } from "../api/departments";
import { listTasks } from "../api/tasks";
import { AuthContext } from "../context/AuthContext";
import "../styles/dashboard.css";
import { SOCKET_BASE_URL } from "../api/api";
// Import WebSocket Libraries
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);

  // State for Notifications
  const [notifications, setNotifications] = useState([]);

  // Ref to keep track of the connection so we don't connect twice
  const stompClientRef = useRef(null);

  const refreshData = async () => {
    try { setDepartments(await listDepartments()); } catch { }
    try { setTasks(await listTasks()); } catch { }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // WebSocket Connection Logic
  useEffect(() => {
    // 1. Safety Checks
    if (!user) return;
    if (stompClientRef.current && stompClientRef.current.connected) return; // Prevent double connection

    // 2. Initialize Connection
    const socket = new SockJS(`${SOCKET_BASE_URL}/ws`);
    const client = Stomp.over(socket);
    client.debug = null; // Turn off console logs

    client.connect(
      {},
      (frame) => {
        console.log("🟢 Connected to WebSocket");
        stompClientRef.current = client;

        // ============================================================
        // SUBCRIPTION 1: Private User Alerts
        // ============================================================
        if (user.id) {
          // Unsubscribe existing subscription if any (Cleanup)
          if (client.userSubscription) {
            client.userSubscription.unsubscribe();
          }

          client.userSubscription = client.subscribe(`/topic/user/${user.id}`, (message) => {
            const notif = JSON.parse(message.body);

            // Prevent Duplicate Toasts by ID (Optional safety)
            if (!toast.isActive(notif.taskId)) {
              toast.info(
                <div>
                  <strong>{notif.title}</strong>
                  <p>{notif.message}</p>
                </div>,
                { toastId: notif.taskId } // unique ID prevents duplicates
              );
            }

            setNotifications((prev) => {
              // 🛡️ Safety: If this Task ID is already in the list, ignore it.
              if (prev.some(n => n.taskId === notif.taskId)) {
                return prev;
              }
              // Otherwise, add it to the top
              return [notif, ...prev];
            }); refreshData();
          });
        }

        // ============================================================
        // SUBCRIPTION 2: Department Updates
        // ============================================================
        const deptId = user.department?.id || user.departmentId;
        if (deptId) {
          client.subscribe(`/topic/dept/${deptId}`, (message) => {
            refreshData();
          });
        }
      },
      (error) => {
        console.error("🔴 WebSocket Error:", error);
      }
    );

    // Cleanup: Disconnect when the user leaves the page
    return () => {
      if (client && client.connected) {
        client.disconnect();
        stompClientRef.current = null; // Clear the ref
      }
    };
  }, [user]);

  return (
    <div className="dashboard">
      <ToastContainer position="top-right" autoClose={5000} />

      <Sidebar />

      <div className="main">
        <Topbar />
        <div className="dashboard-content">
          <div className="header-flex">
            <div>
              <h1>Dashboard</h1>
              <p className="welcome">Welcome, {user?.username || "User"}</p>
            </div>

            <div className="connection-status">
              <span className="dot online"></span> Live Connected
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Departments: {departments.length}</h3>
            </div>
            <div className="stat-card">
              <h3>Tasks: {tasks.length}</h3>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="notifications-panel">
              <h3>🔔 Recent Alerts</h3>
              <ul className="notif-list">
                {notifications.map((n, index) => (
                  <li key={index} className={`notif-item ${n.type?.toLowerCase()}`}>
                    <span className="notif-time">{new Date(n.timestamp).toLocaleTimeString()}</span>
                    <div className="notif-text">
                      <strong>{n.title}</strong>
                      <span>{n.message}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}