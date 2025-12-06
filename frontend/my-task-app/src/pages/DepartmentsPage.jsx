
// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// import {
//     listDepartments,
//     createDepartment,
//     assignDepartmentHead,
//     deleteDepartment,
//     getDepartmentUsers,
//     updateDepartment
// } from "../api/departments";

// import { listUsers } from "../api/users";
// import { AuthContext } from "../context/AuthProvider";
// import { toast } from "react-toastify";

// import "../styles/departments.css";
// import "../styles/tables.css";

// /* -----------------------------------------------------------
//    ⭐ REUSABLE CONFIRM POPUP COMPONENT
// ----------------------------------------------------------- */
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

// /* -----------------------------------------------------------
//    ⭐ DEPARTMENTS PAGE
// ----------------------------------------------------------- */
// export default function DepartmentsPage() {

//     const { user } = useContext(AuthContext);

//     const [deps, setDeps] = useState([]);
//     const [users, setUsers] = useState([]);

//     const [deptUsersMap, setDeptUsersMap] = useState({});

//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         headUserId: ""
//     });

//     const [showForm, setShowForm] = useState(false);

//     const [confirmPopup, setConfirmPopup] = useState({
//         open: false,
//         deptId: null,
//     });

//     const [editForm, setEditForm] = useState({
//         id: null,
//         name: "",
//         description: "",
//         headUserId: ""
//     });

//     const [showEditPopup, setShowEditPopup] = useState(false);

//     useEffect(() => {
//         async function load() {
//             try { setDeps(await listDepartments()); } catch { }
//             try { setUsers(await listUsers()); } catch { }
//         }
//         load();
//     }, []);

//     /* -----------------------------------------------------------
//         CREATE DEPARTMENT
//     ----------------------------------------------------------- */
//     const handleCreate = async (e) => {
//         e.preventDefault();

//         try {
//             await createDepartment({
//                 name: form.name,
//                 description: form.description,
//                 headUserId: form.headUserId || null,
//             });

//             toast.success("Department created successfully");

//             setForm({ name: "", description: "", headUserId: "" });
//             setDeps(await listDepartments());

//         } catch (err) {
//             toast.error(err.response?.data || "Error creating department");
//         }
//     };

//     /* -----------------------------------------------------------
//         UPDATE DEPARTMENT
//     ----------------------------------------------------------- */
//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await updateDepartment(editForm.id, {
//                 name: editForm.name,
//                 description: editForm.description,
//                 headUserId: editForm.headUserId || null
//             });

//             toast.success("Department updated successfully");
//             setShowEditPopup(false);

//             setDeps(await listDepartments());

//         } catch (err) {
//             toast.error(err.response?.data || "Update failed");
//         }
//     };

//     /* -----------------------------------------------------------
//         ASSIGN HEAD
//     ----------------------------------------------------------- */
//     const handleAssign = async (deptId, userId) => {
//         if (!userId) return;

//         try {
//             await assignDepartmentHead(deptId, userId);
//             toast.success("Department head assigned");

//             setDeps(await listDepartments());
//             setDeptUsersMap(prev => ({ ...prev, [deptId]: undefined }));

//         } catch (err) {
//             toast.error(err.response?.data || "Assign error");
//         }
//     };

//     /* -----------------------------------------------------------
//         DELETE DEPT
//     ----------------------------------------------------------- */
//     const openDeletePopup = (id) => {
//         setConfirmPopup({ open: true, deptId: id });
//     };

//     const closeDeletePopup = () => {
//         setConfirmPopup({ open: false, deptId: null });
//     };

//     const confirmDelete = async () => {
//         const id = confirmPopup.deptId;

//         try {
//             await deleteDepartment(id);
//             toast.success("Department deleted");

//             closeDeletePopup();
//             setDeps(await listDepartments());

//         } catch (err) {
//             toast.error(err.response?.data || "Delete failed");
//         }
//     };

//     /* -----------------------------------------------------------
//         LOAD USERS FOR DEPARTMENT
//     ----------------------------------------------------------- */
//     const loadDeptUsers = async (deptId) => {
//         try {
//             if (!deptUsersMap[deptId]) {
//                 const deptUsers = await getDepartmentUsers(deptId);
//                 setDeptUsersMap(prev => ({ ...prev, [deptId]: deptUsers }));
//             }
//         } catch {
//             toast.error("Failed to load department users");
//         }
//     };

//     /* -----------------------------------------------------------
//         RENDER UI
//     ----------------------------------------------------------- */
//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <div className="main">
//                 <Topbar />

//                 <div className="dashboard-content">
//                     <h2>Departments</h2>
//                     <p>Manage all your organization departments and team heads</p>

//                     {user?.role === "SUPER_ADMIN" && (
//                         <button
//                             className="btn btn-primary"
//                             style={{ marginBottom: "20px" }}
//                             onClick={() => setShowForm(!showForm)}
//                         >
//                             {showForm ? "Close Form" : "Create Department"}
//                         </button>
//                     )}

//                     <div className="departments-container">

//                         {/* ⭐ CREATE FORM */}
//                         {user?.role === "SUPER_ADMIN" && showForm && (
//                             <div className="card create-department-card">
//                                 <h3>Create Department</h3>

//                                 <form onSubmit={handleCreate}>
//                                     <input
//                                         placeholder="Department Name"
//                                         required
//                                         value={form.name}
//                                         onChange={(e) =>
//                                             setForm({ ...form, name: e.target.value })
//                                         }
//                                     />

//                                     <textarea
//                                         placeholder="Description (optional)"
//                                         value={form.description}
//                                         onChange={(e) =>
//                                             setForm({ ...form, description: e.target.value })
//                                         }
//                                     />

//                                     <button type="submit">Create</button>
//                                 </form>
//                             </div>
//                         )}

//                         {/* ⭐ DEPARTMENTS TABLE */}
//                         <div className="card all-departments-table">
//                             <h3>All Departments</h3>

//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Name</th>
//                                         <th>Head</th>
//                                         <th>Created</th>
//                                         <th>Assign Head</th>
//                                         <th>Edit</th>
//                                         <th>Delete</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     {deps?.length > 0 ? (
//                                         deps.map((d) => (
//                                             <tr key={d.id}>
//                                                 <td>{d.id}</td>
//                                                 <td>{d.name}</td>

//                                                 <td>
//                                                     {d.headUser
//                                                         ? `${d.headUser.username} (${d.headUser.role})`
//                                                         : "—"}
//                                                 </td>

//                                                 <td>
//                                                     {d.createdAt
//                                                         ? new Date(d.createdAt).toLocaleString()
//                                                         : "—"}
//                                                 </td>

//                                                 <td>
//                                                     {user?.role === "SUPER_ADMIN" && (
//                                                         <select
//                                                             defaultValue=""
//                                                             onClick={() => loadDeptUsers(d.id)}
//                                                             onChange={(e) =>
//                                                                 handleAssign(d.id, e.target.value)
//                                                             }
//                                                         >
//                                                             <option value="">Assign Head</option>

//                                                             {deptUsersMap[d.id]?.length > 0 &&
//                                                                 deptUsersMap[d.id]
//                                                                     .filter(u =>
//                                                                         u.role === "DEPT_HEAD" ||
//                                                                         u.role === "EMPLOYEE"
//                                                                     )
//                                                                     .map((u) => (
//                                                                         <option key={u.id} value={u.id}>
//                                                                             {u.username} ({u.role})
//                                                                         </option>
//                                                                     ))}
//                                                         </select>
//                                                     )}
//                                                 </td>

//                                                 {/* ⭐ EDIT BUTTON */}
//                                                 <td>
//                                                     {user?.role === "SUPER_ADMIN" && (
//                                                         <button
//                                                             className="edit-btn"
//                                                             onClick={() => {
//                                                                 setEditForm({
//                                                                     id: d.id,
//                                                                     name: d.name,
//                                                                     description: d.description,
//                                                                     headUserId: d.headUser ? d.headUser.id : ""
//                                                                 });

//                                                                 loadDeptUsers(d.id);
//                                                                 setShowEditPopup(true);
//                                                             }}
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                     )}
//                                                 </td>

//                                                 {/* ⭐ DELETE BUTTON */}
//                                                 <td>
//                                                     {user?.role === "SUPER_ADMIN" && (
//                                                         <button
//                                                             className="delete-btn"
//                                                             onClick={() => openDeletePopup(d.id)}
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     )}
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan={6} className="text-center">
//                                                 No departments found.
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* ⭐ DELETE POPUP */}
//             <ConfirmPopup
//                 open={confirmPopup.open}
//                 title="Delete Department?"
//                 message="Are you sure you want to delete this department? This action cannot be undone."
//                 onConfirm={confirmDelete}
//                 onCancel={closeDeletePopup}
//             />

//             {/* ⭐ EDIT POPUP */}
//             {showEditPopup && (
//                 <div className="popup-overlay">
//                     <div className="popup-box">

//                         <h3>Edit Department</h3>

//                         <form onSubmit={handleEditSubmit}>

//                             <input
//                                 value={editForm.name}
//                                 onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                                 placeholder="Department Name"
//                                 required
//                             />

//                             <textarea
//                                 value={editForm.description}
//                                 onChange={(e) =>
//                                     setEditForm({ ...editForm, description: e.target.value })
//                                 }
//                                 placeholder="Description"
//                             />

//                             <select
//                                 value={editForm.headUserId}
//                                 onChange={(e) =>
//                                     setEditForm({ ...editForm, headUserId: e.target.value })
//                                 }
//                             >
//                                 <option value="">Select Head</option>

//                                 {deptUsersMap[editForm.id]?.map((u) => (
//                                     <option key={u.id} value={u.id}>
//                                         {u.username} ({u.role})
//                                     </option>
//                                 ))}
//                             </select>

//                             <div className="popup-actions">
//                                 <button type="button" className="btn btn-cancel"
//                                     onClick={() => setShowEditPopup(false)}
//                                 >
//                                     Cancel
//                                 </button>

//                                 <button type="submit" className="btn btn-primary">
//                                     Update
//                                 </button>
//                             </div>
//                         </form>

//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }




import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  listDepartments,
  createDepartment,
  assignDepartmentHead,
  deleteDepartment,
  getDepartmentUsers,
  updateDepartment,
} from "../api/departments";

import { listUsers } from "../api/users";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

import "../styles/departments.css";
import "../styles/tables.css";

/* -----------------------------------------------------------
   ⭐ REUSABLE CONFIRM POPUP COMPONENT
----------------------------------------------------------- */
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

/* -----------------------------------------------------------
   ⭐ DEPARTMENTS PAGE
----------------------------------------------------------- */
export default function DepartmentsPage() {
  const { user } = useContext(AuthContext);

  const [deps, setDeps] = useState([]);
  const [users, setUsers] = useState([]);

  const [deptUsersMap, setDeptUsersMap] = useState({});

  const [form, setForm] = useState({
    name: "",
    description: "",
    headUserId: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    deptId: null,
  });

  const [editForm, setEditForm] = useState({
    id: null,
    name: "",
    description: "",
    headUserId: "",
  });

  const [showEditPopup, setShowEditPopup] = useState(false);

  // NEW: loading states
  const [loadingList, setLoadingList] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [assigningId, setAssigningId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoadingList(true);
      try {
        const depsData = await listDepartments();
        setDeps(depsData || []);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load departments");
      }

      try {
        const usersData = await listUsers();
        setUsers(usersData || []);
      } catch (e) {
        console.error(e);
      }
      setLoadingList(false);
    }
    load();
  }, []);

  /* -----------------------------------------------------------
      CREATE DEPARTMENT
  ----------------------------------------------------------- */
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      await createDepartment({
        name: form.name,
        description: form.description,
        headUserId: form.headUserId || null,
      });

      toast.success("Department created successfully");

      setForm({ name: "", description: "", headUserId: "" });
      setDeps(await listDepartments());
    } catch (err) {
      toast.error(err?.response?.data || "Error creating department");
    } finally {
      setCreating(false);
    }
  };

  /* -----------------------------------------------------------
      UPDATE DEPARTMENT
  ----------------------------------------------------------- */
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await updateDepartment(editForm.id, {
        name: editForm.name,
        description: editForm.description,
        headUserId: editForm.headUserId || null,
      });

      toast.success("Department updated successfully");
      setShowEditPopup(false);

      setDeps(await listDepartments());
    } catch (err) {
      toast.error(err?.response?.data || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  /* -----------------------------------------------------------
      ASSIGN HEAD
  ----------------------------------------------------------- */
  const handleAssign = async (deptId, userId) => {
    if (!userId) return;

    try {
      setAssigningId(deptId);
      await assignDepartmentHead(deptId, userId);
      toast.success("Department head assigned");

      setDeps(await listDepartments());
      setDeptUsersMap((prev) => ({ ...prev, [deptId]: undefined }));
    } catch (err) {
      toast.error(err?.response?.data || "Assign error");
    } finally {
      setAssigningId(null);
    }
  };

  /* -----------------------------------------------------------
      DELETE DEPT
  ----------------------------------------------------------- */
  const openDeletePopup = (id) => {
    setConfirmPopup({ open: true, deptId: id });
  };

  const closeDeletePopup = () => {
    setConfirmPopup({ open: false, deptId: null });
  };

  const confirmDelete = async () => {
    const id = confirmPopup.deptId;

    try {
      setDeletingId(id);
      await deleteDepartment(id);
      toast.success("Department deleted");

      closeDeletePopup();
      setDeps(await listDepartments());
    } catch (err) {
      toast.error(err?.response?.data || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  /* -----------------------------------------------------------
      LOAD USERS FOR DEPARTMENT
  ----------------------------------------------------------- */
  const loadDeptUsers = async (deptId) => {
    try {
      if (!deptUsersMap[deptId]) {
        const deptUsers = await getDepartmentUsers(deptId);
        setDeptUsersMap((prev) => ({ ...prev, [deptId]: deptUsers || [] }));
      }
    } catch {
      toast.error("Failed to load department users");
    }
  };

  /* -----------------------------------------------------------
      RENDER UI
  ----------------------------------------------------------- */
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="dashboard-content dept-page">
          <div className="dept-header">
            <h2 className="dept-title">Departments</h2>
            <p className="dept-subtitle">
              Manage all your organization departments and team heads.
            </p>
          </div>

          {user?.role === "SUPER_ADMIN" && (
            <button
              className="btn btn-primary dept-toggle-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "Create Department"}
            </button>
          )}

          {loadingList ? (
            <div className="dept-loading">
              <div className="spinner" />
              <span>Loading departments...</span>
            </div>
          ) : (
            <div className="departments-container">
              {/* ⭐ CREATE FORM (left/top) */}
              {user?.role === "SUPER_ADMIN" && showForm && (
                <div className="card create-department-card">
                  <h3 className="create-dept-title">Create Department</h3>

                  <form onSubmit={handleCreate}>
                    <input
                      placeholder="Department Name"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />

                    <textarea
                      placeholder="Description (optional)"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />

                    {/* headUserId is kept in state for future use if needed */}
                    {/* <select
                      value={form.headUserId}
                      onChange={(e) =>
                        setForm({ ...form, headUserId: e.target.value })
                      }
                    >
                      <option value="">Select Head (optional)</option>
                      {users
                        .filter(
                          (u) => u.role === "DEPT_HEAD" || u.role === "EMPLOYEE"
                        )
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.username} ({u.role})
                          </option>
                        ))}
                    </select> */}

                    <button type="submit" disabled={creating}>
                      {creating ? "Creating..." : "Create"}
                    </button>
                  </form>
                </div>
              )}

              {/* =====================================================
                  DESKTOP / LARGE: TABLE VIEW
                 ===================================================== */}
              <div className="card all-departments-table dept-table-wrapper">
                <h3 className="table-title">All Departments</h3>

                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Head</th>
                      <th>Created</th>
                      <th>Assign Head</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {deps?.length > 0 ? (
                      deps.map((d) => (
                        <tr key={d.id}>
                          <td>{d.id}</td>
                          <td>{d.name}</td>

                          <td>
                            {d.headUser
                              ? `${d.headUser.username} (${d.headUser.role})`
                              : "—"}
                          </td>

                          <td>
                            {d.createdAt
                              ? new Date(d.createdAt).toLocaleString()
                              : "—"}
                          </td>

                          <td>
                            {user?.role === "SUPER_ADMIN" && (
                              <select
                                defaultValue=""
                                onClick={() => loadDeptUsers(d.id)}
                                onChange={(e) =>
                                  handleAssign(d.id, e.target.value)
                                }
                                disabled={assigningId === d.id}
                              >
                                <option value="">
                                  {assigningId === d.id
                                    ? "Assigning..."
                                    : "Assign Head"}
                                </option>

                                {deptUsersMap[d.id]?.length > 0 &&
                                  deptUsersMap[d.id]
                                    .filter(
                                      (u) =>
                                        u.role === "DEPT_HEAD" ||
                                        u.role === "EMPLOYEE"
                                    )
                                    .map((u) => (
                                      <option key={u.id} value={u.id}>
                                        {u.username} ({u.role})
                                      </option>
                                    ))}
                              </select>
                            )}
                          </td>

                          {/* ⭐ EDIT BUTTON */}
                          <td>
                            {user?.role === "SUPER_ADMIN" && (
                              <button
                                className="btn btn-ghost edit-btn"
                                onClick={() => {
                                  setEditForm({
                                    id: d.id,
                                    name: d.name,
                                    description: d.description,
                                    headUserId: d.headUser ? d.headUser.id : "",
                                  });

                                  loadDeptUsers(d.id);
                                  setShowEditPopup(true);
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </td>

                          {/* ⭐ DELETE BUTTON */}
                          <td>
                            {user?.role === "SUPER_ADMIN" && (
                              <button
                                className="btn btn-danger delete-btn"
                                onClick={() => openDeletePopup(d.id)}
                                disabled={deletingId === d.id}
                              >
                                {deletingId === d.id ? "Deleting..." : "Delete"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          No departments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* =====================================================
                  MOBILE / TABLET: CARD VIEW
                 ===================================================== */}
              <div className="dept-cards-wrapper">
                {deps?.length > 0 ? (
                  <div className="dept-cards-grid">
                    {deps.map((d) => (
                      <div key={d.id} className="dept-card">
                        <div className="dept-card-header">
                          <div>
                            <span className="dept-card-id">#{d.id}</span>
                            <h4 className="dept-card-name">{d.name}</h4>
                          </div>

                          {user?.role === "SUPER_ADMIN" && (
                            <button
                              className="btn btn-ghost edit-btn small"
                              onClick={() => {
                                setEditForm({
                                  id: d.id,
                                  name: d.name,
                                  description: d.description,
                                  headUserId: d.headUser ? d.headUser.id : "",
                                });

                                loadDeptUsers(d.id);
                                setShowEditPopup(true);
                              }}
                            >
                              Edit
                            </button>
                          )}
                        </div>

                        <div className="dept-card-body">
                          <div className="dept-row">
                            <span className="dept-label">Head</span>
                            <span className="dept-value">
                              {d.headUser
                                ? `${d.headUser.username} (${d.headUser.role})`
                                : "—"}
                            </span>
                          </div>

                          <div className="dept-row">
                            <span className="dept-label">Created</span>
                            <span className="dept-value">
                              {d.createdAt
                                ? new Date(d.createdAt).toLocaleString()
                                : "—"}
                            </span>
                          </div>

                          {user?.role === "SUPER_ADMIN" && (
                            <div className="dept-row">
                              <span className="dept-label">Assign Head</span>
                              <select
                                className="dept-select"
                                defaultValue=""
                                onClick={() => loadDeptUsers(d.id)}
                                onChange={(e) =>
                                  handleAssign(d.id, e.target.value)
                                }
                                disabled={assigningId === d.id}
                              >
                                <option value="">
                                  {assigningId === d.id
                                    ? "Assigning..."
                                    : "Select"}
                                </option>

                                {deptUsersMap[d.id]?.length > 0 &&
                                  deptUsersMap[d.id]
                                    .filter(
                                      (u) =>
                                        u.role === "DEPT_HEAD" ||
                                        u.role === "EMPLOYEE"
                                    )
                                    .map((u) => (
                                      <option key={u.id} value={u.id}>
                                        {u.username} ({u.role})
                                      </option>
                                    ))}
                              </select>
                            </div>
                          )}
                        </div>

                        {user?.role === "SUPER_ADMIN" && (
                          <div className="dept-card-footer">
                            <button
                              className="btn btn-danger small"
                              onClick={() => openDeletePopup(d.id)}
                              disabled={deletingId === d.id}
                            >
                              {deletingId === d.id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dept-empty-card">No departments found.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ⭐ DELETE POPUP */}
      <ConfirmPopup
        open={confirmPopup.open}
        title="Delete Department?"
        message="Are you sure you want to delete this department? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={closeDeletePopup}
      />

      {/* ⭐ EDIT POPUP */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3 className="popup-title">Edit Department</h3>

            <form onSubmit={handleEditSubmit} className="edit-form">
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Department Name"
                required
              />

              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Description"
              />

              <select
                value={editForm.headUserId}
                onChange={(e) =>
                  setEditForm({ ...editForm, headUserId: e.target.value })
                }
              >
                <option value="">Select Head</option>

                {deptUsersMap[editForm.id]?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username} ({u.role})
                  </option>
                ))}
              </select>

              <div className="popup-actions">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setShowEditPopup(false)}
                  disabled={updating}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
