



// // // import React, { useState, useEffect, useContext } from "react";
// // // import Sidebar from "../components/Sidebar";
// // // import Topbar from "../components/Topbar";
// // // import { AuthContext } from "../context/AuthContext";
// // // import toast from "react-hot-toast";
// // // import { deleteTask } from "../api/tasks";
// // // import {
// // //   listTasks,
// // //   createTask,
// // //   startTask,
// // //   submitTask,
// // //   reviewTask,
// // //   getTaskHistory,
// // //   updateTask,
// // //   getTasksByDepartment,
// // // } from "../api/tasks";

// // // import { listUsers } from "../api/users";
// // // import { listDepartments } from "../api/departments";

// // // import "../styles/tasks.css";

// // // /* ===========================
// // //    Helper Components
// // // =========================== */

// // // function FilePreview({ file, onRemove }) {
// // //   if (!file) return null;
// // //   const ext = file.name.toLowerCase().split(".").pop();
// // //   const icon =
// // //     ext === "pdf"
// // //       ? "📄"
// // //       : ["jpg", "jpeg", "png", "gif"].includes(ext)
// // //         ? "🖼️"
// // //         : "📎";

// // //   return (
// // //     <div className="file-preview">
// // //       <span className="file-icon">{icon}</span>
// // //       <span className="file-name">{file.name}</span>
// // //       <button className="file-remove-btn" onClick={onRemove}>
// // //         ✕
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // /**
// // //  * Upgraded UrlFilePreview:
// // //  * - Keeps your old inline "Show Preview" behavior
// // //  * - Adds a Preview button with this behavior:
// // //  *    - jpg/png/gif → open full-screen overlay
// // //  *    - pdf         → open in new tab
// // //  *    - others      → force download
// // //  */
// // // function UrlFilePreview({ url, label, isImage = false, onPreview }) {
// // //   if (!url) return null;

// // //   const fullUrl = ` http://10.69.8.236:8081/uploads/${url}`;
// // //   const ext = url.toLowerCase().split(".").pop();
// // //   const isImageFile = isImage || ["jpg", "jpeg", "png", "gif"].includes(ext);
// // //   const isPdf = ext === "pdf";

// // //   const [open, setOpen] = useState(false);

// // //   const handlePreviewClick = (e) => {
// // //     e.preventDefault();

// // //     if (isImageFile && onPreview) {
// // //       // Open full-screen black overlay
// // //       onPreview(fullUrl);
// // //     } else if (isPdf) {
// // //       // Open PDF in new tab
// // //       window.open(fullUrl, "_blank");
// // //     } else {
// // //       // Other files => download
// // //       const a = document.createElement("a");
// // //       a.href = fullUrl;
// // //       a.download = url;
// // //       a.click();
// // //     }
// // //   };

// // //   return (
// // //     <div className="attachment-preview-container">
// // //       <a href={fullUrl} target="_blank" rel="noreferrer" className="file-link">
// // //         {label}
// // //       </a>

// // //       {/* Inline small preview toggle (old behavior – kept) */}
// // //       {isImageFile && (
// // //         <button
// // //           className="link-btn small"
// // //           onClick={() => setOpen((prev) => !prev)}
// // //         >
// // //           {open ? "▲ Hide Inline" : "▼ Show Inline"}
// // //         </button>
// // //       )}

// // //       {/* New Preview behavior – overlay/pdf/download */}
// // //       <button className="preview-btn small" onClick={handlePreviewClick}>
// // //         Preview
// // //       </button>

// // //       {open && isImageFile && (
// // //         <div className="image-preview-box">
// // //           <img src={fullUrl} alt="preview" />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function StatCard({ title, value, color }) {
// // //   return (
// // //     <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
// // //       <div className="stat-value">{value}</div>
// // //       <div className="stat-label">{title}</div>
// // //     </div>
// // //   );
// // // }

// // // /* ===========================
// // //    Date Helpers
// // // =========================== */

// // // const getStartOfDay = () => {
// // //   const today = new Date();
// // //   today.setHours(0, 0, 0, 0);
// // //   return today.getTime();
// // // };

// // // function getTodayRange() {
// // //   const today = new Date().toISOString().slice(0, 10);
// // //   return { start: today, end: today };
// // // }

// // // function getThisWeekRange() {
// // //   const now = new Date();
// // //   const day = now.getDay();
// // //   const start = new Date(now);
// // //   start.setDate(now.getDate() - day);
// // //   start.setHours(0, 0, 0, 0);

// // //   const end = new Date(start);
// // //   end.setDate(start.getDate() + 6);

// // //   return {
// // //     start: start.toISOString().slice(0, 10),
// // //     end: end.toISOString().slice(0, 10),
// // //   };
// // // }

// // // function getThisMonthRange() {
// // //   const now = new Date();
// // //   const start = new Date(now.getFullYear(), now.getMonth(), 1);
// // //   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

// // //   return {
// // //     start: start.toISOString().slice(0, 10),
// // //     end: end.toISOString().slice(0, 10),
// // //   };
// // // }

// // // function getLast30DaysRange() {
// // //   const end = new Date();
// // //   const start = new Date();
// // //   start.setDate(end.getDate() - 29);

// // //   return {
// // //     start: start.toISOString().slice(0, 10),
// // //     end: end.toISOString().slice(0, 10),
// // //   };
// // // }

// // // /* ===========================
// // //    Main Component
// // // =========================== */

// // // export default function TasksPage() {
// // //   const { user, loading } = useContext(AuthContext);
// // //   if (loading) {
// // //     return <div className="p-4">Loading user profile...</div>;
// // //   }

// // //   // 2. REDIRECT IF NOT LOGGED IN
// // //   if (!user) {
// // //     return <div className="p-4">Please log in.</div>;
// // //   }
// // //   const [tasks, setTasks] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [departments, setDepartments] = useState([]);

// // //   const [search, setSearch] = useState("");
// // //   const [showForm, setShowForm] = useState(false);

// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     description: "",
// // //     selectedDepartmentId: "",
// // //     assigneeId: "",
// // //     file: null,
// // //   });

// // //   const [proofFileMap, setProofFileMap] = useState({});
// // //   const [expandedTask, setExpandedTask] = useState(null);
// // //   const [statsView, setStatsView] = useState(false);

// // //   const [drawerOpen, setDrawerOpen] = useState(false);
// // //   const [drawerTaskId, setDrawerTaskId] = useState(null);
// // //   const [drawerHistory, setDrawerHistory] = useState([]);

// // //   const [reviewComments, setReviewComments] = useState({});

// // //   const [pageSize, setPageSize] = useState(8);
// // //   const [currentPage, setCurrentPage] = useState(0);

// // //   const [editOpen, setEditOpen] = useState(false);
// // //   const [editForm, setEditForm] = useState({
// // //     id: null,
// // //     title: "",
// // //     description: "",
// // //     assigneeId: "",
// // //     file: null,
// // //     createdAt: null,
// // //     creatorId: null,
// // //     currentAttachmentUrl: null,
// // //   });

// // //   // Position & dragging for history modal (kept)
// // //   const [modalPos, setModalPos] = useState({
// // //     x: Math.max(40, window.innerWidth / 2 - 200),
// // //     y: 120,
// // //   });
// // //   const [dragging, setDragging] = useState(false);
// // //   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

// // //   // NEW: full-screen image preview state (for black bg overlay)
// // //   const [preview, setPreview] = useState({ open: false, url: null });

// // //   const startDrag = (e) => {
// // //     setDragging(true);
// // //     setDragOffset({
// // //       x: e.clientX - modalPos.x,
// // //       y: e.clientY - modalPos.y,
// // //     });
// // //   };

// // //   const stopDrag = () => setDragging(false);

// // //   const onDrag = (e) => {
// // //     if (!dragging) return;
// // //     setModalPos({
// // //       x: e.clientX - dragOffset.x,
// // //       y: e.clientY - dragOffset.y,
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     window.addEventListener("mousemove", onDrag);
// // //     window.addEventListener("mouseup", stopDrag);
// // //     return () => {
// // //       window.removeEventListener("mousemove", onDrag);
// // //       window.removeEventListener("mouseup", stopDrag);
// // //     };
// // //   }, [dragging, dragOffset, modalPos]);

// // //   const getDeptId = (obj) => {
// // //     if (!obj) return null;
// // //     return obj.departmentId || null;
// // //   };

// // //   /* ========== FILTER STATES ========== */
// // //   const [deptFilterId, setDeptFilterId] = useState("");
// // //   const [startDateRange, setStartDateRange] = useState("");
// // //   const [endDateRange, setEndDateRange] = useState("");
// // //   const [completedDateFilter, setCompletedDateFilter] = useState("");
// // //   const [isFilteringBackend, setIsFilteringBackend] = useState(false);

// // //   /* ========== INITIAL LOAD ========== */
// // //   useEffect(() => {
// // //     (async function loadAll() {
// // //       try {
// // //         const tasksData = await listTasks();
// // //         let filtered = tasksData;

// // //         if (user.role === "DEPT_HEAD") {
// // //           const myDept = getDeptId(user);
// // //           filtered = tasksData.filter((t) => {
// // //             return (
// // //               t.creator?.id === user.id ||
// // //               t.assignee?.id === user.id ||
// // //               getDeptId(t.assignee) === myDept ||
// // //               getDeptId(t.creator) === myDept
// // //             );
// // //           });
// // //         }

// // //         if (user.role === "EMPLOYEE") {
// // //           filtered = tasksData.filter((t) => t.assignee?.id === user.id);
// // //         }

// // //         setTasks(
// // //           (filtered || []).map((t) => ({
// // //             ...t,
// // //             assignee: {
// // //               ...(t.assignee || {}),
// // //               departmentId: t.assignee?.departmentId ?? null,
// // //               departmentName: t.assignee?.departmentName ?? null,
// // //             },
// // //             creator: {
// // //               ...(t.creator || {}),
// // //               departmentId: t.creator?.departmentId ?? null,
// // //               departmentName: t.creator?.departmentName ?? null,
// // //             },
// // //           }))
// // //         );

// // //         if (user.role !== "EMPLOYEE") {
// // //           const [u, d] = await Promise.all([listUsers(), listDepartments()]);
// // //           setUsers(u || []);
// // //           setDepartments(d || []);
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //         toast.error("Failed to load data");
// // //       }
// // //     })();
// // //   }, [user]);

// // //   /* ========== REFRESH ALL ========== */
// // //   const refreshAll = async () => {
// // //     try {
// // //       const tasksData = await listTasks();
// // //       let filtered = tasksData;

// // //       if (user.role === "DEPT_HEAD") {
// // //         const myDept = getDeptId(user);
// // //         filtered = tasksData.filter((t) => {
// // //           return (
// // //             t.creator?.id === user.id ||
// // //             t.assignee?.id === user.id ||
// // //             getDeptId(t.assignee) === myDept ||
// // //             getDeptId(t.creator) === myDept
// // //           );
// // //         });
// // //       }

// // //       if (user.role === "EMPLOYEE") {
// // //         filtered = tasksData.filter((t) => t.assignee?.id === user.id);
// // //       }

// // //       setTasks(
// // //         (filtered || []).map((t) => ({
// // //           ...t,
// // //           assignee: {
// // //             ...(t.assignee || {}),
// // //             departmentId: t.assignee?.departmentId ?? null,
// // //             departmentName: t.assignee?.departmentName ?? null,
// // //           },
// // //           creator: {
// // //             ...(t.creator || {}),
// // //             departmentId: t.creator?.departmentId ?? null,
// // //             departmentName: t.creator?.departmentName ?? null,
// // //           },
// // //         }))
// // //       );

// // //       setIsFilteringBackend(false);

// // //       if (user.role !== "EMPLOYEE") {
// // //         const [u, d] = await Promise.all([listUsers(), listDepartments()]);
// // //         setUsers(u);
// // //         setDepartments(d);
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Refresh failed");
// // //     }
// // //   };

// // //   /* ========== APPLY BACKEND FILTERS ========== */
// // //   const applyBackendFilters = async () => {
// // //     // Department filter is only for SUPER_ADMIN
// // //     if (user.role === "SUPER_ADMIN" && deptFilterId) {
// // //       try {
// // //         const tasksData = await getTasksByDepartment(
// // //           deptFilterId,
// // //           startDateRange || undefined,
// // //           endDateRange || undefined
// // //         );

// // //         const normalized = (tasksData || []).map((t) => ({
// // //           ...t,
// // //           assignee: {
// // //             ...(t.assignee || {}),
// // //             departmentId: t.assignee?.departmentId ?? null,
// // //             departmentName: t.assignee?.departmentName ?? null,
// // //           },
// // //           creator: {
// // //             ...(t.creator || {}),
// // //             departmentId: t.creator?.departmentId ?? null,
// // //             departmentName: t.creator?.departmentName ?? null,
// // //           },
// // //         }));

// // //         setTasks(normalized);
// // //         setIsFilteringBackend(true);
// // //         setCurrentPage(0);
// // //         toast.success("Department filter applied");
// // //       } catch (err) {
// // //         console.error(err);
// // //         toast.error(err?.message || "Failed to apply department filter");
// // //       }
// // //     }
// // //     // For DEPT_HEAD and EMPLOYEE: filter by date range only (client-side post-fetch)
// // //     else if (startDateRange || endDateRange) {
// // //       try {
// // //         const tasksData = await listTasks();
// // //         let filtered = tasksData;

// // //         if (user.role === "DEPT_HEAD") {
// // //           const myDept = getDeptId(user);
// // //           filtered = tasksData.filter((t) => {
// // //             return (
// // //               t.creator?.id === user.id ||
// // //               t.assignee?.id === user.id ||
// // //               getDeptId(t.assignee) === myDept ||
// // //               getDeptId(t.creator) === myDept
// // //             );
// // //           });
// // //         }

// // //         if (user.role === "EMPLOYEE") {
// // //           filtered = tasksData.filter((t) => t.assignee?.id === user.id);
// // //         }

// // //         if (startDateRange || endDateRange) {
// // //           const startTime = startDateRange
// // //             ? new Date(startDateRange).getTime()
// // //             : 0;
// // //           const endTime = endDateRange
// // //             ? new Date(endDateRange + "T23:59:59").getTime()
// // //             : Infinity;

// // //           filtered = filtered.filter((t) => {
// // //             const createdTime = new Date(t.createdAt).getTime();
// // //             return createdTime >= startTime && createdTime <= endTime;
// // //           });
// // //         }

// // //         setTasks(
// // //           (filtered || []).map((t) => ({
// // //             ...t,
// // //             assignee: {
// // //               ...(t.assignee || {}),
// // //               departmentId: t.assignee?.departmentId ?? null,
// // //               departmentName: t.assignee?.departmentName ?? null,
// // //             },
// // //             creator: {
// // //               ...(t.creator || {}),
// // //               departmentId: t.creator?.departmentId ?? null,
// // //               departmentName: t.creator?.departmentName ?? null,
// // //             },
// // //           }))
// // //         );

// // //         setIsFilteringBackend(true);
// // //         setCurrentPage(0);
// // //         toast.success("Date filter applied");
// // //       } catch (err) {
// // //         console.error(err);
// // //         toast.error("Failed to apply date filter");
// // //       }
// // //     } else {
// // //       toast.error("Please select filters to apply");
// // //     }
// // //   };

// // //   const clearAllFilters = async () => {
// // //     setDeptFilterId("");
// // //     setStartDateRange("");
// // //     setEndDateRange("");
// // //     setCompletedDateFilter("");
// // //     setIsFilteringBackend(false);
// // //     await refreshAll();
// // //     toast.success("All filters cleared");
// // //   };

// // //   /* ========== GET USERS BY DEPARTMENT ========== */
// // //   const getUsersInDepartment = (deptId) => {
// // //     return users.filter(
// // //       (u) => (u.departmentId || u.department?.id) === Number(deptId)
// // //     );
// // //   };

// // //   const getAssignableUsers = () => {
// // //     if (user.role === "SUPER_ADMIN") {
// // //       if (!form.selectedDepartmentId) return [];
// // //       return getUsersInDepartment(form.selectedDepartmentId).filter(
// // //         (u) => u.role === "DEPT_HEAD" || u.role === "EMPLOYEE"
// // //       );
// // //     }

// // //     if (user.role === "DEPT_HEAD") {
// // //       const dept = getDeptId(user);
// // //       return getUsersInDepartment(dept).filter((u) => u.role === "EMPLOYEE");
// // //     }

// // //     return [];
// // //   };

// // //   /* ========== CREATE TASK ========== */
// // //   const handleCreate = async () => {
// // //     if (!form.title.trim()) return toast.error("Title required");
// // //     if (!form.assigneeId) return toast.error("Select assignee");

// // //     try {
// // //       if (form.assigneeId === "ALL") {
// // //         const deptToUse =
// // //           user.role === "SUPER_ADMIN"
// // //             ? form.selectedDepartmentId
// // //             : getDeptId(user);
// // //         const employees = getUsersInDepartment(deptToUse).filter(
// // //           (u) => u.role === "EMPLOYEE"
// // //         );

// // //         for (const emp of employees) {
// // //           await createTask({
// // //             title: form.title,
// // //             description: form.description,
// // //             assigneeId: emp.id,
// // //             file: form.file,
// // //           });
// // //         }

// // //         toast.success("Created tasks for all employees");
// // //       } else {
// // //         await createTask({
// // //           title: form.title,
// // //           description: form.description,
// // //           assigneeId: Number(form.assigneeId),
// // //           file: form.file,
// // //         });

// // //         toast.success("Task created");
// // //       }

// // //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }

// // //       setShowForm(false);
// // //       setForm({
// // //         title: "",
// // //         description: "",
// // //         selectedDepartmentId: "",
// // //         assigneeId: "",
// // //         file: null,
// // //       });
// // //       setCurrentPage(0);
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Create failed");
// // //     }
// // //   };

// // //   /* ========== TASK ACTIONS ========== */
// // //   const handleStart = async (id) => {
// // //     try {
// // //       await startTask(id);
// // //       toast.success("Started");
// // //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }
// // //     } catch (e) {
// // //       toast.error(e?.response?.data || "Start failed");
// // //     }
// // //   };

// // //   const handleSubmit = async (id) => {
// // //     const entry = proofFileMap[id];
// // //     if (!entry?.file) return toast.error("Attach proof file");
// // //     if (!entry?.comment.trim())
// // //       return toast.error("Please write an explanation");

// // //     try {
// // //       await submitTask(id, entry.file, entry.comment);
// // //       toast.success("Submitted");

// // //       const cp = { ...proofFileMap };
// // //       delete cp[id];
// // //       setProofFileMap(cp);

// // //       if (isFilteringBackend) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }
// // //     } catch (e) {
// // //       toast.error(e?.response?.data || "Submit failed");
// // //     }
// // //   };

// // //   const handleReview = async (id, action) => {
// // //     try {
// // //       const comment = reviewComments[id] || "";
// // //       await reviewTask(id, { action, comment });
// // //       toast.success(`${action}ed`);

// // //       const cp = { ...reviewComments };
// // //       delete cp[id];
// // //       setReviewComments(cp);

// // //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }

// // //       // refresh history view if currently open for this task
// // //       if (drawerTaskId === id) openDrawer(id, null);
// // //     } catch (err) {
// // //       toast.error(err?.response?.data || "Review failed");
// // //     }
// // //   };

// // //   /* ========== HISTORY DRAWER ========== */
// // //   const openDrawer = async (id, event) => {
// // //     try {
// // //       const hist = await getTaskHistory(id);
// // //       setDrawerHistory(hist || []);
// // //       setDrawerTaskId(id);

// // //       // Default: center modal
// // //       let x = window.innerWidth / 2 - 275;
// // //       let y = window.innerHeight / 2 - 250;

// // //       // If we have click event (from History button), open near that button
// // //       if (event && event.currentTarget) {
// // //         const rect = event.currentTarget.getBoundingClientRect();
// // //         x = rect.left + rect.width / 2 - 275;
// // //         y = rect.top + window.scrollY - 40;
// // //       }

// // //       setModalPos({
// // //         x: Math.max(16, x),
// // //         y: Math.max(16, y),
// // //       });

// // //       setDrawerOpen(true);
// // //     } catch {
// // //       toast.error("Failed to load history");
// // //     }
// // //   };

// // //   const closeDrawer = () => {
// // //     setDrawerOpen(false);
// // //     setDrawerHistory([]);
// // //     setDrawerTaskId(null);
// // //   };

// // //   /* ========== PERMISSIONS ========== */
// // //   const canStartTask = (t) =>
// // //     t.assignee?.email === user.email && t.status === "PENDING";

// // //   const canSubmitTask = (t) =>
// // //     t.assignee?.email === user.email && t.status === "IN_PROGRESS";

// // //   const canReviewTask = (t) =>
// // //     t.creator?.email === user.email && t.status === "SUBMITTED";

// // //   const canEditTask = (task) => {
// // //     if (task.creator?.email !== user.email) return false;
// // //     const created = new Date(task.createdAt).getTime();
// // //     const now = Date.now();
// // //     const diffMin = (now - created) / 60000;
// // //     return diffMin <= 5;
// // //   };

// // //   const openEditPopup = (task) => {
// // //     setEditForm({
// // //       id: task.id,
// // //       title: task.title,
// // //       description: task.description,
// // //       assigneeId: task.assignee?.id || "",
// // //       file: null,
// // //       createdAt: task.createdAt,
// // //       creatorId: task.creator?.id,
// // //       currentAttachmentUrl: task.attachmentUrl,
// // //     });
// // //     setEditOpen(true);
// // //   };

// // //   const closeEditPopup = () => {
// // //     setEditOpen(false);
// // //     setEditForm({
// // //       id: null,
// // //       title: "",
// // //       description: "",
// // //       assigneeId: "",
// // //       file: null,
// // //       createdAt: null,
// // //       creatorId: null,
// // //       currentAttachmentUrl: null,
// // //     });
// // //   };

// // //   const handleEditSave = async () => {
// // //     if (!editForm.title.trim()) return toast.error("Title required");
// // //     if (!editForm.assigneeId) return toast.error("Select assignee");

// // //     try {
// // //       await updateTask(editForm.id, {
// // //         title: editForm.title,
// // //         description: editForm.description,
// // //         assigneeId: Number(editForm.assigneeId),
// // //         file: editForm.file,
// // //       });

// // //       toast.success("Task updated");
// // //       closeEditPopup();

// // //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error(err?.response?.data || "Update failed");
// // //     }
// // //   };

// // //   /* ========== UI HELPERS ========== */
// // //   const getStatusColor = (s) =>
// // //   ({
// // //     PENDING: "#f59e0b",
// // //     IN_PROGRESS: "#3b82f6",
// // //     SUBMITTED: "#8b5cf6",
// // //     COMPLETED: "#10b981",
// // //     REJECTED: "#ef4444",
// // //   }[s] || "#6b7280");

// // //   /* ========== FILTERING & PAGINATION ========== */
// // //   const filteredTasks = tasks.filter((t) => {
// // //     const text = search.toLowerCase();
// // //     const passesSearch =
// // //       t.title?.toLowerCase().includes(text) ||
// // //       t.status?.toLowerCase().includes(text) ||
// // //       t.assignee?.username?.toLowerCase().includes(text) ||
// // //       t.creator?.username?.toLowerCase().includes(text);

// // //     if (!passesSearch) return false;

// // //     // Completed date filter (client-side)
// // //     if (completedDateFilter && t.status === "COMPLETED") {
// // //       const completedTime = new Date(
// // //         t.completedAt || t.updatedAt
// // //       ).getTime();
// // //       if (completedDateFilter === "TODAY")
// // //         return completedTime >= getStartOfDay();
// // //     } else if (completedDateFilter && t.status !== "COMPLETED") {
// // //       return false;
// // //     }

// // //     return true;
// // //   });

// // //   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
// // //   const pageTasks = filteredTasks.slice(
// // //     currentPage * pageSize,
// // //     currentPage * pageSize + pageSize
// // //   );

// // //   const changePage = (p) => {
// // //     if (p < 0 || p >= totalPages) return;
// // //     setCurrentPage(p);
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   useEffect(() => {
// // //     setCurrentPage(0);
// // //   }, [search, completedDateFilter, deptFilterId, startDateRange, endDateRange]);

// // //   const handleDelete = async (id) => {
// // //     try {
// // //       await deleteTask(id);
// // //       toast.success("Task deleted");

// // //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// // //         await applyBackendFilters();
// // //       } else {
// // //         await refreshAll();
// // //       }
// // //     } catch (err) {
// // //       toast.error(err?.response?.data || "Delete failed");
// // //     }
// // //   };

// // //   // ⚡ QUICK DATE FILTER HANDLER
// // //   const applyQuickRange = (rangeFunc) => {
// // //     const { start, end } = rangeFunc();
// // //     setStartDateRange(start);
// // //     setEndDateRange(end);

// // //     setTimeout(() => applyBackendFilters(), 50);
// // //   };

// // //   /* ========== RENDER ========== */
// // //   return (
// // //     <div className="tasks-page">
// // //       <Sidebar />

// // //       <div className="tasks-main">
// // //         <Topbar />

// // //         <div className="tasks-container">
// // //           {/* HEADER */}
// // //           <div className="tasks-header">
// // //             <h1 className="tasks-title">Task Management</h1>

// // //             <div className="tasks-actions">
// // //               <button
// // //                 className="btn btn-ghost"
// // //                 onClick={() => setStatsView(!statsView)}
// // //               >
// // //                 {statsView ? "Hide Stats" : "Show Stats"}
// // //               </button>

// // //               {(user.role === "SUPER_ADMIN" || user.role === "DEPT_HEAD") && (
// // //                 <button
// // //                   className="btn btn-primary"
// // //                   onClick={() => setShowForm(!showForm)}
// // //                 >
// // //                   {showForm ? "Close Form" : "+ Create Task"}
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* STATS */}
// // //           {statsView && (
// // //             <div className="stats-grid">
// // //               <StatCard
// // //                 title="Total"
// // //                 value={tasks.length}
// // //                 color="#6b7280"
// // //               />
// // //               <StatCard
// // //                 title="Pending"
// // //                 value={
// // //                   tasks.filter((t) => t.status === "PENDING").length
// // //                 }
// // //                 color="#ffa200ff"
// // //               />
// // //               <StatCard
// // //                 title="In Progress"
// // //                 value={
// // //                   tasks.filter((t) => t.status === "IN_PROGRESS").length
// // //                 }
// // //                 color="#0062ffff"
// // //               />
// // //               <StatCard
// // //                 title="Submitted"
// // //                 value={
// // //                   tasks.filter((t) => t.status === "SUBMITTED").length
// // //                 }
// // //                 color="#8b5cf6"
// // //               />
// // //               <StatCard
// // //                 title="Completed"
// // //                 value={
// // //                   tasks.filter((t) => t.status === "COMPLETED").length
// // //                 }
// // //                 color="#10b981"
// // //               />
// // //               <StatCard
// // //                 title="Rejected"
// // //                 value={
// // //                   tasks.filter((t) => t.status === "REJECTED").length
// // //                 }
// // //                 color="#ff0000ff"
// // //               />
// // //             </div>
// // //           )}

// // //           {/* CREATE FORM */}
// // //           {showForm && (
// // //             <div className="create-card">
// // //               <h3>Create Task</h3>

// // //               <div className="create-grid">
// // //                 {user.role === "SUPER_ADMIN" && (
// // //                   <div className="form-field">
// // //                     <label>Department *</label>
// // //                     <select
// // //                       value={form.selectedDepartmentId}
// // //                       onChange={(e) =>
// // //                         setForm({
// // //                           ...form,
// // //                           selectedDepartmentId: e.target.value,
// // //                           assigneeId: "",
// // //                         })
// // //                       }
// // //                     >
// // //                       <option value="">— Select —</option>
// // //                       {departments.map((d) => (
// // //                         <option key={d.id} value={d.id}>
// // //                           {d.name}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </div>
// // //                 )}

// // //                 <div className="form-field">
// // //                   <label>Title *</label>
// // //                   <input
// // //                     value={form.title}
// // //                     onChange={(e) =>
// // //                       setForm({ ...form, title: e.target.value })
// // //                     }
// // //                     placeholder="Enter title"
// // //                   />
// // //                 </div>

// // //                 <div className="form-field full">
// // //                   <label>Description</label>
// // //                   <textarea
// // //                     rows={4}
// // //                     value={form.description}
// // //                     onChange={(e) =>
// // //                       setForm({ ...form, description: e.target.value })
// // //                     }
// // //                     placeholder="Enter description"
// // //                   ></textarea>
// // //                 </div>

// // //                 <div className="form-field">
// // //                   <label>Attachment (optional)</label>
// // //                   {!form.file ? (
// // //                     <input
// // //                       type="file"
// // //                       onChange={(e) =>
// // //                         setForm({ ...form, file: e.target.files[0] })
// // //                       }
// // //                     />
// // //                   ) : (
// // //                     <FilePreview
// // //                       file={form.file}
// // //                       onRemove={() =>
// // //                         setForm({ ...form, file: null })
// // //                       }
// // //                     />
// // //                   )}
// // //                 </div>

// // //                 {(user.role === "DEPT_HEAD" ||
// // //                   (user.role === "SUPER_ADMIN" &&
// // //                     form.selectedDepartmentId)) && (
// // //                     <div className="form-field">
// // //                       <label>Assignee *</label>
// // //                       <select
// // //                         value={form.assigneeId}
// // //                         onChange={(e) =>
// // //                           setForm({
// // //                             ...form,
// // //                             assigneeId: e.target.value,
// // //                           })
// // //                         }
// // //                       >
// // //                         <option value="">— Select —</option>

// // //                         {user.role === "DEPT_HEAD" && (
// // //                           <option value="ALL">
// // //                             Assign to ALL Employees
// // //                           </option>
// // //                         )}

// // //                         {getAssignableUsers().map((u) => (
// // //                           <option key={u.id} value={u.id}>
// // //                             {u.username} ({u.role})
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                     </div>
// // //                   )}
// // //               </div>

// // //               <button
// // //                 className="btn btn-success mt-2"
// // //                 onClick={handleCreate}
// // //               >
// // //                 Create Task
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* TASK LIST */}
// // //           <section className="task-list">
// // //             <h2 className="section-title">
// // //               {user.role === "SUPER_ADMIN"
// // //                 ? "All Tasks"
// // //                 : user.role === "DEPT_HEAD"
// // //                   ? "Tasks I Created / My Dept"
// // //                   : "My Tasks"}
// // //             </h2>

// // //             {tasks.length === 0 ? (
// // //               <div className="empty-state">
// // //                 <div className="empty-icon">📋</div>No tasks available
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 {/* FILTER BAR */}
// // //                 <div className="filter-container">
// // //                   <div className="filter-row">
// // //                     <div className="quick-filters">
// // //                       <button
// // //                         className="btn-ghost"
// // //                         onClick={() =>
// // //                           applyQuickRange(getTodayRange)
// // //                         }
// // //                       >
// // //                         Today
// // //                       </button>

// // //                       <button
// // //                         className="btn-ghost"
// // //                         onClick={() =>
// // //                           applyQuickRange(getThisWeekRange)
// // //                         }
// // //                       >
// // //                         This Week
// // //                       </button>

// // //                       <button
// // //                         className="btn-ghost"
// // //                         onClick={() =>
// // //                           applyQuickRange(getThisMonthRange)
// // //                         }
// // //                       >
// // //                         This Month
// // //                       </button>

// // //                       <button
// // //                         className="btn-ghost"
// // //                         onClick={() =>
// // //                           applyQuickRange(getLast30DaysRange)
// // //                         }
// // //                       >
// // //                         Last 30 Days
// // //                       </button>
// // //                     </div>

// // //                     {/* Search */}
// // //                     <div className="filter-group search-bar">
// // //                       <label>Search</label>
// // //                       <input
// // //                         type="text"
// // //                         value={search}
// // //                         onChange={(e) => setSearch(e.target.value)}
// // //                         placeholder="Search tasks..."
// // //                       />
// // //                     </div>

// // //                     {/* Department Filter - SUPER ADMIN ONLY */}
// // //                     {user.role === "SUPER_ADMIN" && (
// // //                       <div className="filter-group">
// // //                         <label>Department</label>
// // //                         <select
// // //                           value={deptFilterId}
// // //                           onChange={(e) =>
// // //                             setDeptFilterId(e.target.value)
// // //                           }
// // //                         >
// // //                           <option value="">All Departments</option>
// // //                           {departments.map((d) => (
// // //                             <option key={d.id} value={d.id}>
// // //                               {d.name}
// // //                             </option>
// // //                           ))}
// // //                         </select>
// // //                       </div>
// // //                     )}

// // //                     {/* Start Date */}
// // //                     <div className="filter-group">
// // //                       <label>Start Date</label>
// // //                       <input
// // //                         type="date"
// // //                         value={startDateRange}
// // //                         onChange={(e) =>
// // //                           setStartDateRange(e.target.value)
// // //                         }
// // //                       />
// // //                     </div>

// // //                     {/* End Date */}
// // //                     <div className="filter-group">
// // //                       <label>End Date</label>
// // //                       <input
// // //                         type="date"
// // //                         value={endDateRange}
// // //                         onChange={(e) =>
// // //                           setEndDateRange(e.target.value)
// // //                         }
// // //                       />
// // //                     </div>

// // //                     {/* Completed Quick Filter */}
// // //                     <div className="filter-group">
// // //                       <label>Completed Filter</label>
// // //                       <select
// // //                         value={completedDateFilter}
// // //                         onChange={(e) =>
// // //                           setCompletedDateFilter(e.target.value)
// // //                         }
// // //                       >
// // //                         <option value="">All</option>
// // //                         <option value="TODAY">Today</option>
// // //                       </select>
// // //                     </div>
// // //                   </div>

// // //                   {/* Action Buttons */}
// // //                   <div className="filter-actions">
// // //                     <button
// // //                       className="btn btn-primary"
// // //                       onClick={applyBackendFilters}
// // //                     >
// // //                       Apply Filters
// // //                     </button>
// // //                     <button
// // //                       className="btn btn-ghost"
// // //                       onClick={clearAllFilters}
// // //                     >
// // //                       Clear All
// // //                     </button>
// // //                   </div>
// // //                 </div>

// // //                 {/* TASK CARDS */}
// // //                 <div className="tasks-grid">
// // //                   {pageTasks.map((task) => (
// // //                     <article className="task-card" key={task.id}>
// // //                       <div className="task-card-header">
// // //                         <h3 className="task-title">{task.title}</h3>

// // //                         <span
// // //                           className="status-pill"
// // //                           style={{
// // //                             backgroundColor: getStatusColor(
// // //                               task.status
// // //                             ),
// // //                           }}
// // //                         >
// // //                           {task.status}
// // //                         </span>
// // //                       </div>

// // //                       <div className="task-meta">
// // //                         <div>
// // //                           <strong>Assignee:</strong>{" "}
// // //                           {task.assignee?.username} (
// // //                           {task.assignee?.role}) —{" "}
// // //                           {task.assignee?.departmentName || "N/A"}
// // //                         </div>

// // //                         <div>
// // //                           <strong>Creator:</strong>{" "}
// // //                           {task.creator?.username} ({task.creator?.role}){" "}
// // //                           {task.creator?.departmentName
// // //                             ? `— ${task.creator.departmentName}`
// // //                             : ""}
// // //                         </div>

// // //                         <div>
// // //                           <strong>Created:</strong>{" "}
// // //                           {new Date(
// // //                             task.createdAt
// // //                           ).toLocaleString()}
// // //                         </div>
// // //                       </div>

// // //                       {task.description && (
// // //                         <>
// // //                           <button
// // //                             className="link-btn"
// // //                             onClick={() =>
// // //                               setExpandedTask(
// // //                                 expandedTask === task.id
// // //                                   ? null
// // //                                   : task.id
// // //                               )
// // //                             }
// // //                           >
// // //                             {expandedTask === task.id
// // //                               ? "▲ Hide Description"
// // //                               : "▼ Show Description"}
// // //                           </button>

// // //                           {expandedTask === task.id && (
// // //                             <div className="task-description">
// // //                               <p>{task.description}</p>

// // //                               {canEditTask(task) && (
// // //                                 <button
// // //                                   className="btn btn-warning mt-1"
// // //                                   onClick={() => openEditPopup(task)}
// // //                                 >
// // //                                   Edit Task
// // //                                 </button>
// // //                               )}

// // //                               {!canEditTask(task) &&
// // //                                 task.creator?.email ===
// // //                                 user.email && (
// // //                                   <p className="edit-disabled-text">
// // //                                     You can edit only within 5 minutes
// // //                                     of creation.
// // //                                   </p>
// // //                                 )}
// // //                             </div>
// // //                           )}
// // //                         </>
// // //                       )}

// // //                       <div className="attachments">
// // //                         <UrlFilePreview
// // //                           url={task.attachmentUrl}
// // //                           label="📎Creator Attachment"
// // //                           onPreview={(url) =>
// // //                             setPreview({ open: true, url })
// // //                           }
// // //                         />
// // //                         <UrlFilePreview
// // //                           url={task.proofUrl}
// // //                           label="📁Proof File"
// // //                           isImage
// // //                           onPreview={(url) =>
// // //                             setPreview({ open: true, url })
// // //                           }
// // //                         />
// // //                       </div>

// // //                       <div className="card-actions">
// // //                         {canStartTask(task) && (
// // //                           <button
// // //                             className="btn btn-primary"
// // //                             onClick={() => handleStart(task.id)}
// // //                           >
// // //                             Start
// // //                           </button>
// // //                         )}

// // //                         {task.creator?.email === user.email &&
// // //                           task.status === "PENDING" &&
// // //                           canEditTask(task) && (
// // //                             <button
// // //                               className="btn btn-danger"
// // //                               onClick={() => handleDelete(task.id)}
// // //                             >
// // //                               Delete
// // //                             </button>
// // //                           )}

// // //                         {canSubmitTask(task) && (
// // //                           <div className="submit-row">
// // //                             {/* Proof file upload */}
// // //                             {proofFileMap[task.id]?.file ? (
// // //                               <FilePreview
// // //                                 file={proofFileMap[task.id].file}
// // //                                 onRemove={() => {
// // //                                   const cp = { ...proofFileMap };
// // //                                   cp[task.id] = {
// // //                                     file: null,
// // //                                     comment: "",
// // //                                   };
// // //                                   setProofFileMap(cp);
// // //                                 }}
// // //                               />
// // //                             ) : (
// // //                               <input
// // //                                 type="file"
// // //                                 onChange={(e) =>
// // //                                   setProofFileMap({
// // //                                     ...proofFileMap,
// // //                                     [task.id]: {
// // //                                       file: e.target.files[0],
// // //                                       comment: "",
// // //                                     },
// // //                                   })
// // //                                 }
// // //                               />
// // //                             )}

// // //                             {/* Text explanation */}
// // //                             <textarea
// // //                               rows={2}
// // //                               placeholder="Explain your work"
// // //                               value={
// // //                                 proofFileMap[task.id]?.comment || ""
// // //                               }
// // //                               onChange={(e) =>
// // //                                 setProofFileMap({
// // //                                   ...proofFileMap,
// // //                                   [task.id]: {
// // //                                     ...proofFileMap[task.id],
// // //                                     comment: e.target.value,
// // //                                   },
// // //                                 })
// // //                               }
// // //                             ></textarea>

// // //                             <button
// // //                               className="btn btn-purple"
// // //                               disabled={
// // //                                 !proofFileMap[task.id]?.file ||
// // //                                 !proofFileMap[task.id]?.comment
// // //                               }
// // //                               onClick={() =>
// // //                                 handleSubmit(task.id)
// // //                               }
// // //                             >
// // //                               Submit
// // //                             </button>
// // //                           </div>
// // //                         )}

// // //                         {canReviewTask(task) && (
// // //                           <div className="review-block">
// // //                             <textarea
// // //                               rows={2}
// // //                               placeholder="Review comment"
// // //                               value={reviewComments[task.id] || ""}
// // //                               onChange={(e) =>
// // //                                 setReviewComments({
// // //                                   ...reviewComments,
// // //                                   [task.id]: e.target.value,
// // //                                 })
// // //                               }
// // //                             ></textarea>

// // //                             <div className="review-actions">
// // //                               <button
// // //                                 className="btn btn-success"
// // //                                 onClick={() =>
// // //                                   handleReview(task.id, "ACCEPT")
// // //                                 }
// // //                               >
// // //                                 ✓ Accept
// // //                               </button>

// // //                               <button
// // //                                 className="btn btn-danger"
// // //                                 onClick={() =>
// // //                                   handleReview(task.id, "REJECT")
// // //                                 }
// // //                               >
// // //                                 ✕ Reject
// // //                               </button>
// // //                             </div>
// // //                           </div>
// // //                         )}

// // //                         <button
// // //                           className="btn btn-ghost"
// // //                           onClick={(e) => openDrawer(task.id, e)}
// // //                         >
// // //                           History
// // //                         </button>
// // //                       </div>
// // //                     </article>
// // //                   ))}
// // //                 </div>

// // //                 {/* PAGINATION */}
// // //                 <div className="pagination">
// // //                   <div className="pagination-left">
// // //                     Show
// // //                     <select
// // //                       value={pageSize}
// // //                       onChange={(e) => {
// // //                         setPageSize(Number(e.target.value));
// // //                         setCurrentPage(0);
// // //                       }}
// // //                     >
// // //                       <option value={5}>5</option>
// // //                       <option value={8}>8</option>
// // //                       <option value={12}>12</option>
// // //                       <option value={20}>20</option>
// // //                     </select>
// // //                     items
// // //                   </div>

// // //                   <div className="pagination-controls">
// // //                     <button
// // //                       onClick={() => changePage(0)}
// // //                       disabled={currentPage === 0}
// // //                     >
// // //                       «
// // //                     </button>

// // //                     <button
// // //                       onClick={() => changePage(currentPage - 1)}
// // //                       disabled={currentPage === 0}
// // //                     >
// // //                       Prev
// // //                     </button>

// // //                     {Array.from({ length: totalPages }).map(
// // //                       (_, i) => {
// // //                         const pageNum = i;
// // //                         const start = Math.max(
// // //                           0,
// // //                           currentPage - 2
// // //                         );
// // //                         const end = Math.min(
// // //                           totalPages - 1,
// // //                           start + 4
// // //                         );

// // //                         if (
// // //                           totalPages <= 7 ||
// // //                           (pageNum >= start && pageNum <= end)
// // //                         ) {
// // //                           return (
// // //                             <button
// // //                               key={i}
// // //                               className={
// // //                                 i === currentPage ? "active" : ""
// // //                               }
// // //                               onClick={() => changePage(i)}
// // //                             >
// // //                               {i + 1}
// // //                             </button>
// // //                           );
// // //                         }

// // //                         if (
// // //                           i === start - 1 ||
// // //                           (i === end + 1 &&
// // //                             end < totalPages - 1)
// // //                         ) {
// // //                           if (
// // //                             (i === start - 1 && start > 0) ||
// // //                             (i === end + 1 &&
// // //                               end < totalPages - 1)
// // //                           ) {
// // //                             return (
// // //                               <span key={`ellipsis-${i}`}>
// // //                                 ...
// // //                               </span>
// // //                             );
// // //                           }
// // //                         }

// // //                         return null;
// // //                       }
// // //                     )}

// // //                     <button
// // //                       onClick={() =>
// // //                         changePage(currentPage + 1)
// // //                       }
// // //                       disabled={currentPage === totalPages - 1}
// // //                     >
// // //                       Next
// // //                     </button>

// // //                     <button
// // //                       onClick={() =>
// // //                         changePage(totalPages - 1)
// // //                       }
// // //                       disabled={currentPage === totalPages - 1}
// // //                     >
// // //                       »
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </>
// // //             )}
// // //           </section>
// // //         </div>
// // //       </div>

// // //       {/* DRAGGABLE HISTORY MODAL */}
// // //       {drawerOpen && (
// // //         <div className="history-modal-overlay">
// // //           <div
// // //             className="history-modal"
// // //             style={{ top: modalPos.y, left: modalPos.x }}
// // //             onMouseDown={startDrag}
// // //           >
// // //             <div
// // //               className="history-modal-header"
// // //               onMouseDown={startDrag}
// // //             >
// // //               <strong>Task History</strong>
// // //               <button className="btn-close" onClick={closeDrawer}>
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div className="history-modal-body">
// // //               {drawerHistory.length === 0 ? (
// // //                 <div className="empty">No history available</div>
// // //               ) : (
// // //                 drawerHistory.map((h, i) => (
// // //                   <div className="history-item" key={i}>
// // //                     <div className="history-top">
// // //                       <strong>{h.actionType}</strong>
// // //                       <span>
// // //                         {new Date(
// // //                           h.timestamp
// // //                         ).toLocaleString()}
// // //                       </span>
// // //                     </div>

// // //                     <div>
// // //                       <strong>{h.actionBy}</strong>
// // //                     </div>

// // //                     {h.comment && (
// // //                       <div className="history-comment">
// // //                         💬 {h.comment}
// // //                       </div>
// // //                     )}

// // //                     {h.fileUrl && (
// // //                       <div className="history-file">
// // //                         <a
// // //                           href={` http://10.69.8.236:8081/uploads/${h.fileUrl}`}
// // //                           target="_blank"
// // //                           rel="noreferrer"
// // //                         >
// // //                           📎 View File
// // //                         </a>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* EDIT MODAL */}
// // //       {editOpen && (
// // //         <div className="modal-overlay">
// // //           <div className="modal">
// // //             <div className="modal-header">
// // //               <h3>Edit Task</h3>
// // //               <button className="btn-close" onClick={closeEditPopup}>
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div className="modal-body">
// // //               <div className="form-field">
// // //                 <label>Title *</label>
// // //                 <input
// // //                   value={editForm.title}
// // //                   onChange={(e) =>
// // //                     setEditForm({
// // //                       ...editForm,
// // //                       title: e.target.value,
// // //                     })
// // //                   }
// // //                 />
// // //               </div>

// // //               <div className="form-field">
// // //                 <label>Description</label>
// // //                 <textarea
// // //                   rows={4}
// // //                   value={editForm.description}
// // //                   onChange={(e) =>
// // //                     setEditForm({
// // //                       ...editForm,
// // //                       description: e.target.value,
// // //                     })
// // //                   }
// // //                 ></textarea>
// // //               </div>

// // //               <div className="form-field">
// // //                 <label>Change Attachment (optional)</label>
// // //                 {!editForm.file ? (
// // //                   <input
// // //                     type="file"
// // //                     onChange={(e) =>
// // //                       setEditForm({
// // //                         ...editForm,
// // //                         file: e.target.files[0],
// // //                       })
// // //                     }
// // //                   />
// // //                 ) : (
// // //                   <FilePreview
// // //                     file={editForm.file}
// // //                     onRemove={() =>
// // //                       setEditForm({ ...editForm, file: null })
// // //                     }
// // //                   />
// // //                 )}

// // //                 {editForm.currentAttachmentUrl && (
// // //                   <UrlFilePreview
// // //                     url={editForm.currentAttachmentUrl}
// // //                     label="Current File"
// // //                     onPreview={(url) =>
// // //                       setPreview({ open: true, url })
// // //                     }
// // //                   />
// // //                 )}
// // //               </div>

// // //               {(user.role === "SUPER_ADMIN" ||
// // //                 user.role === "DEPT_HEAD") && (
// // //                   <div className="form-field">
// // //                     <label>Assignee *</label>
// // //                     <select
// // //                       value={editForm.assigneeId}
// // //                       onChange={(e) =>
// // //                         setEditForm({
// // //                           ...editForm,
// // //                           assigneeId: e.target.value,
// // //                         })
// // //                       }
// // //                     >
// // //                       <option value="">— Select —</option>

// // //                       {departments
// // //                         .filter(
// // //                           (d) =>
// // //                             user.role === "SUPER_ADMIN" ||
// // //                             getDeptId(user) === d.id
// // //                         )
// // //                         .flatMap((d) =>
// // //                           getUsersInDepartment(d.id)
// // //                             .filter(
// // //                               (u) => u.role !== "SUPER_ADMIN"
// // //                             )
// // //                             .map((u) => ({
// // //                               ...u,
// // //                               deptName: d.name,
// // //                             }))
// // //                         )
// // //                         .map((u) => (
// // //                           <option key={u.id} value={u.id}>
// // //                             {u.username} ({u.role}) - {u.deptName}
// // //                           </option>
// // //                         ))}
// // //                     </select>
// // //                   </div>
// // //                 )}
// // //             </div>

// // //             <div className="modal-footer">
// // //               <button
// // //                 className="btn btn-success"
// // //                 onClick={handleEditSave}
// // //               >
// // //                 Save Changes
// // //               </button>
// // //               <button
// // //                 className="btn btn-ghost"
// // //                 onClick={closeEditPopup}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* FULLSCREEN IMAGE PREVIEW (BLACK BG, BLUE-THEMED) */}
// // //       {preview.open && (
// // //         <div
// // //           className="image-preview-overlay"
// // //           onClick={() => setPreview({ open: false, url: null })}
// // //         >
// // //           <img
// // //             src={preview.url}
// // //             alt="Preview"
// // //             onClick={(e) => e.stopPropagation()}
// // //           />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import React from "react";
// // import Sidebar from "../components/Sidebar";
// // import Topbar from "../components/Topbar";
// // import "../styles/tasks.css";

// // // Hooks & Utils
// // import { useTasks } from "../hooks/useTasks";
// // import { 
// //   FilePreview, UrlFilePreview, StatCard, getStatusColor,
// //   getTodayRange, getThisWeekRange, getThisMonthRange, getLast30DaysRange 
// // } from "../utils/TaskHelpers";
// // import { HistoryDrawer, EditTaskModal, ImagePreviewOverlay } from "../components/TaskModals";

// // export default function TasksPage() {
// //   const {
// //     user, loading,
// //     tasks, departments,
// //     search, setSearch,
// //     showForm, setShowForm,
// //     statsView, setStatsView,
// //     form, setForm,
// //     proofFileMap, setProofFileMap,
// //     reviewComments, setReviewComments,
// //     pageSize, setPageSize, currentPage, setCurrentPage,
    
// //     // Filters
// //     deptFilterId, setDeptFilterId,
// //     startDateRange, setStartDateRange,
// //     endDateRange, setEndDateRange,
// //     completedDateFilter, setCompletedDateFilter,
// //     applyBackendFilters, clearAllFilters,

// //     // Actions
// //     handleCreate, handleStart, handleSubmit, handleReview, handleDelete,
// //     getAssignableUsers, getDeptId, getUsersInDepartment,
    
// //     // Modals
// //     expandedTask, setExpandedTask,
// //     drawerOpen, setDrawerOpen, drawerHistory, drawerClickEvent, openDrawer,
// //     editOpen, setEditOpen, editForm, setEditForm, openEditPopup, handleEditSave,
// //     preview, setPreview,
    
// //     // Permissions & Data
// //     canStartTask, canSubmitTask, canReviewTask, canEditTask, filteredTasks
// //   } = useTasks();

// //   if (loading) return <div className="p-4">Loading user profile...</div>;
// //   if (!user) return <div className="p-4">Please log in.</div>;

// //   // Quick Date Filter Handler
// //   const applyQuickRange = (rangeFunc) => {
// //     const { start, end } = rangeFunc();
// //     setStartDateRange(start);
// //     setEndDateRange(end);
// //     // Use timeout to allow state update before applying
// //     setTimeout(() => applyBackendFilters(), 50);
// //   };

// //   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
// //   const pageTasks = filteredTasks.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

// //   const changePage = (p) => {
// //     if (p < 0 || p >= totalPages) return;
// //     setCurrentPage(p);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   return (
// //     <div className="tasks-page">
// //       <Sidebar />
// //       <div className="tasks-main">
// //         <Topbar />
// //         <div className="tasks-container">
          
// //           {/* HEADER */}
// //           <div className="tasks-header">
// //             <h1 className="tasks-title">Task Management</h1>
// //             <div className="tasks-actions">
// //               <button className="btn btn-ghost" onClick={() => setStatsView(!statsView)}>
// //                 {statsView ? "Hide Stats" : "Show Stats"}
// //               </button>
// //               {(user.role === "SUPER_ADMIN" || user.role === "DEPT_HEAD") && (
// //                 <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
// //                   {showForm ? "Close Form" : "+ Create Task"}
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           {/* STATS */}
// //           {statsView && (
// //             <div className="stats-grid">
// //               <StatCard title="Total" value={tasks.length} color="#6b7280" />
// //               <StatCard title="Pending" value={tasks.filter((t) => t.status === "PENDING").length} color="#ffa200ff" />
// //               <StatCard title="In Progress" value={tasks.filter((t) => t.status === "IN_PROGRESS").length} color="#0062ffff" />
// //               <StatCard title="Submitted" value={tasks.filter((t) => t.status === "SUBMITTED").length} color="#8b5cf6" />
// //               <StatCard title="Completed" value={tasks.filter((t) => t.status === "COMPLETED").length} color="#10b981" />
// //               <StatCard title="Rejected" value={tasks.filter((t) => t.status === "REJECTED").length} color="#ff0000ff" />
// //             </div>
// //           )}

// //           {/* CREATE FORM */}
// //           {showForm && (
// //             <div className="create-card">
// //               <h3>Create Task</h3>
// //               <div className="create-grid">
// //                 {user.role === "SUPER_ADMIN" && (
// //                   <div className="form-field">
// //                     <label>Department *</label>
// //                     <select
// //                       value={form.selectedDepartmentId}
// //                       onChange={(e) => setForm({ ...form, selectedDepartmentId: e.target.value, assigneeId: "" })}
// //                     >
// //                       <option value="">— Select —</option>
// //                       {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
// //                     </select>
// //                   </div>
// //                 )}
// //                 <div className="form-field">
// //                   <label>Title *</label>
// //                   <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter title" />
// //                 </div>
// //                 <div className="form-field full">
// //                   <label>Description</label>
// //                   <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enter description"></textarea>
// //                 </div>
// //                 <div className="form-field">
// //                   <label>Attachment (optional)</label>
// //                   {!form.file ? (
// //                     <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
// //                   ) : (
// //                     <FilePreview file={form.file} onRemove={() => setForm({ ...form, file: null })} />
// //                   )}
// //                 </div>
// //                 {(user.role === "DEPT_HEAD" || (user.role === "SUPER_ADMIN" && form.selectedDepartmentId)) && (
// //                   <div className="form-field">
// //                     <label>Assignee *</label>
// //                     <select value={form.assigneeId} onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}>
// //                       <option value="">— Select —</option>
// //                       {user.role === "DEPT_HEAD" && <option value="ALL">Assign to ALL Employees</option>}
// //                       {getAssignableUsers().map((u) => (
// //                         <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 )}
// //               </div>
// //               <button className="btn btn-success mt-2" onClick={handleCreate}>Create Task</button>
// //             </div>
// //           )}

// //           {/* TASK LIST SECTION */}
// //           <section className="task-list">
// //             <h2 className="section-title">
// //               {user.role === "SUPER_ADMIN" ? "All Tasks" : user.role === "DEPT_HEAD" ? "Tasks I Created / My Dept" : "My Tasks"}
// //             </h2>

// //             {tasks.length === 0 ? (
// //               <div className="empty-state"><div className="empty-icon">📋</div>No tasks available</div>
// //             ) : (
// //               <>
// //                 {/* FILTER BAR */}
// //                 <div className="filter-container">
// //                   <div className="filter-row">
// //                     <div className="quick-filters">
// //                       <button className="btn-ghost" onClick={() => applyQuickRange(getTodayRange)}>Today</button>
// //                       <button className="btn-ghost" onClick={() => applyQuickRange(getThisWeekRange)}>This Week</button>
// //                       <button className="btn-ghost" onClick={() => applyQuickRange(getThisMonthRange)}>This Month</button>
// //                       <button className="btn-ghost" onClick={() => applyQuickRange(getLast30DaysRange)}>Last 30 Days</button>
// //                     </div>
// //                     <div className="filter-group search-bar">
// //                       <label>Search</label>
// //                       <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
// //                     </div>
// //                     {user.role === "SUPER_ADMIN" && (
// //                       <div className="filter-group">
// //                         <label>Department</label>
// //                         <select value={deptFilterId} onChange={(e) => setDeptFilterId(e.target.value)}>
// //                           <option value="">All Departments</option>
// //                           {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
// //                         </select>
// //                       </div>
// //                     )}
// //                     <div className="filter-group">
// //                       <label>Start Date</label>
// //                       <input type="date" value={startDateRange} onChange={(e) => setStartDateRange(e.target.value)} />
// //                     </div>
// //                     <div className="filter-group">
// //                       <label>End Date</label>
// //                       <input type="date" value={endDateRange} onChange={(e) => setEndDateRange(e.target.value)} />
// //                     </div>
// //                     <div className="filter-group">
// //                       <label>Completed Filter</label>
// //                       <select value={completedDateFilter} onChange={(e) => setCompletedDateFilter(e.target.value)}>
// //                         <option value="">All</option>
// //                         <option value="TODAY">Today</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                   <div className="filter-actions">
// //                     <button className="btn btn-primary" onClick={applyBackendFilters}>Apply Filters</button>
// //                     <button className="btn btn-ghost" onClick={clearAllFilters}>Clear All</button>
// //                   </div>
// //                 </div>

// //                 {/* TASK CARDS */}
// //                 <div className="tasks-grid">
// //                   {pageTasks.map((task) => (
// //                     <article className="task-card" key={task.id}>
// //                       <div className="task-card-header">
// //                         <h3 className="task-title">{task.title}</h3>
// //                         <span className="status-pill" style={{ backgroundColor: getStatusColor(task.status) }}>
// //                           {task.status}
// //                         </span>
// //                       </div>
// //                       <div className="task-meta">
// //                         <div><strong>Assignee:</strong> {task.assignee?.username} ({task.assignee?.role}) — {task.assignee?.departmentName || "N/A"}</div>
// //                         <div><strong>Creator:</strong> {task.creator?.username} ({task.creator?.role}) {task.creator?.departmentName ? `— ${task.creator.departmentName}` : ""}</div>
// //                         <div><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</div>
// //                       </div>
                      
// //                       {task.description && (
// //                         <>
// //                           <button className="link-btn" onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
// //                             {expandedTask === task.id ? "▲ Hide Description" : "▼ Show Description"}
// //                           </button>
// //                           {expandedTask === task.id && (
// //                             <div className="task-description">
// //                               <p>{task.description}</p>
// //                               {canEditTask(task) ? (
// //                                 <button className="btn btn-warning mt-1" onClick={() => openEditPopup(task)}>Edit Task</button>
// //                               ) : (
// //                                 task.creator?.email === user.email && <p className="edit-disabled-text">You can edit only within 5 minutes of creation.</p>
// //                               )}
// //                             </div>
// //                           )}
// //                         </>
// //                       )}

// //                       <div className="attachments">
// //                         <UrlFilePreview url={task.attachmentUrl} label="📎Creator Attachment" onPreview={(url) => setPreview({ open: true, url })} />
// //                         <UrlFilePreview url={task.proofUrl} label="📁Proof File" isImage onPreview={(url) => setPreview({ open: true, url })} />
// //                       </div>

// //                       <div className="card-actions">
// //                         {canStartTask(task) && (
// //                           <button className="btn btn-primary" onClick={() => handleStart(task.id)}>Start</button>
// //                         )}
// //                         {task.creator?.email === user.email && task.status === "PENDING" && canEditTask(task) && (
// //                           <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
// //                         )}
// //                         {canSubmitTask(task) && (
// //                           <div className="submit-row">
// //                             {proofFileMap[task.id]?.file ? (
// //                               <FilePreview
// //                                 file={proofFileMap[task.id].file}
// //                                 onRemove={() => {
// //                                   const cp = { ...proofFileMap };
// //                                   cp[task.id] = { file: null, comment: "" };
// //                                   setProofFileMap(cp);
// //                                 }}
// //                               />
// //                             ) : (
// //                               <input type="file" onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { file: e.target.files[0], comment: "" } })} />
// //                             )}
// //                             <textarea
// //                               rows={2} placeholder="Explain your work"
// //                               value={proofFileMap[task.id]?.comment || ""}
// //                               onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { ...proofFileMap[task.id], comment: e.target.value } })}
// //                             ></textarea>
// //                             <button className="btn btn-purple" disabled={!proofFileMap[task.id]?.file || !proofFileMap[task.id]?.comment} onClick={() => handleSubmit(task.id)}>Submit</button>
// //                           </div>
// //                         )}
// //                         {canReviewTask(task) && (
// //                           <div className="review-block">
// //                             <textarea rows={2} placeholder="Review comment" value={reviewComments[task.id] || ""} onChange={(e) => setReviewComments({ ...reviewComments, [task.id]: e.target.value })}></textarea>
// //                             <div className="review-actions">
// //                               <button className="btn btn-success" onClick={() => handleReview(task.id, "ACCEPT")}>✓ Accept</button>
// //                               <button className="btn btn-danger" onClick={() => handleReview(task.id, "REJECT")}>✕ Reject</button>
// //                             </div>
// //                           </div>
// //                         )}
// //                         <button className="btn btn-ghost" onClick={(e) => openDrawer(task.id, e)}>History</button>
// //                       </div>
// //                     </article>
// //                   ))}
// //                 </div>

// //                 {/* PAGINATION */}
// //                 <div className="pagination">
// //                   <div className="pagination-left">
// //                     Show
// //                     <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(0); }}>
// //                       <option value={5}>5</option><option value={8}>8</option><option value={12}>12</option><option value={20}>20</option>
// //                     </select>
// //                     items
// //                   </div>
// //                   <div className="pagination-controls">
// //                     <button onClick={() => changePage(0)} disabled={currentPage === 0}>«</button>
// //                     <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>Prev</button>
// //                     <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</button>
// //                     <button onClick={() => changePage(totalPages - 1)} disabled={currentPage === totalPages - 1}>»</button>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </section>
// //         </div>
// //       </div>

// //       {/* MODALS */}
// //       <HistoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} history={drawerHistory} clickEvent={drawerClickEvent} />
      
// //       <EditTaskModal 
// //         open={editOpen} onClose={() => setEditOpen(false)} 
// //         editForm={editForm} setEditForm={setEditForm} handleSave={handleEditSave}
// //         userRole={user.role} userDeptId={getDeptId(user)} 
// //         departments={departments} getUsersInDepartment={getUsersInDepartment}
// //         setPreview={setPreview}
// //       />
      
// //       <ImagePreviewOverlay open={preview.open} url={preview.url} onClose={() => setPreview({ open: false, url: null })} />
// //     </div>
// //   );
// // }

// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/tasks.css";

// // Hooks & Utils
// import { useTasks } from "../hooks/useTasks";
// import { 
//   FilePreview, UrlFilePreview, StatCard, getStatusColor,
//   getTodayRange, getThisWeekRange, getThisMonthRange, getLast30DaysRange 
// } from "../utils/TaskHelpers";
// import { HistoryDrawer, EditTaskModal, ImagePreviewOverlay } from "../components/TaskModals";
// import SearchableSelect from "../components/SearchableSelect";

// export default function TasksPage() {
//   const {
//     user, loading,
//     tasks, departments,
//     search, setSearch,
//     showForm, setShowForm,
//     statsView, setStatsView,
//     form, setForm,
//     proofFileMap, setProofFileMap,
//     reviewComments, setReviewComments,
//     pageSize, setPageSize, currentPage, setCurrentPage,
    
//     // Filters
//     deptFilterId, setDeptFilterId,
//     startDateRange, setStartDateRange,
//     endDateRange, setEndDateRange,
//     completedDateFilter, setCompletedDateFilter,
//     applyBackendFilters, clearAllFilters,

//     // Actions
//     handleCreate, handleStart, handleSubmit, handleReview, handleDelete,
//     getAssignableUsers, getDeptId, getUsersInDepartment, getUserDeptName,
    
//     // Modals
//     expandedTask, setExpandedTask,
//     drawerOpen, setDrawerOpen, drawerHistory, drawerClickEvent, openDrawer,
//     editOpen, setEditOpen, editForm, setEditForm, openEditPopup, handleEditSave,
//     preview, setPreview,
    
//     // Permissions & Data
//     canStartTask, canSubmitTask, canReviewTask, canEditTask, filteredTasks
//   } = useTasks();

//   if (loading) return <div className="p-4">Loading user profile...</div>;
//   if (!user) return <div className="p-4">Please log in.</div>;

//   // Quick Date Filter Handler
//   const applyQuickRange = (rangeFunc) => {
//     const { start, end } = rangeFunc();
//     setStartDateRange(start);
//     setEndDateRange(end);
//     // Use timeout to allow state update before applying
//     setTimeout(() => applyBackendFilters(), 50);
//   };

//   const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
//   const pageTasks = filteredTasks.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

//   const changePage = (p) => {
//     if (p < 0 || p >= totalPages) return;
//     setCurrentPage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="tasks-page">
//       <Sidebar />
//       <div className="tasks-main">
//         <Topbar />
//         <div className="tasks-container">
          
//           {/* HEADER */}
//           <div className="tasks-header">
//             <h1 className="tasks-title">Task Management</h1>
//             <div className="tasks-actions">
//               <button className="btn btn-ghost" onClick={() => setStatsView(!statsView)}>
//                 {statsView ? "Hide Stats" : "Show Stats"}
//               </button>
//               {(user.role === "SUPER_ADMIN" || user.role === "DEPT_HEAD") && (
//                 <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
//                   {showForm ? "Close Form" : "+ Create Task"}
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* STATS */}
//           {statsView && (
//             <div className="stats-grid">
//               <StatCard title="Total" value={tasks.length} color="#6b7280" />
//               <StatCard title="Pending" value={tasks.filter((t) => t.status === "PENDING").length} color="#ffa200ff" />
//               <StatCard title="In Progress" value={tasks.filter((t) => t.status === "IN_PROGRESS").length} color="#0062ffff" />
//               <StatCard title="Submitted" value={tasks.filter((t) => t.status === "SUBMITTED").length} color="#8b5cf6" />
//               <StatCard title="Completed" value={tasks.filter((t) => t.status === "COMPLETED").length} color="#10b981" />
//               <StatCard title="Rejected" value={tasks.filter((t) => t.status === "REJECTED").length} color="#ff0000ff" />
//             </div>
//           )}

//           {/* CREATE FORM */}
//           {showForm && (
//             <div className="create-card">
//               <h3>Create Task</h3>
//               <div className="create-grid">
//                 {user.role === "SUPER_ADMIN" && (
//                   <div className="form-field">
//                     <label>Department *</label>
//                     <select
//                       value={form.selectedDepartmentId}
//                       onChange={(e) => setForm({ ...form, selectedDepartmentId: e.target.value, assigneeId: "" })}
//                     >
//                       <option value="">— Select —</option>
//                       {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
//                     </select>
//                   </div>
//                 )}
//                 <div className="form-field">
//                   <label>Title *</label>
//                   <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter title" />
//                 </div>
//                 <div className="form-field full">
//                   <label>Description</label>
//                   <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enter description"></textarea>
//                 </div>
//                 <div className="form-field">
//                   <label>Attachment (optional)</label>
//                   {!form.file ? (
//                     <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
//                   ) : (
//                     <FilePreview file={form.file} onRemove={() => setForm({ ...form, file: null })} />
//                   )}
//                 </div>
//                 {(user.role === "DEPT_HEAD" || (user.role === "SUPER_ADMIN" && form.selectedDepartmentId)) && (
//                   <div className="form-field">
//                     <label>Assignee *</label>
//                     <select value={form.assigneeId} onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}>
//                       <option value="">— Select —</option>
//                       {user.role === "DEPT_HEAD" && <option value="ALL">Assign to ALL Employees</option>}
//                       {getAssignableUsers().map((u) => (
//                         <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </div>
//               <button className="btn btn-success mt-2" onClick={handleCreate}>Create Task</button>
//             </div>
//           )}

//           {/* TASK LIST SECTION */}
//           <section className="task-list">
//             <h2 className="section-title">
//               {user.role === "SUPER_ADMIN" ? "All Tasks" : user.role === "DEPT_HEAD" ? "Tasks I Created / My Dept" : "My Tasks"}
//             </h2>

//             {tasks.length === 0 ? (
//               <div className="empty-state"><div className="empty-icon">📋</div>No tasks available</div>
//             ) : (
//               <>
//                 {/* FILTER BAR */}
//                 <div className="filter-container">
//                   <div className="filter-row">
//                     <div className="quick-filters">
//                       <button className="btn-ghost" onClick={() => applyQuickRange(getTodayRange)}>Today</button>
//                       <button className="btn-ghost" onClick={() => applyQuickRange(getThisWeekRange)}>This Week</button>
//                       <button className="btn-ghost" onClick={() => applyQuickRange(getThisMonthRange)}>This Month</button>
//                       <button className="btn-ghost" onClick={() => applyQuickRange(getLast30DaysRange)}>Last 30 Days</button>
//                     </div>
//                     <div className="filter-group search-bar">
//                       <label>Search</label>
//                       <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
//                     </div>
//                     {user.role === "SUPER_ADMIN" && (
//                       <div className="filter-group">
//                         <label>Department</label>
//                         <select value={deptFilterId} onChange={(e) => setDeptFilterId(e.target.value)}>
//                           <option value="">All Departments</option>
//                           {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//                         </select>
//                       </div>
//                     )}
//                     <div className="filter-group">
//                       <label>Start Date</label>
//                       <input type="date" value={startDateRange} onChange={(e) => setStartDateRange(e.target.value)} />
//                     </div>
//                     <div className="filter-group">
//                       <label>End Date</label>
//                       <input type="date" value={endDateRange} onChange={(e) => setEndDateRange(e.target.value)} />
//                     </div>
//                     <div className="filter-group">
//                       <label>Completed Filter</label>
//                       <select value={completedDateFilter} onChange={(e) => setCompletedDateFilter(e.target.value)}>
//                         <option value="">All</option>
//                         <option value="TODAY">Today</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="filter-actions">
//                     <button className="btn btn-primary" onClick={applyBackendFilters}>Apply Filters</button>
//                     <button className="btn btn-ghost" onClick={clearAllFilters}>Clear All</button>
//                   </div>
//                 </div>

//                 {/* TASK CARDS */}
//                 <div className="tasks-grid">
//                   {pageTasks.map((task) => (
//                     <article className="task-card" key={task.id}>
//                       <div className="task-card-header">
//                         <h3 className="task-title">{task.title}</h3>
//                         <span className="status-pill" style={{ backgroundColor: getStatusColor(task.status) }}>
//                           {task.status}
//                         </span>
//                       </div>
//                       <div className="task-meta">
//                         <div>
//                             <strong>Assignee:</strong> {task.assignee?.username} ({task.assignee?.role || "EMP"}) — {getUserDeptName(task.assignee?.id)}
//                         </div>
//                         <div>
//                             <strong>Creator:</strong> {task.creator?.username} ({task.creator?.role || "HEAD"}) — {getUserDeptName(task.creator?.id)}
//                         </div>
//                         <div><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</div>
//                       </div>
                      
//                       {task.description && (
//                         <>
//                           <button className="link-btn" onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
//                             {expandedTask === task.id ? "▲ Hide Description" : "▼ Show Description"}
//                           </button>
//                           {expandedTask === task.id && (
//                             <div className="task-description">
//                               <p>{task.description}</p>
//                               {canEditTask(task) ? (
//                                 <button className="btn btn-warning mt-1" onClick={() => openEditPopup(task)}>Edit Task</button>
//                               ) : (
//                                 task.creator?.email === user.email && <p className="edit-disabled-text">You can edit only within 5 minutes of creation.</p>
//                               )}
//                             </div>
//                           )}
//                         </>
//                       )}

//                       <div className="attachments">
//                         <UrlFilePreview url={task.attachmentUrl} label="📎Creator Attachment" onPreview={(url) => setPreview({ open: true, url })} />
//                         <UrlFilePreview url={task.proofUrl} label="📁Proof File" isImage onPreview={(url) => setPreview({ open: true, url })} />
//                       </div>

//                       <div className="card-actions">
//                         {canStartTask(task) && (
//                           <button className="btn btn-primary" onClick={() => handleStart(task.id)}>Start</button>
//                         )}
//                         {task.creator?.email === user.email && task.status === "PENDING" && canEditTask(task) && (
//                           <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
//                         )}
//                         {canSubmitTask(task) && (
//                           <div className="submit-row">
//                             {proofFileMap[task.id]?.file ? (
//                               <FilePreview
//                                 file={proofFileMap[task.id].file}
//                                 onRemove={() => {
//                                   const cp = { ...proofFileMap };
//                                   cp[task.id] = { file: null, comment: "" };
//                                   setProofFileMap(cp);
//                                 }}
//                               />
//                             ) : (
//                               <input type="file" onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { file: e.target.files[0], comment: "" } })} />
//                             )}
//                             <textarea
//                               rows={2} placeholder="Explain your work (message)"
//                               value={proofFileMap[task.id]?.comment || ""}
//                               onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { ...proofFileMap[task.id], comment: e.target.value } })}
//                             ></textarea>
//                             <button className="btn btn-purple" disabled={!proofFileMap[task.id]?.file || !proofFileMap[task.id]?.comment} onClick={() => handleSubmit(task.id)}>Submit</button>
//                           </div>
//                         )}
//                         {canReviewTask(task) && (
//                           <div className="review-block">
//                             <textarea rows={2} placeholder="Review comment" value={reviewComments[task.id] || ""} onChange={(e) => setReviewComments({ ...reviewComments, [task.id]: e.target.value })}></textarea>
//                             <div className="review-actions">
//                               <button className="btn btn-success" onClick={() => handleReview(task.id, "ACCEPT")}>✓ Accept</button>
//                               <button className="btn btn-danger" onClick={() => handleReview(task.id, "REJECT")}>✕ Reject</button>
//                             </div>
//                           </div>
//                         )}
//                         <button className="btn btn-ghost" onClick={(e) => openDrawer(task.id, e)}>History</button>
//                       </div>
//                     </article>
//                   ))}
//                 </div>

//                 {/* PAGINATION */}
//                 <div className="pagination">
//                   <div className="pagination-left">
//                     Show
//                     <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(0); }}>
//                       <option value={5}>5</option><option value={8}>8</option><option value={12}>12</option><option value={20}>20</option>
//                     </select>
//                     items
//                   </div>
//                   <div className="pagination-controls">
//                     <button onClick={() => changePage(0)} disabled={currentPage === 0}>«</button>
//                     <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>Prev</button>
//                     <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</button>
//                     <button onClick={() => changePage(totalPages - 1)} disabled={currentPage === totalPages - 1}>»</button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </section>
//         </div>
//       </div>

//       {/* MODALS */}
//       <HistoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} history={drawerHistory} clickEvent={drawerClickEvent} />
      
//       <EditTaskModal 
//         open={editOpen} onClose={() => setEditOpen(false)} 
//         editForm={editForm} setEditForm={setEditForm} handleSave={handleEditSave}
//         userRole={user.role} userDeptId={getDeptId(user)} 
//         departments={departments} getUsersInDepartment={getUsersInDepartment}
//         setPreview={setPreview}
//       />
      
//       <ImagePreviewOverlay open={preview.open} url={preview.url} onClose={() => setPreview({ open: false, url: null })} />
//     </div>
//   );
// }


import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/tasks.css";

// Hooks & Utils
import { useTasks } from "../hooks/useTasks";
import {
  FilePreview,
  UrlFilePreview,
  StatCard,
  getStatusColor,
  getTodayRange,
  getThisWeekRange,
  getThisMonthRange,
  getLast30DaysRange,
} from "../utils/TaskHelpers";
import { HistoryDrawer, EditTaskModal, ImagePreviewOverlay } from "../components/TaskModals";
import SearchableSelect from "../components/SearchableSelect";

export default function TasksPage() {
  const {
    user,
    loading,
    tasks,
    users,
    departments,
    search,
    setSearch,
    showForm,
    setShowForm,
    statsView,
    setStatsView,
    form,
    setForm,
    proofFileMap,
    setProofFileMap,
    reviewComments,
    setReviewComments,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,

    // Filters
    deptFilterId,
    setDeptFilterId,
    startDateRange,
    setStartDateRange,
    endDateRange,
    setEndDateRange,
    completedDateFilter,
    setCompletedDateFilter,
    applyBackendFilters,
    clearAllFilters,

    // Actions
    handleCreate,
    handleStart,
    handleSubmit,
    handleReview,
    handleDelete,
    getAssignableUsers,
    getDeptId,
    getUsersInDepartment,
    getUserDeptName,

    // Modals & helpers
    expandedTask,
    setExpandedTask,
    drawerOpen,
    setDrawerOpen,
    drawerHistory,
    drawerClickEvent,
    openDrawer,
    editOpen,
    setEditOpen,
    editForm,
    setEditForm,
    openEditPopup,
    handleEditSave,
    preview,
    setPreview,

    // permissions & lists
    canStartTask,
    canSubmitTask,
    canReviewTask,
    canEditTask,
    filteredTasks,

    // pagination & mode from hook
    totalPages,
    totalElements,
    isServerPaging,
    setIsServerPaging,
    refreshAll,
  } = useTasks();

  // Local UI: allow DEPT_HEAD bulk assign toggle
  // We'll store a flag in form.assignAll true/false (non-persistent)
  // But to avoid mutating the hook object structure, use form.assigneeId === "ALL" for assigning all.
  // (Your handleCreate already understands "ALL")

  if (loading) return <div className="p-4">Loading user profile...</div>;
  if (!user) return <div className="p-4">Please log in.</div>;

  // Quick Date Filter Handler
  const applyQuickRange = (rangeFunc) => {
    const { start, end } = rangeFunc();
    setStartDateRange(start);
    setEndDateRange(end);
    // small delay to let state set
    setTimeout(() => applyBackendFilters(0), 60);
  };

  // When server-side paging is enabled, tasks[] is already the current page content,
  // totalPages and totalElements are provided by the hook.
  // When server-side paging is disabled we use filteredTasks and slice locally.
  const pageTasks = isServerPaging ? tasks : filteredTasks.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
  const computedTotalPages = isServerPaging ? (totalPages || 1) : Math.ceil(filteredTasks.length / pageSize) || 1;

  // sync page changes with server if using server paging
  useEffect(() => {
    if (isServerPaging) {
      // request the page content from server
      refreshAll(currentPage, pageSize, startDateRange || undefined, endDateRange || undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, isServerPaging]);

  const changePage = (p) => {
    if (p < 0 || p >= computedTotalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="tasks-page">
      <Sidebar />
      <div className="tasks-main">
        <Topbar />
        <div className="tasks-container">
          {/* HEADER */}
          <div className="tasks-header">
            <h1 className="tasks-title">Task Management</h1>
            <div className="tasks-actions">
              <button className="btn btn-ghost" onClick={() => setStatsView(!statsView)}>
                {statsView ? "Hide Stats" : "Show Stats"}
              </button>
              {(user.role === "SUPER_ADMIN" || user.role === "DEPT_HEAD") && (
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                  {showForm ? "Close Form" : "+ Create Task"}
                </button>
              )}
            </div>
          </div>

          {/* STATS */}
          {statsView && (
            <div className="stats-grid">
              <StatCard title="Total" value={tasks.length} color="#6b7280" />
              <StatCard title="Pending" value={tasks.filter((t) => t.status === "PENDING").length} color="#ffa200ff" />
              <StatCard title="In Progress" value={tasks.filter((t) => t.status === "IN_PROGRESS").length} color="#0062ffff" />
              <StatCard title="Submitted" value={tasks.filter((t) => t.status === "SUBMITTED").length} color="#8b5cf6" />
              <StatCard title="Completed" value={tasks.filter((t) => t.status === "COMPLETED").length} color="#10b981" />
              <StatCard title="Rejected" value={tasks.filter((t) => t.status === "REJECTED").length} color="#ff0000ff" />
            </div>
          )}

          {/* CREATE FORM */}
          {showForm && (
            <div className="create-card">
              <h3>Create Task</h3>
              <div className="create-grid">
                {user.role === "SUPER_ADMIN" && (
                  <div className="form-field">
                    <label>Department *</label>
                    <select
                      value={form.selectedDepartmentId}
                      onChange={(e) => setForm({ ...form, selectedDepartmentId: e.target.value, assigneeId: "" })}
                    >
                      <option value="">— Select —</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-field">
                  <label>Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter title" />
                </div>

                <div className="form-field full">
                  <label>Description</label>
                  <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enter description"></textarea>
                </div>

                <div className="form-field">
                  <label>Attachment (optional)</label>
                  {!form.file ? (
                    <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
                  ) : (
                    <FilePreview file={form.file} onRemove={() => setForm({ ...form, file: null })} />
                  )}
                </div>

                {(user.role === "DEPT_HEAD" || (user.role === "SUPER_ADMIN" && form.selectedDepartmentId)) && (
                  <div className="form-field">
                    <label>Assignee *</label>

                    {/* For Dept Head allow bulk assign option. If "Assign to ALL" is checked set assigneeId = "ALL" */}
                    {user.role === "DEPT_HEAD" ? (
                      <>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                          <label style={{ margin: 0, fontSize: 14 }}>
                            <input
                              type="checkbox"
                              checked={form.assigneeId === "ALL"}
                              onChange={(e) => {
                                if (e.target.checked) setForm({ ...form, assigneeId: "ALL" });
                                else setForm({ ...form, assigneeId: "" });
                              }}
                            />{" "}
                            Assign to ALL Employees
                          </label>
                        </div>

                        {form.assigneeId !== "ALL" && (
                          <SearchableSelect
                            options={getAssignableUsers()}
                            value={form.assigneeId}
                            onChange={(val) => setForm({ ...form, assigneeId: val })}
                            placeholder="Select employee..."
                            labelKey="username"
                            valueKey="id"
                          />
                        )}
                      </>
                    ) : (
                      // SUPER_ADMIN or others (when dept selected)
                      <SearchableSelect
                        options={getAssignableUsers()}
                        value={form.assigneeId}
                        onChange={(val) => setForm({ ...form, assigneeId: val })}
                        placeholder="Select employee..."
                        labelKey="username"
                        valueKey="id"
                      />
                    )}
                  </div>
                )}
              </div>

              <button className="btn btn-success mt-2" onClick={handleCreate}>
                Create Task
              </button>
            </div>
          )}

          {/* TASK LIST SECTION */}
          <section className="task-list">
            <h2 className="section-title">
              {user.role === "SUPER_ADMIN" ? "All Tasks" : user.role === "DEPT_HEAD" ? "Tasks I Created / My Dept" : "My Tasks"}
            </h2>

            { (isServerPaging ? (tasks.length === 0 && totalElements === 0) : tasks.length === 0 && filteredTasks.length === 0) ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>No tasks available
              </div>
            ) : (
              <>
                {/* FILTER BAR */}
                <div className="filter-container">
                  <div className="filter-row">
                    <div className="quick-filters">
                      <button className="btn-ghost" onClick={() => applyQuickRange(getTodayRange)}>
                        Today
                      </button>
                      <button className="btn-ghost" onClick={() => applyQuickRange(getThisWeekRange)}>
                        This Week
                      </button>
                      <button className="btn-ghost" onClick={() => applyQuickRange(getThisMonthRange)}>
                        This Month
                      </button>
                      <button className="btn-ghost" onClick={() => applyQuickRange(getLast30DaysRange)}>
                        Last 30 Days
                      </button>
                    </div>

                    <div className="filter-group search-bar">
                      <label>Search</label>
                      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                    </div>

                    {user.role === "SUPER_ADMIN" && (
                      <div className="filter-group">
                        <label>Department</label>
                        <select value={deptFilterId} onChange={(e) => setDeptFilterId(e.target.value)}>
                          <option value="">All Departments</option>
                          {departments.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="filter-group">
                      <label>Start Date</label>
                      <input type="date" value={startDateRange} onChange={(e) => setStartDateRange(e.target.value)} />
                    </div>

                    <div className="filter-group">
                      <label>End Date</label>
                      <input type="date" value={endDateRange} onChange={(e) => setEndDateRange(e.target.value)} />
                    </div>

                    <div className="filter-group">
                      <label>Completed Filter</label>
                      <select value={completedDateFilter} onChange={(e) => setCompletedDateFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="TODAY">Today</option>
                      </select>
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        // Always apply filters from first page
                        setCurrentPage(0);
                        applyBackendFilters(0);
                      }}
                    >
                      Apply Filters
                    </button>
                    <button className="btn btn-ghost" onClick={clearAllFilters}>
                      Clear All
                    </button>
                  </div>
                </div>

                {/* TASK CARDS */}
                <div className="tasks-grid">
                  {pageTasks.map((task) => (
                    <article className="task-card" key={task.id}>
                      <div className="task-card-header">
                        <h3 className="task-title">{task.title}</h3>
                        <span className="status-pill" style={{ backgroundColor: getStatusColor(task.status) }}>
                          {task.status}
                        </span>
                      </div>

                      <div className="task-meta">
                        <div>
                          <strong>Assignee:</strong> {task.assignee?.username} ({task.assignee?.role || "EMP"}) — {getUserDeptName(task.assignee?.id)}
                        </div>
                        <div>
                          <strong>Creator:</strong> {task.creator?.username} ({task.creator?.role || "HEAD"}) — {getUserDeptName(task.creator?.id)}
                        </div>
                        <div>
                          <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {task.description && (
                        <>
                          <button className="link-btn" onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}>
                            {expandedTask === task.id ? "▲ Hide Description" : "▼ Show Description"}
                          </button>
                          {expandedTask === task.id && (
                            <div className="task-description">
                              <p>{task.description}</p>
                              {canEditTask(task) ? (
                                <button className="btn btn-warning mt-1" onClick={() => openEditPopup(task)}>
                                  Edit Task
                                </button>
                              ) : (
                                task.creator?.email === user.email && <p className="edit-disabled-text">You can edit only within 5 minutes of creation.</p>
                              )}
                            </div>
                          )}
                        </>
                      )}

                      <div className="attachments">
                        <UrlFilePreview url={task.attachmentUrl} label="📎Creator Attachment" onPreview={(url) => setPreview({ open: true, url })} />
                        <UrlFilePreview url={task.proofUrl} label="📁Proof File" isImage onPreview={(url) => setPreview({ open: true, url })} />
                      </div>

                      <div className="card-actions">
                        {canStartTask(task) && <button className="btn btn-primary" onClick={() => handleStart(task.id)}>Start</button>}

                        {task.creator?.email === user.email && task.status === "PENDING" && canEditTask(task) && (
                          <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
                            Delete
                          </button>
                        )}

                        {canSubmitTask(task) && (
                          <div className="submit-row">
                            {proofFileMap[task.id]?.file ? (
                              <FilePreview
                                file={proofFileMap[task.id].file}
                                onRemove={() => {
                                  const cp = { ...proofFileMap };
                                  cp[task.id] = { file: null, comment: "" };
                                  setProofFileMap(cp);
                                }}
                              />
                            ) : (
                              <input
                                type="file"
                                onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { file: e.target.files[0], comment: "" } })}
                              />
                            )}

                            <textarea
                              rows={2}
                              placeholder="Explain your work (message)"
                              value={proofFileMap[task.id]?.comment || ""}
                              onChange={(e) => setProofFileMap({ ...proofFileMap, [task.id]: { ...proofFileMap[task.id], comment: e.target.value } })}
                            ></textarea>

                            <button
                              className="btn btn-purple"
                              disabled={!proofFileMap[task.id]?.file || !proofFileMap[task.id]?.comment}
                              onClick={() => handleSubmit(task.id)}
                            >
                              Submit
                            </button>
                          </div>
                        )}

                        {canReviewTask(task) && (
                          <div className="review-block">
                            <textarea rows={2} placeholder="Review comment" value={reviewComments[task.id] || ""} onChange={(e) => setReviewComments({ ...reviewComments, [task.id]: e.target.value })}></textarea>
                            <div className="review-actions">
                              <button className="btn btn-success" onClick={() => handleReview(task.id, "ACCEPT")}>✓ Accept</button>
                              <button className="btn btn-danger" onClick={() => handleReview(task.id, "REJECT")}>✕ Reject</button>
                            </div>
                          </div>
                        )}

                        <button className="btn btn-ghost" onClick={(e) => openDrawer(task.id, e)}>
                          History
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="pagination">
                  <div className="pagination-left">
                    Show
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        const newSize = Number(e.target.value);
                        setPageSize(newSize);
                        setCurrentPage(0);
                        // if using server paging, refresh will trigger through useEffect
                        if (!isServerPaging) {
                          // client-side: nothing else required
                        }
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={20}>20</option>
                    </select>
                    items
                  </div>

                  <div className="pagination-controls">
                    <button onClick={() => changePage(0)} disabled={currentPage === 0}>
                      «
                    </button>
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
                      Prev
                    </button>
                    <span style={{ padding: "0 8px", alignSelf: "center" }}>
                      Page {currentPage + 1} of {computedTotalPages}
                    </span>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === computedTotalPages - 1}>
                      Next
                    </button>
                    <button onClick={() => changePage(computedTotalPages - 1)} disabled={currentPage === computedTotalPages - 1}>
                      »
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      {/* MODALS */}
      <HistoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} history={drawerHistory} clickEvent={drawerClickEvent} />

      <EditTaskModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editForm={editForm}
        setEditForm={setEditForm}
        handleSave={handleEditSave}
        userRole={user.role}
        userDeptId={getDeptId(user)}
        departments={departments}
        getUsersInDepartment={getUsersInDepartment}
        setPreview={setPreview}
      />

      <ImagePreviewOverlay open={preview.open} url={preview.url} onClose={() => setPreview({ open: false, url: null })} />
    </div>
  );
}
