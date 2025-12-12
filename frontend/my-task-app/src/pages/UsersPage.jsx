


// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { listUsers, createUser, deleteUser } from "../api/users";
// import { listDepartments } from "../api/departments";
// import { AuthContext } from "../context/AuthProvider";
// import { toast } from "react-toastify";
// import { RiDeleteBinLine } from "react-icons/ri";

// import "../styles/users.css";

// /* ---------------------------------------------------------------------
//    ⭐ CUSTOM CONFIRMATION POPUP COMPONENT
// ------------------------------------------------------------------------ */
// function ConfirmPopup({ open, title, message, onConfirm, onCancel }) {
//     if (!open) return null;

//     return (
//         <div className="popup-overlay">
//             <div className="popup-box">
//                 <h3 className="popup-title">{title}</h3>
//                 <p className="popup-message">{message}</p>

//                 <div className="popup-actions">
//                     <button className="btn btn-cancel" onClick={onCancel}>
//                         Cancel
//                     </button>
//                     <button className="btn btn-danger" onClick={onConfirm}>
//                         Yes, Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ---------------------------------------------------------------------
//    ⭐ MAIN USERS PAGE
// ------------------------------------------------------------------------ */
// export default function UsersPage() {
//     const { user } = useContext(AuthContext);

//     const [users, setUsers] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [search, setSearch] = useState("");

//     const [showForm, setShowForm] = useState(false);

//     const [confirmPopup, setConfirmPopup] = useState({
//         open: false,
//         userId: null,
//     });

//     const [form, setForm] = useState({
//         username: "",
//         email: "",
//         password: "",
//         role: "EMPLOYEE",
//         departmentId: ""
//     });

//     useEffect(() => {
//         async function load() {
//             try {
//                 const usersData = await listUsers();
//                 const depsData = await listDepartments();

//                 setDepartments(depsData);
//                 setUsers(usersData);
//             } catch (e) {
//                 console.error("Loading failed", e);
//                 toast.error("Failed to load users");
//             }
//         }
//         load();
//     }, []);

//     // 🔍 FILTER USERS
//     const filteredUsers = Array.isArray(users)
//         ? users
//             .filter((u) => u.role !== "SUPER_ADMIN")
//             .filter(
//                 (u) =>
//                     u.username.toLowerCase().includes(search.toLowerCase()) ||
//                     u.email.toLowerCase().includes(search.toLowerCase()) ||
//                     (u.departmentName || "—")
//                         .toLowerCase()
//                         .includes(search.toLowerCase())
//             )
//         : [];

//     // ➕ CREATE USER
//     const handleCreate = async (e) => {
//         e.preventDefault();

//         if (!form.departmentId) {
//             toast.error("Please select a department");
//             return;
//         }

//         try {
//             await createUser(form);
//             toast.success("User created successfully!");

//             setForm({
//                 username: "",
//                 email: "",
//                 password: "",
//                 role: "EMPLOYEE",
//                 departmentId: ""
//             });

//             const usersData = await listUsers();
//             const depsData = await listDepartments();
//             setDepartments(depsData);
//             setUsers(usersData);

//         } catch (err) {
//             console.error("Create user error:", err);
//             toast.error(err.response?.data || "Error creating user");
//         }
//     };

//     /* Delete user handlers */
//     const openDeletePopup = (id) => {
//         setConfirmPopup({ open: true, userId: id });
//     };

//     const closeDeletePopup = () => {
//         setConfirmPopup({ open: false, userId: null });
//     };

//     const confirmDelete = async () => {
//         const id = confirmPopup.userId;
//         try {
//             await deleteUser(id);
//             toast.success("User deleted successfully.");

//             closeDeletePopup();
//             setUsers(await listUsers());
//         } catch (err) {
//             console.error("Delete user error:", err);
//             toast.error(err.response?.data || "Delete error");
//         }
//     };

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <div className="main">
//                 <Topbar />

//                 <div className="dashboard-content">

//                     <div className="page-header">
//                         <h2 className="page-title">User Management</h2>
//                         <p className="page-subtitle">
//                             Administer users, assign roles, and allocate departments.
//                         </p>
//                     </div>

//                     {/* ⭐ EMPLOYEE cannot create users */}
//                     {user?.role !== "EMPLOYEE" && (
//                         <button
//                             className="btn btn-primary"
//                             style={{ marginBottom: "20px" }}
//                             onClick={() => setShowForm(!showForm)}
//                         >
//                             {showForm ? "Close Form" : "Create User"}
//                         </button>
//                     )}

//                     <div className="users-layout">

//                         {/* ⭐ EMPLOYEE cannot see the form */}
//                         {showForm && user?.role !== "EMPLOYEE" && (
//                             <div className="user-form-container">
//                                 <div className="card create-card">
//                                     <h3 className="card-title">Create New User Account</h3>

//                                     <form onSubmit={handleCreate} className="form-grid">

//                                         <div className="form-group">
//                                             <label>Full Name</label>
//                                             <input
//                                                 className="form-input"
//                                                 placeholder="e.g., Jane Smith"
//                                                 required
//                                                 value={form.username}
//                                                 onChange={(e) =>
//                                                     setForm({ ...form, username: e.target.value })
//                                                 }
//                                             />
//                                         </div>

//                                         <div className="form-group">
//                                             <label>Email Address</label>
//                                             <input
//                                                 className="form-input"
//                                                 type="email"
//                                                 placeholder="example@company.com"
//                                                 required
//                                                 value={form.email}
//                                                 onChange={(e) =>
//                                                     setForm({ ...form, email: e.target.value })
//                                                 }
//                                             />
//                                         </div>

//                                         <div className="form-group">
//                                             <label>Initial Password</label>
//                                             <input
//                                                 className="form-input"
//                                                 type="password"
//                                                 required
//                                                 value={form.password}
//                                                 onChange={(e) =>
//                                                     setForm({ ...form, password: e.target.value })
//                                                 }
//                                             />
//                                         </div>

//                                         <div className="form-group">
//                                             <label>Role</label>
//                                             <select
//                                                 className="form-input"
//                                                 value={form.role}
//                                                 onChange={(e) =>
//                                                     setForm({ ...form, role: e.target.value })
//                                                 }
//                                             >
//                                                 <option value="EMPLOYEE">Employee</option>
//                                                 <option value="DEPT_HEAD">Department Head</option>
//                                             </select>
//                                         </div>

//                                         <div className="form-group">
//                                             <label>Department</label>
//                                             <select
//                                                 className="form-input"
//                                                 value={form.departmentId}
//                                                 onChange={(e) =>
//                                                     setForm({ ...form, departmentId: e.target.value })
//                                                 }
//                                             >
//                                                 <option value="">— Select Department —</option>

//                                                 {departments.map((d) => (
//                                                     <option key={d.id} value={d.id}>
//                                                         {d.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         <button type="submit" className="btn btn-primary btn-block">
//                                             ➕ Create User
//                                         </button>
//                                     </form>
//                                 </div>
//                             </div>
//                         )}

//                         {/* ⭐ USERS TABLE */}
//                         <div className="user-table-container">
//                             <div className="card table-card">

//                                 <div className="table-card-header">
//                                     <h3 className="card-title">
//                                         Active Users ({filteredUsers.length})
//                                     </h3>

//                                     <div className="search-wrapper">
//                                         <input
//                                             type="text"
//                                             placeholder="Search by name, email, or department..."
//                                             className="form-input search-input"
//                                             value={search}
//                                             onChange={(e) => setSearch(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive">
//                                     <table className="data-table">
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Name</th>
//                                                 <th>Email</th>
//                                                 <th>Role</th>
//                                                 <th>Department</th>
//                                                 <th>Actions</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {filteredUsers.length > 0 ? (
//                                                 filteredUsers.map((u) => (
//                                                     <tr key={u.id}>
//                                                         <td>{u.id}</td>
//                                                         <td>{u.username}</td>
//                                                         <td>{u.email}</td>

//                                                         <td>
//                                                             <span
//                                                                 className={`role-tag role-${u.role
//                                                                     .toLowerCase()
//                                                                     .replace("_", "-")}`}
//                                                             >
//                                                                 {u.role.replace("_", " ")}
//                                                             </span>
//                                                         </td>

//                                                         <td>
//                                                             <span className="dept-tag">
//                                                                 {u.departmentName || "—"}
//                                                             </span>
//                                                         </td>

//                                                         <td>
//                                                             {/* ⭐ EMPLOYEE cannot delete users */}
//                                                             {user?.role !== "EMPLOYEE" && (
//                                                                 <button
//                                                                     className="btn-icon btn-delete"
//                                                                     onClick={() => openDeletePopup(u.id)}
//                                                                 >
//                                                                     <RiDeleteBinLine />
//                                                                 </button>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="text-center">
//                                                         No users found.
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>

//                 </div>
//             </div>

//             {/* DELETE CONFIRM POPUP */}
//             <ConfirmPopup
//                 open={confirmPopup.open}
//                 title="Delete User?"
//                 message="Are you sure you want to delete this user? This action cannot be undone."
//                 onConfirm={confirmDelete}
//                 onCancel={closeDeletePopup}
//             />
//         </div>
//     );
// }



import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { listUsers, createUser, deleteUser, updateUserStatus } from "../api/users";
import { listDepartments } from "../api/departments";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaLock, FaUnlock } from "react-icons/fa";

import "../styles/users.css";

/* =========================================================
   CONFIRM POPUP
========================================================= */
function ConfirmPopup({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>
        <div className="popup-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE / TABLET USER CARD (click to expand)
========================================================= */
function UserCard({ user, canDelete, onDelete, onToggleStatus, isSuperAdmin }) {
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      className={`user-card clickable ${!user.active ? "inactive-user" : ""}`}
      onClick={handleCardClick}
    >
      <div className="user-card-header">
        <strong>{user.username}</strong>

        {/* stopPropagation so clicks on icons don't toggle the card */}
        <div
          className="card-actions"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isSuperAdmin && user.role !== "SUPER_ADMIN" && (
            <button
              className={`btn-icon ${user.active ? "danger" : "success"}`}
              title={user.active ? "Deactivate User" : "Activate User"}
              onClick={() => onToggleStatus(user.id, user.active)}
            >
              {user.active ? <FaLock /> : <FaUnlock />}
            </button>
          )}

          {canDelete && (
            <button
              className="btn-icon danger"
              title="Delete User"
              onClick={() => onDelete(user.id)}
            >
              <RiDeleteBinLine />
            </button>
          )}
        </div>
      </div>

      <div className="user-meta">
        <div>
          <span>Email</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>Role</span>
          <span className={`role-tag role-${user.role.toLowerCase().replace("_", "-")}`}>
            {user.role.replace("_", " ")}
          </span>
        </div>
        <div>
          <span>Status</span>
          <span className={`status-tag ${user.active ? "active" : "inactive"}`}>
            {user.active ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="user-expanded">
          <div className="preview-row">
            <span>ID</span>
            <strong>{user.id}</strong>
          </div>
          <div className="preview-row">
            <span>Department</span>
            <strong>{user.departmentName || "—"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */
export default function UsersPage() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    userId: null,
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    departmentId: "",
  });

  /* ---------- RESPONSIVE BREAKPOINTS (used to switch table/cards) ---------- */
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- FREEZE / UNFREEZE ---------- */
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await updateUserStatus(userId, !currentStatus);
      toast.success(currentStatus ? "User deactivated" : "User activated");
      setUsers(await listUsers());
    } catch (err) {
      toast.error(err.response?.data || "Status update failed");
    }
  };

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setUsers(await listUsers());
        setDepartments(await listDepartments());
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ---------- FILTER ---------- */
  const filteredUsers = users
    .filter((u) => u.role !== "SUPER_ADMIN")
    .filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.departmentName || "").toLowerCase().includes(search.toLowerCase())
    );

  /* ---------- CREATE ---------- */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.departmentId) {
      toast.error("Select department");
      return;
    }

    try {
      await createUser(form);
      toast.success("User created");
      setForm({
        username: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
        departmentId: "",
      });
      setShowForm(false);
      setUsers(await listUsers());
    } catch (err) {
      toast.error(err.response?.data || "Create failed");
    }
  };

  /* ---------- DELETE ---------- */
  const openDelete = (id) => setConfirmPopup({ open: true, userId: id });
  const closeDelete = () => setConfirmPopup({ open: false, userId: null });

  const confirmDelete = async () => {
    try {
      await deleteUser(confirmPopup.userId);
      toast.success("User deleted");
      closeDelete();
      setUsers(await listUsers());
    } catch (err) {
      toast.error(err.response?.data || "Delete failed");
    }
  };

  /* ========================================================= */
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="dashboard-content">
          <div className="page-header">
            <h2 className="page-title">User Management</h2>
            <p className="page-subtitle">
              Manage users, roles and department allocations.
            </p>
          </div>

          {/* CREATE BUTTON */}
          {user?.role !== "EMPLOYEE" && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "Create User"}
            </button>
          )}

          {/* FORM */}
          {showForm && user?.role !== "EMPLOYEE" && (
            <div className="card create-card">
              <h3 className="card-title">Create User</h3>
              <form onSubmit={handleCreate} className="form-grid">
                <input
                  className="form-input"
                  placeholder="Name"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <select
                  className="form-input"
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="DEPT_HEAD">Department Head</option>
                </select>
                <select
                  className="form-input"
                  value={form.departmentId}
                  onChange={(e) =>
                    setForm({ ...form, departmentId: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          )}

          {/* SEARCH */}
          <input
            className="form-input search-input"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* LOADING */}
          {loading && <div className="loading-box">Loading users…</div>}

          {/* DESKTOP TABLE */}
          {!loading && !isTablet && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className={!u.active ? "inactive-user" : ""}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`role-tag role-${u.role
                          .toLowerCase()
                          .replace("_", "-")}`}
                      >
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td>{u.departmentName || "—"}</td>
                    <td>
                      {user?.role === "SUPER_ADMIN" && u.role !== "SUPER_ADMIN" && (
                        <div className="table-actions">
                          <button
                            className={`btn-icon ${
                              u.active ? "danger" : "success"
                            }`}
                            title={
                              u.active ? "Deactivate User" : "Activate User"
                            }
                            onClick={() => toggleUserStatus(u.id, u.active)}
                          >
                            {u.active ? <FaLock /> : <FaUnlock />}
                          </button>

                          <button
                            className="btn-icon danger"
                            title="Delete User"
                            onClick={() => openDelete(u.id)}
                          >
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* MOBILE / TABLET CARDS */}
          {!loading && isTablet && (
            <div className="user-cards-grid">
              {filteredUsers.map((u) => (
                <UserCard
                  key={u.id}
                  user={u}
                  canDelete={user?.role === "SUPER_ADMIN"}
                  onDelete={openDelete}
                  onToggleStatus={toggleUserStatus}
                  isSuperAdmin={user?.role === "SUPER_ADMIN"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmPopup
        open={confirmPopup.open}
        title="Delete User?"
        message="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
}




// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { listUsers, createUser, deleteUser } from "../api/users";
// import { listDepartments } from "../api/departments";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { updateUserStatus } from "../api/users";
// import { FaLock, FaUnlock } from "react-icons/fa";

// import "../styles/users.css";

// /* =========================================================
//    CONFIRM POPUP
// ========================================================= */
// function ConfirmPopup({ open, title, message, onConfirm, onCancel }) {
//   if (!open) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <h3 className="popup-title">{title}</h3>
//         <p className="popup-message">{message}</p>
//         <div className="popup-actions">
//           <button className="btn btn-cancel" onClick={onCancel}>
//             Cancel
//           </button>
//           <button className="btn btn-danger" onClick={onConfirm}>
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MOBILE / TABLET USER CARD
// ========================================================= */
// function UserCard({ user, canDelete, onDelete, onToggleStatus, isSuperAdmin }) {
//   return (
//     <div className={`user-card ${!user.active ? "inactive-user" : ""}`}>
//       <div className="user-card-header">
//         <strong>{user.username}</strong>

//         <div className="card-actions">
//           {isSuperAdmin && user.role !== "SUPER_ADMIN" && (
//             <button
//               className="btn-icon"
//               onClick={() => onToggleStatus(user.id, user.active)}
//             >
//               {user.active ? <FaLock /> : <FaUnlock />}
//             </button>
//           )}

//           {canDelete && (
//             <button className="btn-icon" onClick={() => onDelete(user.id)}>
//               <RiDeleteBinLine />
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="user-meta">
//         <div><span>Email</span><span>{user.email}</span></div>
//         <div>
//           <span>Role</span>
//           <span className={`role-tag role-${user.role.toLowerCase().replace("_", "-")}`}>
//             {user.role.replace("_", " ")}
//           </span>
//         </div>
//         <div>
//           <span>Status</span>
//           <span className={`status-tag ${user.active ? "active" : "inactive"}`}>
//             {user.active ? "ACTIVE" : "INACTIVE"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


// /* =========================================================
//    MAIN PAGE
// ========================================================= */
// export default function UsersPage() {
//   const { user } = useContext(AuthContext);

//   const [users, setUsers] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [confirmPopup, setConfirmPopup] = useState({
//     open: false,
//     userId: null,
//   });

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "EMPLOYEE",
//     departmentId: "",
//   });
//   /* ---------- FREEZE / UNFREEZE ---------- */
//   const toggleUserStatus = async (userId, currentStatus) => {
//     try {
//       await updateUserStatus(userId, !currentStatus);
//       toast.success(
//         !currentStatus ? "User activated" : "User deactivated"
//       );
//       setUsers(await listUsers());
//     } catch (err) {
//       toast.error(err.response?.data || "Status update failed");
//     }
//   };

//   /* ---------- RESPONSIVE BREAKPOINTS ---------- */
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

//   useEffect(() => {
//     const resize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth < 1024);
//     };
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   /* ---------- LOAD DATA ---------- */
//   useEffect(() => {
//     async function load() {
//       try {
//         setLoading(true);
//         setUsers(await listUsers());
//         setDepartments(await listDepartments());
//       } catch {
//         toast.error("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   /* ---------- FILTER ---------- */
//   const filteredUsers = users
//     .filter((u) => u.role !== "SUPER_ADMIN")
//     .filter(
//       (u) =>
//         u.username.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase()) ||
//         (u.departmentName || "").toLowerCase().includes(search.toLowerCase())
//     );

//   /* ---------- CREATE ---------- */
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     if (!form.departmentId) {
//       toast.error("Select department");
//       return;
//     }

//     try {
//       await createUser(form);
//       toast.success("User created");
//       setForm({ username: "", email: "", password: "", role: "EMPLOYEE", departmentId: "" });
//       setShowForm(false);
//       setUsers(await listUsers());
//     } catch (err) {
//       toast.error(err.response?.data || "Create failed");
//     }
//   };

//   /* ---------- DELETE ---------- */
//   const openDelete = (id) => setConfirmPopup({ open: true, userId: id });
//   const closeDelete = () => setConfirmPopup({ open: false, userId: null });

//   const confirmDelete = async () => {
//     try {
//       await deleteUser(confirmPopup.userId);
//       toast.success("User deleted");
//       closeDelete();
//       setUsers(await listUsers());
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   /* ========================================================= */
//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main">
//         <Topbar />

//         <div className="dashboard-content">
//           <div className="page-header">
//             <h2 className="page-title">User Management</h2>
//             <p className="page-subtitle">
//               Manage users, roles and department allocations.
//             </p>
//           </div>

//           {/* CREATE BUTTON */}
//           {user?.role !== "EMPLOYEE" && (
//             <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//               {showForm ? "Close Form" : "Create User"}
//             </button>
//           )}

//           {/* FORM */}
//           {showForm && user?.role !== "EMPLOYEE" && (
//             <div className="card create-card">
//               <h3 className="card-title">Create User</h3>
//               <form onSubmit={handleCreate} className="form-grid">
//                 <input className="form-input" placeholder="Name" required
//                   value={form.username}
//                   onChange={(e) => setForm({ ...form, username: e.target.value })}
//                 />
//                 <input className="form-input" type="email" placeholder="Email" required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//                 <input className="form-input" type="password" placeholder="Password" required
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//                 <select className="form-input"
//                   value={form.role}
//                   onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 >
//                   <option value="EMPLOYEE">Employee</option>
//                   <option value="DEPT_HEAD">Department Head</option>
//                 </select>
//                 <select className="form-input"
//                   value={form.departmentId}
//                   onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((d) => (
//                     <option key={d.id} value={d.id}>{d.name}</option>
//                   ))}
//                 </select>
//                 <button className="btn btn-primary">Create</button>
//               </form>
//             </div>
//           )}

//           {/* SEARCH */}
//           <input
//             className="form-input search-input"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* LOADING */}
//           {loading && <div className="loading-box">Loading users…</div>}

//           {/* DESKTOP TABLE */}
//           {!loading && !isTablet && (
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th />
//                 </tr>
//               </thead>
//         <tbody>
//   {filteredUsers.map((u) => (
//     <tr key={u.id} className={!u.active ? "inactive-user" : ""}>
//       <td>{u.id}</td>
//       <td>{u.username}</td>
//       <td>{u.email}</td>

//       <td>
//         <span className={`role-tag role-${u.role.toLowerCase().replace("_", "-")}`}>
//           {u.role.replace("_", " ")}
//         </span>
//       </td>

//       <td>{u.departmentName || "—"}</td>

//       <td>
//         {user?.role === "SUPER_ADMIN" && u.role !== "SUPER_ADMIN" && (
//           <button
//             className={`btn-icon ${u.active ? "danger" : "success"}`}
//             title={u.active ? "Deactivate User" : "Activate User"}
//             onClick={() => toggleUserStatus(u.id, u.active)}
//           >
//             {u.active ? <FaLock /> : <FaUnlock />}
//           </button>
//         )}
//       </td>
//     </tr>
//   ))}
// </tbody>

//             </table>
//           )}

//           {/* MOBILE / TABLET CARDS */}
//           {!loading && isTablet && (
//             <div className="user-cards-grid">
//               {filteredUsers.map((u) => (
//                 <UserCard
//                   key={u.id}
//                   user={u}
//                   canDelete={user?.role !== "EMPLOYEE"}
//                   onDelete={openDelete}
//                   onToggleStatus={toggleUserStatus}
//                   isSuperAdmin={user?.role === "SUPER_ADMIN"}
//                 />

//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <ConfirmPopup
//         open={confirmPopup.open}
//         title="Delete User?"
//         message="This action cannot be undone."
//         onConfirm={confirmDelete}
//         onCancel={closeDelete}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { listUsers, createUser, deleteUser } from "../api/users";
// import { listDepartments } from "../api/departments";
// import { AuthContext } from "../context/AuthProvider";
// import { toast } from "react-toastify";
// import { RiDeleteBinLine } from "react-icons/ri";

// import "../styles/users.css";

// /* =========================================================
//    CONFIRM POPUP (UNCHANGED)
// ========================================================= */
// function ConfirmPopup({ open, title, message, onConfirm, onCancel }) {
//   if (!open) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <h3 className="popup-title">{title}</h3>
//         <p className="popup-message">{message}</p>
//         <div className="popup-actions">
//           <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
//           <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    USER PREVIEW POPUP (NEW FEATURE)
// ========================================================= */
// function UserPreviewPopup({ user, onClose }) {
//   if (!user) return null;

//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="user-preview-box" onClick={(e) => e.stopPropagation()}>
//         <h3>User Details</h3>

//         <div className="preview-row">
//           <span>Name</span>
//           <strong>{user.username}</strong>
//         </div>

//         <div className="preview-row">
//           <span>Email</span>
//           <strong>{user.email}</strong>
//         </div>

//         <div className="preview-row">
//           <span>Role</span>
//           <span className={`role-tag role-${user.role.toLowerCase().replace("_", "-")}`}>
//             {user.role.replace("_", " ")}
//           </span>
//         </div>

//         <div className="preview-row">
//           <span>Department</span>
//           <span className="dept-tag">{user.departmentName || "—"}</span>
//         </div>

//         <div className="popup-actions mt">
//           <button className="btn btn-primary" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    USER CARD (MOBILE / TABLET)
// ========================================================= */
// function UserCard({ user, canDelete, onDelete, onPreview }) {
//   return (
//     <div className="user-card clickable" onClick={() => onPreview(user)}>
//       <div className="user-card-header">
//         <strong>{user.username}</strong>

//         {canDelete && (
//           <button
//             className="btn-icon"
//             onClick={(e) => {
//               e.stopPropagation(); // ✅ prevents preview
//               onDelete(user.id);
//             }}
//           >
//             <RiDeleteBinLine />
//           </button>
//         )}
//       </div>

//       <div className="user-meta">
//         <div><span>Email</span><span>{user.email}</span></div>
//         <div>
//           <span>Role</span>
//           <span className={`role-tag role-${user.role.toLowerCase().replace("_", "-")}`}>
//             {user.role.replace("_", " ")}
//           </span>
//         </div>
//         <div>
//           <span>Department</span>
//           <span className="dept-tag">{user.departmentName || "—"}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN PAGE
// ========================================================= */
// export default function UsersPage() {
//   const { user } = useContext(AuthContext);

//   const [users, setUsers] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [previewUser, setPreviewUser] = useState(null);
//   const [confirmPopup, setConfirmPopup] = useState({ open: false, userId: null });

//   const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

//   useEffect(() => {
//     const resize = () => setIsTablet(window.innerWidth < 1024);
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setUsers(await listUsers());
//         setDepartments(await listDepartments());
//       } catch {
//         toast.error("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const filteredUsers = users
//     .filter((u) => u.role !== "SUPER_ADMIN")
//     .filter(
//       (u) =>
//         u.username.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase()) ||
//         (u.departmentName || "").toLowerCase().includes(search.toLowerCase())
//     );

//   const openDelete = (id) => setConfirmPopup({ open: true, userId: id });

//   const confirmDelete = async () => {
//     try {
//       await deleteUser(confirmPopup.userId);
//       toast.success("User deleted");
//       setConfirmPopup({ open: false, userId: null });
//       setUsers(await listUsers());
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   /* ========================================================= */
//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main">
//         <Topbar />

//         <div className="dashboard-content">
//           <h2>User Management</h2>

//           <input
//             className="form-input search-input"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {/* ✅ DESKTOP TABLE WITH DELETE RESTORED */}
//           {!loading && !isTablet && (
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Department</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredUsers.map((u) => (
//                   <tr key={u.id}>
//                     <td onClick={() => setPreviewUser(u)} style={{ cursor: "pointer" }}>
//                       {u.username}
//                     </td>
//                     <td>{u.email}</td>
//                     <td>{u.role}</td>
//                     <td>{u.departmentName}</td>
//                     <td>
//                       {user?.role !== "EMPLOYEE" && (
//                         <button
//                           className="btn-icon"
//                           onClick={() => openDelete(u.id)}
//                         >
//                           <RiDeleteBinLine />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* ✅ MOBILE / TABLET CARDS */}
//           {!loading && isTablet && (
//             <div className="user-cards-grid">
//               {filteredUsers.map((u) => (
//                 <UserCard
//                   key={u.id}
//                   user={u}
//                   canDelete={user?.role !== "EMPLOYEE"}
//                   onDelete={openDelete}
//                   onPreview={setPreviewUser}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <ConfirmPopup
//         open={confirmPopup.open}
//         title="Delete User?"
//         message="This action cannot be undone."
//         onConfirm={confirmDelete}
//         onCancel={() => setConfirmPopup({ open: false, userId: null })}
//       />

//       <UserPreviewPopup
//         user={previewUser}
//         onClose={() => setPreviewUser(null)}
//       />
//     </div>
//   );
// }
