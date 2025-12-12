import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { getMyProfile } from "../api/users";
import "../styles/profile.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMyProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <div className="loading-box">Loading profile…</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="dashboard-content profile-page">
          <h2 className="page-title">My Profile</h2>

          <div className="profile-card">
            <div className="profile-row">
              <span>Name</span>
              <strong>{profile.username}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-row">
              <span>Role</span>
              <strong>{profile.role.replace("_", " ")}</strong>
            </div>

            <div className="profile-row">
              <span>Status</span>
              <strong>
                {profile.active ? "ACTIVE ✅" : "INACTIVE ❌"}
              </strong>
            </div>

            {profile.departmentName && (
              <div className="profile-row">
                <span>Department</span>
                <strong>{profile.departmentName}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
