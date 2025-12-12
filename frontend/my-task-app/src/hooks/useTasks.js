// // import { useState, useEffect, useContext } from "react";
// // import toast from "react-hot-toast";
// // import { AuthContext } from "../context/AuthContext";
// // import {
// //   listTasks,
// //   createTask,
// //   startTask,
// //   submitTask,
// //   reviewTask,
// //   getTaskHistory,
// //   updateTask,
// //   getTasksByDepartment,
// //   deleteTask,
// // } from "../api/tasks";
// // import { listUsers } from "../api/users";
// // import { listDepartments } from "../api/departments";
// // import { getStartOfDay } from "../utils/TaskHelpers";

// // export function useTasks() {
// //   const { user, loading: userLoading } = useContext(AuthContext);

// //   // Data State
// //   const [tasks, setTasks] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [departments, setDepartments] = useState([]);

// //   // UI State
// //   const [search, setSearch] = useState("");
// //   const [showForm, setShowForm] = useState(false);
// //   const [statsView, setStatsView] = useState(false);
// //   const [expandedTask, setExpandedTask] = useState(null);
  
// //   // Forms & Inputs
// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     selectedDepartmentId: "",
// //     assigneeId: "",
// //     file: null,
// //   });
// //   const [proofFileMap, setProofFileMap] = useState({});
// //   const [reviewComments, setReviewComments] = useState({});

// //   // Pagination
// //   const [pageSize, setPageSize] = useState(8);
// //   const [currentPage, setCurrentPage] = useState(0);

// //   // Modals & Drawers
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [drawerTaskId, setDrawerTaskId] = useState(null);
// //   const [drawerHistory, setDrawerHistory] = useState([]);
// //   const [drawerClickEvent, setDrawerClickEvent] = useState(null); // To pass click position

// //   const [editOpen, setEditOpen] = useState(false);
// //   const [editForm, setEditForm] = useState({
// //     id: null,
// //     title: "",
// //     description: "",
// //     assigneeId: "",
// //     file: null,
// //     createdAt: null,
// //     creatorId: null,
// //     currentAttachmentUrl: null,
// //   });

// //   const [preview, setPreview] = useState({ open: false, url: null });

// //   // Filters
// //   const [deptFilterId, setDeptFilterId] = useState("");
// //   const [startDateRange, setStartDateRange] = useState("");
// //   const [endDateRange, setEndDateRange] = useState("");
// //   const [completedDateFilter, setCompletedDateFilter] = useState("");
// //   const [isFilteringBackend, setIsFilteringBackend] = useState(false);

// //   /* ========== HELPERS ========== */
// //   const getDeptId = (obj) => (obj ? obj.departmentId || null : null);

// //   const getUsersInDepartment = (deptId) => {
// //     return users.filter(
// //       (u) => (u.departmentId || u.department?.id) === Number(deptId)
// //     );
// //   };

// //   const getAssignableUsers = () => {
// //     if (!user) return [];
// //     if (user.role === "SUPER_ADMIN") {
// //       if (!form.selectedDepartmentId) return [];
// //       return getUsersInDepartment(form.selectedDepartmentId).filter(
// //         (u) => u.role === "DEPT_HEAD" || u.role === "EMPLOYEE"
// //       );
// //     }
// //     if (user.role === "DEPT_HEAD") {
// //       const dept = getDeptId(user);
// //       return getUsersInDepartment(dept).filter((u) => u.role === "EMPLOYEE");
// //     }
// //     return [];
// //   };

// //   /* ========== FETCH LOGIC ========== */
// //   const normalizeTask = (t) => ({
// //     ...t,
// //     assignee: {
// //       ...(t.assignee || {}),
// //       departmentId: t.assignee?.departmentId ?? null,
// //       departmentName: t.assignee?.departmentName ?? null,
// //     },
// //     creator: {
// //       ...(t.creator || {}),
// //       departmentId: t.creator?.departmentId ?? null,
// //       departmentName: t.creator?.departmentName ?? null,
// //     },
// //   });

// //   const filterForUserRole = (tasksData) => {
// //     if (user.role === "DEPT_HEAD") {
// //       const myDept = getDeptId(user);
// //       return tasksData.filter((t) => {
// //         return (
// //           t.creator?.id === user.id ||
// //           t.assignee?.id === user.id ||
// //           getDeptId(t.assignee) === myDept ||
// //           getDeptId(t.creator) === myDept
// //         );
// //       });
// //     }
// //     if (user.role === "EMPLOYEE") {
// //       return tasksData.filter((t) => t.assignee?.id === user.id);
// //     }
// //     return tasksData;
// //   };

// //   const refreshAll = async () => {
// //     try {
// //       const tasksData = await listTasks();
// //       const filtered = filterForUserRole(tasksData);
// //       setTasks((filtered || []).map(normalizeTask));
// //       setIsFilteringBackend(false);

// //       if (user.role !== "EMPLOYEE") {
// //         const [u, d] = await Promise.all([listUsers(), listDepartments()]);
// //         setUsers(u || []);
// //         setDepartments(d || []);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Refresh failed");
// //     }
// //   };

// //   useEffect(() => {
// //     if (user) refreshAll();
// //     // eslint-disable-next-line
// //   }, [user]);

// //   /* ========== ACTIONS ========== */
// //   const applyBackendFilters = async () => {
// //     if (user.role === "SUPER_ADMIN" && deptFilterId) {
// //       try {
// //         const tasksData = await getTasksByDepartment(
// //           deptFilterId,
// //           startDateRange || undefined,
// //           endDateRange || undefined
// //         );
// //         setTasks((tasksData || []).map(normalizeTask));
// //         setIsFilteringBackend(true);
// //         setCurrentPage(0);
// //         toast.success("Department filter applied");
// //       } catch (err) {
// //         toast.error(err?.message || "Failed filter");
// //       }
// //     } else if (startDateRange || endDateRange) {
// //       try {
// //         const tasksData = await listTasks();
// //         let filtered = filterForUserRole(tasksData);
        
// //         const startTime = startDateRange ? new Date(startDateRange).getTime() : 0;
// //         const endTime = endDateRange ? new Date(endDateRange + "T23:59:59").getTime() : Infinity;

// //         filtered = filtered.filter((t) => {
// //           const createdTime = new Date(t.createdAt).getTime();
// //           return createdTime >= startTime && createdTime <= endTime;
// //         });

// //         setTasks(filtered.map(normalizeTask));
// //         setIsFilteringBackend(true);
// //         setCurrentPage(0);
// //         toast.success("Date filter applied");
// //       } catch (err) {
// //         toast.error("Failed to apply date filter");
// //       }
// //     } else {
// //       toast.error("Please select filters to apply");
// //     }
// //   };

// //   const clearAllFilters = async () => {
// //     setDeptFilterId("");
// //     setStartDateRange("");
// //     setEndDateRange("");
// //     setCompletedDateFilter("");
// //     setIsFilteringBackend(false);
// //     await refreshAll();
// //     toast.success("All filters cleared");
// //   };

// //   const handleCreate = async () => {
// //     if (!form.title.trim()) return toast.error("Title required");
// //     if (!form.assigneeId) return toast.error("Select assignee");

// //     try {
// //       if (form.assigneeId === "ALL") {
// //         const deptToUse = user.role === "SUPER_ADMIN" ? form.selectedDepartmentId : getDeptId(user);
// //         const employees = getUsersInDepartment(deptToUse).filter((u) => u.role === "EMPLOYEE");
// //         for (const emp of employees) {
// //           await createTask({
// //             title: form.title,
// //             description: form.description,
// //             assigneeId: emp.id,
// //             file: form.file,
// //           });
// //         }
// //         toast.success("Created tasks for all employees");
// //       } else {
// //         await createTask({
// //           title: form.title,
// //           description: form.description,
// //           assigneeId: Number(form.assigneeId),
// //           file: form.file,
// //         });
// //         toast.success("Task created");
// //       }

// //       if (isFilteringBackend && (deptFilterId || startDateRange || endDateRange)) {
// //         await applyBackendFilters();
// //       } else {
// //         await refreshAll();
// //       }
// //       setShowForm(false);
// //       setForm({ title: "", description: "", selectedDepartmentId: "", assigneeId: "", file: null });
// //       setCurrentPage(0);
// //     } catch (err) {
// //       toast.error("Create failed");
// //     }
// //   };

// //   const handleStart = async (id) => {
// //     try {
// //       await startTask(id);
// //       toast.success("Started");
// //       if (isFilteringBackend) await applyBackendFilters();
// //       else await refreshAll();
// //     } catch (e) {
// //       toast.error(e?.response?.data || "Start failed");
// //     }
// //   };

// //   const handleSubmit = async (id) => {
// //     const entry = proofFileMap[id];
// //     if (!entry?.file) return toast.error("Attach proof file");
// //     if (!entry?.comment.trim()) return toast.error("Please write an explanation");

// //     try {
// //       await submitTask(id, entry.file, entry.comment);
// //       toast.success("Submitted");
// //       const cp = { ...proofFileMap };
// //       delete cp[id];
// //       setProofFileMap(cp);
// //       if (isFilteringBackend) await applyBackendFilters();
// //       else await refreshAll();
// //     } catch (e) {
// //       toast.error(e?.response?.data || "Submit failed");
// //     }
// //   };

// //   const handleReview = async (id, action) => {
// //     try {
// //       const comment = reviewComments[id] || "";
// //       await reviewTask(id, { action, comment });
// //       toast.success(`${action}ed`);
// //       const cp = { ...reviewComments };
// //       delete cp[id];
// //       setReviewComments(cp);
// //       if (isFilteringBackend) await applyBackendFilters();
// //       else await refreshAll();
// //       if (drawerTaskId === id) openDrawer(id, null);
// //     } catch (err) {
// //       toast.error(err?.response?.data || "Review failed");
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await deleteTask(id);
// //       toast.success("Task deleted");
// //       if (isFilteringBackend) await applyBackendFilters();
// //       else await refreshAll();
// //     } catch (err) {
// //       toast.error(err?.response?.data || "Delete failed");
// //     }
// //   };

// //   /* ========== PERMISSIONS ========== */
// //   const canStartTask = (t) => t.assignee?.email === user.email && t.status === "PENDING";
// //   const canSubmitTask = (t) => t.assignee?.email === user.email && t.status === "IN_PROGRESS";
// //   const canReviewTask = (t) => t.creator?.email === user.email && t.status === "SUBMITTED";
// //   const canEditTask = (task) => {
// //     if (task.creator?.email !== user.email) return false;
// //     const diffMin = (Date.now() - new Date(task.createdAt).getTime()) / 60000;
// //     return diffMin <= 5;
// //   };

// //   /* ========== MODAL LOGIC ========== */
// //   const openDrawer = async (id, event) => {
// //     setDrawerClickEvent(event); // Store event for positioning
// //     try {
// //       const hist = await getTaskHistory(id);
// //       setDrawerHistory(hist || []);
// //       setDrawerTaskId(id);
// //       setDrawerOpen(true);
// //     } catch {
// //       toast.error("Failed to load history");
// //     }
// //   };

// //   const openEditPopup = (task) => {
// //     setEditForm({
// //       id: task.id,
// //       title: task.title,
// //       description: task.description,
// //       assigneeId: task.assignee?.id || "",
// //       file: null,
// //       createdAt: task.createdAt,
// //       creatorId: task.creator?.id,
// //       currentAttachmentUrl: task.attachmentUrl,
// //     });
// //     setEditOpen(true);
// //   };

// //   const handleEditSave = async () => {
// //     if (!editForm.title.trim()) return toast.error("Title required");
// //     if (!editForm.assigneeId) return toast.error("Select assignee");

// //     try {
// //       await updateTask(editForm.id, {
// //         title: editForm.title,
// //         description: editForm.description,
// //         assigneeId: Number(editForm.assigneeId),
// //         file: editForm.file,
// //       });
// //       toast.success("Task updated");
// //       setEditOpen(false);
// //       if (isFilteringBackend) await applyBackendFilters();
// //       else await refreshAll();
// //     } catch (err) {
// //       toast.error(err?.response?.data || "Update failed");
// //     }
// //   };

// //   /* ========== FILTERED LIST ========== */
// //   const filteredTasks = tasks.filter((t) => {
// //     const text = search.toLowerCase();
// //     const passesSearch =
// //       t.title?.toLowerCase().includes(text) ||
// //       t.status?.toLowerCase().includes(text) ||
// //       t.assignee?.username?.toLowerCase().includes(text) ||
// //       t.creator?.username?.toLowerCase().includes(text);

// //     if (!passesSearch) return false;

// //     if (completedDateFilter && t.status === "COMPLETED") {
// //       if (completedDateFilter === "TODAY")
// //         return new Date(t.completedAt || t.updatedAt).getTime() >= getStartOfDay();
// //     } else if (completedDateFilter && t.status !== "COMPLETED") {
// //       return false;
// //     }
// //     return true;
// //   });

// //   return {
// //     user, loading: userLoading,
// //     tasks, users, departments,
// //     search, setSearch,
// //     showForm, setShowForm,
// //     statsView, setStatsView,
// //     form, setForm,
// //     proofFileMap, setProofFileMap,
// //     reviewComments, setReviewComments,
// //     pageSize, setPageSize,
// //     currentPage, setCurrentPage,
    
// //     // Filters
// //     deptFilterId, setDeptFilterId,
// //     startDateRange, setStartDateRange,
// //     endDateRange, setEndDateRange,
// //     completedDateFilter, setCompletedDateFilter,
// //     applyBackendFilters, clearAllFilters,

// //     // Actions
// //     handleCreate, handleStart, handleSubmit, handleReview, handleDelete,
// //     getAssignableUsers, getDeptId, getUsersInDepartment,
    
// //     // Drawers & Modals
// //     expandedTask, setExpandedTask,
// //     drawerOpen, setDrawerOpen,
// //     drawerTaskId, drawerHistory, drawerClickEvent, openDrawer,
// //     editOpen, setEditOpen, editForm, setEditForm, openEditPopup, handleEditSave,
// //     preview, setPreview,
    
// //     // Permissions & Lists
// //     canStartTask, canSubmitTask, canReviewTask, canEditTask,
// //     filteredTasks
// //   };
// // }


// import { useState, useEffect, useContext } from "react";
// import toast from "react-hot-toast";
// import { AuthContext } from "../context/AuthContext";
// import {
//   listTasks, // Should call GET /api/v1/tasks
//   createTask,
//   startTask,
//   submitTask,
//   reviewTask,
//   getTaskHistory,
//   updateTask,
//   getTasksByDepartment,
//   deleteTask,
// } from "../api/tasks";
// import { listUsers } from "../api/users";
// import { listDepartments } from "../api/departments";
// import { getStartOfDay } from "../utils/TaskHelpers";

// export function useTasks() {
//   const { user, loading: userLoading } = useContext(AuthContext);

//   // Data State
//   const [tasks, setTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   // UI State
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [statsView, setStatsView] = useState(false);
//   const [expandedTask, setExpandedTask] = useState(null);
  
//   // Forms & Inputs
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     selectedDepartmentId: "",
//     assigneeId: "",
//     file: null,
//   });
//   const [proofFileMap, setProofFileMap] = useState({});
//   const [reviewComments, setReviewComments] = useState({});

//   // Pagination
//   const [pageSize, setPageSize] = useState(8);
//   const [currentPage, setCurrentPage] = useState(0);

//   // Modals & Drawers
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [drawerTaskId, setDrawerTaskId] = useState(null);
//   const [drawerHistory, setDrawerHistory] = useState([]);
//   const [drawerClickEvent, setDrawerClickEvent] = useState(null);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState({
//     id: null,
//     title: "",
//     description: "",
//     assigneeId: "",
//     file: null,
//     createdAt: null,
//     creatorId: null,
//     currentAttachmentUrl: null,
//   });

//   const [preview, setPreview] = useState({ open: false, url: null });

//   // Filters
//   const [deptFilterId, setDeptFilterId] = useState("");
//   const [startDateRange, setStartDateRange] = useState("");
//   const [endDateRange, setEndDateRange] = useState("");
//   const [completedDateFilter, setCompletedDateFilter] = useState("");
//   const [isFilteringBackend, setIsFilteringBackend] = useState(false);

//   /* ========== HELPERS ========== */
//   const getDeptId = (obj) => (obj ? obj.departmentId || null : null);

//   const getUsersInDepartment = (deptId) => {
//     return users.filter(
//       (u) => (u.departmentId || u.department?.id) === Number(deptId)
//     );
//   };

//   // Backend DTO might not have dept name, so we lookup from the users list
//   const getUserDeptName = (userId) => {
//     const found = users.find(u => u.id === userId);
//     return found?.departmentName || found?.department?.name || "N/A";
//   };

//   const getAssignableUsers = () => {
//     if (!user) return [];
//     if (user.role === "SUPER_ADMIN") {
//       if (!form.selectedDepartmentId) return [];
//       return getUsersInDepartment(form.selectedDepartmentId).filter(
//         (u) => u.role === "DEPT_HEAD" || u.role === "EMPLOYEE"
//       );
//     }
//     if (user.role === "DEPT_HEAD") {
//       const dept = getDeptId(user);
//       return getUsersInDepartment(dept).filter((u) => u.role === "EMPLOYEE");
//     }
//     return [];
//   };

//   /* ========== FETCH LOGIC ========== */
  
//   // Refreshes tasks. Optional: pass dates to backend
//   const refreshAll = async (start = null, end = null) => {
//     try {
//       // If dates are provided, we pass them as query params to listTasks
//       const tasksData = await listTasks(start, end); 
//       setTasks(tasksData || []);
      
//       // If no dates provided, we aren't "filtering" in backend mode
//       if(!start && !end) setIsFilteringBackend(false);

//       if (user.role !== "EMPLOYEE") {
//         const [u, d] = await Promise.all([listUsers(), listDepartments()]);
//         setUsers(u || []);
//         setDepartments(d || []);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Refresh failed");
//     }
//   };

//   useEffect(() => {
//     if (user) refreshAll();
//     // eslint-disable-next-line
//   }, [user]);

//   /* ========== ACTIONS ========== */
  
//   const applyBackendFilters = async () => {
//     // Super Admin Department Filter
//     if (user.role === "SUPER_ADMIN" && deptFilterId) {
//       try {
//         const tasksData = await getTasksByDepartment(
//           deptFilterId,
//           startDateRange || undefined,
//           endDateRange || undefined
//         );
//         setTasks(tasksData || []);
//         setIsFilteringBackend(true);
//         setCurrentPage(0);
//         toast.success("Department filter applied");
//       } catch (err) {
//         toast.error(err?.message || "Failed filter");
//       }
//     } 
//     // Date Range Filter (For everyone)
//     else if (startDateRange || endDateRange) {
//       try {
//         // We call refreshAll with params to hit backend with ?startDate=X&endDate=Y
//         await refreshAll(startDateRange, endDateRange);
//         setIsFilteringBackend(true);
//         setCurrentPage(0);
//         toast.success("Date filter applied");
//       } catch (err) {
//         toast.error("Failed to apply date filter");
//       }
//     } else {
//       toast.error("Please select filters to apply");
//     }
//   };

//   const clearAllFilters = async () => {
//     setDeptFilterId("");
//     setStartDateRange("");
//     setEndDateRange("");
//     setCompletedDateFilter("");
//     setIsFilteringBackend(false);
//     await refreshAll(); // Load all without dates
//     toast.success("All filters cleared");
//   };

//   const handleCreate = async () => {
//     if (!form.title.trim()) return toast.error("Title required");
//     if (!form.assigneeId) return toast.error("Select assignee");

//     try {
//       if (form.assigneeId === "ALL") {
//         const deptToUse = user.role === "SUPER_ADMIN" ? form.selectedDepartmentId : getDeptId(user);
//         const employees = getUsersInDepartment(deptToUse).filter((u) => u.role === "EMPLOYEE");
        
//         for (const emp of employees) {
//           await createTask({
//             title: form.title,
//             description: form.description,
//             assigneeId: emp.id,
//             file: form.file,
//           });
//         }
//         toast.success("Created tasks for all employees");
//       } else {
//         await createTask({
//           title: form.title,
//           description: form.description,
//           assigneeId: Number(form.assigneeId),
//           file: form.file,
//         });
//         toast.success("Task created");
//       }

//       // Refresh based on current filter state
//       if (isFilteringBackend && (startDateRange || endDateRange)) {
//         await applyBackendFilters();
//       } else {
//         await refreshAll();
//       }
      
//       setShowForm(false);
//       setForm({ title: "", description: "", selectedDepartmentId: "", assigneeId: "", file: null });
//       setCurrentPage(0);
//     } catch (err) {
//       toast.error("Create failed");
//     }
//   };

//   const handleStart = async (id) => {
//     try {
//       await startTask(id);
//       toast.success("Started");
//       if (isFilteringBackend) await applyBackendFilters();
//       else await refreshAll();
//     } catch (e) {
//       toast.error(e?.response?.data || "Start failed");
//     }
//   };

//   const handleSubmit = async (id) => {
//     const entry = proofFileMap[id];
//     if (!entry?.file) return toast.error("Attach proof file");
//     // Message is optional in backend, but let's keep it as good practice or enforce if needed
    
//     try {
//       // Backend expects 'message' param, not comment
//       await submitTask(id, entry.file, entry.comment); 
//       toast.success("Submitted");
      
//       const cp = { ...proofFileMap };
//       delete cp[id];
//       setProofFileMap(cp);
      
//       if (isFilteringBackend) await applyBackendFilters();
//       else await refreshAll();
//     } catch (e) {
//       toast.error(e?.response?.data || "Submit failed");
//     }
//   };

//   const handleReview = async (id, action) => {
//     try {
//       const comment = reviewComments[id] || "";
//       await reviewTask(id, { action, comment });
//       toast.success(`${action}ed`);
      
//       const cp = { ...reviewComments };
//       delete cp[id];
//       setReviewComments(cp);
      
//       if (isFilteringBackend) await applyBackendFilters();
//       else await refreshAll();
      
//       if (drawerTaskId === id) openDrawer(id, null);
//     } catch (err) {
//       toast.error(err?.response?.data || "Review failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id);
//       toast.success("Task deleted");
//       if (isFilteringBackend) await applyBackendFilters();
//       else await refreshAll();
//     } catch (err) {
//       toast.error(err?.response?.data || "Delete failed");
//     }
//   };

//   /* ========== PERMISSIONS ========== */
//   const canStartTask = (t) => t.assignee?.email === user.email && t.status === "PENDING";
//   const canSubmitTask = (t) => t.assignee?.email === user.email && t.status === "IN_PROGRESS"; // Backend allows rejected/pending to submit too, but let's stick to progress/pending
//   const canReviewTask = (t) => t.creator?.email === user.email && t.status === "SUBMITTED";
  
//   const canEditTask = (task) => {
//     if (task.creator?.email !== user.email) return false;
//     const diffMin = (Date.now() - new Date(task.createdAt).getTime()) / 60000;
//     return diffMin <= 5;
//   };

//   /* ========== MODAL LOGIC ========== */
//   const openDrawer = async (id, event) => {
//     setDrawerClickEvent(event); 
//     try {
//       const hist = await getTaskHistory(id);
//       setDrawerHistory(hist || []);
//       setDrawerTaskId(id);
//       setDrawerOpen(true);
//     } catch {
//       toast.error("Failed to load history");
//     }
//   };

//   const openEditPopup = (task) => {
//     setEditForm({
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       assigneeId: task.assignee?.id || "",
//       file: null,
//       createdAt: task.createdAt,
//       creatorId: task.creator?.id,
//       currentAttachmentUrl: task.attachmentUrl,
//     });
//     setEditOpen(true);
//   };

//   const handleEditSave = async () => {
//     if (!editForm.title.trim()) return toast.error("Title required");
//     if (!editForm.assigneeId) return toast.error("Select assignee");

//     try {
//       await updateTask(editForm.id, {
//         title: editForm.title,
//         description: editForm.description,
//         assigneeId: Number(editForm.assigneeId),
//         file: editForm.file,
//       });
//       toast.success("Task updated");
//       setEditOpen(false);
//       if (isFilteringBackend) await applyBackendFilters();
//       else await refreshAll();
//     } catch (err) {
//       toast.error(err?.response?.data || "Update failed");
//     }
//   };

//   /* ========== FILTERED LIST (Client Side Search) ========== */
//   const filteredTasks = tasks.filter((t) => {
//     const text = search.toLowerCase();
//     const passesSearch =
//       t.title?.toLowerCase().includes(text) ||
//       t.status?.toLowerCase().includes(text) ||
//       t.assignee?.username?.toLowerCase().includes(text) ||
//       t.creator?.username?.toLowerCase().includes(text);

//     if (!passesSearch) return false;

//     if (completedDateFilter && t.status === "COMPLETED") {
//       if (completedDateFilter === "TODAY")
//         return new Date(t.completedAt || t.updatedAt).getTime() >= getStartOfDay();
//     } else if (completedDateFilter && t.status !== "COMPLETED") {
//       return false;
//     }
//     return true;
//   });

//   return {
//     user, loading: userLoading,
//     tasks, users, departments,
//     search, setSearch,
//     showForm, setShowForm,
//     statsView, setStatsView,
//     form, setForm,
//     proofFileMap, setProofFileMap,
//     reviewComments, setReviewComments,
//     pageSize, setPageSize,
//     currentPage, setCurrentPage,
    
//     // Filters
//     deptFilterId, setDeptFilterId,
//     startDateRange, setStartDateRange,
//     endDateRange, setEndDateRange,
//     completedDateFilter, setCompletedDateFilter,
//     applyBackendFilters, clearAllFilters,

//     // Actions
//     handleCreate, handleStart, handleSubmit, handleReview, handleDelete,
//     getAssignableUsers, getDeptId, getUsersInDepartment, getUserDeptName,
    
//     // Drawers & Modals
//     expandedTask, setExpandedTask,
//     drawerOpen, setDrawerOpen,
//     drawerTaskId, drawerHistory, drawerClickEvent, openDrawer,
//     editOpen, setEditOpen, editForm, setEditForm, openEditPopup, handleEditSave,
//     preview, setPreview,
    
//     // Permissions & Lists
//     canStartTask, canSubmitTask, canReviewTask, canEditTask,
//     filteredTasks
//   };
// }
// src/hooks/useTasks.js


import { useState, useEffect, useContext, useCallback } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

import {
  listTasks,
  listTasksPaged,
  createTask,
  startTask,
  submitTask,
  reviewTask,
  getTaskHistory,
  updateTask,
  getTasksByDepartment,
  deleteTask,
  searchTasks,
} from "../api/tasks";

import { listUsers } from "../api/users";
import { listDepartments } from "../api/departments";
import { getStartOfDay } from "../utils/TaskHelpers";

export function useTasks() {
  const { user, loading: userLoading } = useContext(AuthContext);

  // Data
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  // UI state
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [statsView, setStatsView] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);

  // Forms etc
  const [form, setForm] = useState({ title: "", description: "", selectedDepartmentId: "", assigneeId: "", file: null });
  const [proofFileMap, setProofFileMap] = useState({});
  const [reviewComments, setReviewComments] = useState({});

  // Pagination (server-side)
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isServerPaging, setIsServerPaging] = useState(true); // use server paging by default

  // Drawer / modals
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTaskId, setDrawerTaskId] = useState(null);
  const [drawerHistory, setDrawerHistory] = useState([]);
  const [drawerClickEvent, setDrawerClickEvent] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, title: "", description: "", assigneeId: "", file: null, createdAt: null, creatorId: null, currentAttachmentUrl: null });

  const [preview, setPreview] = useState({ open: false, url: null });

  // Filters
  const [deptFilterId, setDeptFilterId] = useState("");
  const [startDateRange, setStartDateRange] = useState("");
  const [endDateRange, setEndDateRange] = useState("");
  const [completedDateFilter, setCompletedDateFilter] = useState("");
  const [isFilteringBackend, setIsFilteringBackend] = useState(false);

  const getDeptId = (obj) => (obj ? obj.departmentId || (obj.department && obj.department.id) : null);

  const getUsersInDepartment = (deptId) => users.filter(u => (u.departmentId || (u.department && u.department.id)) === Number(deptId));

  const getUserDeptName = (userId) => {
    const found = users.find(u => u.id === userId);
    return found?.departmentName || (found?.department && found.department.name) || "N/A";
  };

  const getAssignableUsers = () => {
    if (!user) return [];
    if (user.role === "SUPER_ADMIN") {
      if (!form.selectedDepartmentId) return [];
      return getUsersInDepartment(form.selectedDepartmentId).filter(u => ["DEPT_HEAD", "EMPLOYEE"].includes(u.role));
    }
    if (user.role === "DEPT_HEAD") {
      const dept = getDeptId(user);
      return getUsersInDepartment(dept).filter(u => u.role === "EMPLOYEE");
    }
    return [];
  };

  /* ========== Refresh / initial load ========== */
  const refreshAll = useCallback(async (page = 0, size = pageSize, start = null, end = null) => {
    try {
      // load users/departments for non-employee
      if (user?.role !== "EMPLOYEE") {
        const [u, d] = await Promise.all([listUsers(), listDepartments()]);
        setUsers(u || []);
        setDepartments(d || []);
      }

      // If server paging enabled, call paged endpoint
      if (isServerPaging) {
        const paged = await listTasksPaged(page, size, start, end);
        // expecting PaginatedResponse shape: { content, page, size, totalElements, totalPages, last }
        setTasks(paged.content || []);
        setCurrentPage(paged.page || page);
        setTotalPages(paged.totalPages || 1);
        setPageSize(paged.size || size);
        setTotalElements(paged.totalElements || 0);
      } else {
        const all = await listTasks(start, end);
        setTasks(all || []);
        setCurrentPage(0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("refreshAll failed", err);
      toast.error("Failed to load tasks");
    }
  }, [user, isServerPaging, pageSize]);

  useEffect(() => {
    if (user) refreshAll();
    // eslint-disable-next-line
  }, [user]);

  /* ========== Filters & Search ========== */

  // Apply backend filters (department or date) — will use paged endpoint for performance
  const applyBackendFilters = async (page = 0) => {
    try {
      // If department filter is selected and backend provides dedicated dept endpoint, call it
      if (deptFilterId) {
        // call department endpoint and treat result as full list (not paged)
        const tasksByDept = await getTasksByDepartment(deptFilterId, startDateRange || undefined, endDateRange || undefined);
        setTasks(tasksByDept || []);
        setIsFilteringBackend(true);
        setIsServerPaging(false); // listing returned all items; switch to client side display for that result
        setCurrentPage(0);
        setTotalPages(1);
        toast.success("Department filter applied");
        return;
      }

      // Date range or no dept -> use paged endpoint for server-side paging
      if (startDateRange || endDateRange) {
        setIsServerPaging(true);
        const paged = await listTasksPaged(page, pageSize, startDateRange || undefined, endDateRange || undefined);
        setTasks(paged.content || []);
        setCurrentPage(paged.page || page);
        setTotalPages(paged.totalPages || 1);
        setTotalElements(paged.totalElements || 0);
        setIsFilteringBackend(true);
        toast.success("Date filter applied");
        return;
      }

      toast.error("Please select filters to apply");
    } catch (err) {
      console.error("applyBackendFilters failed", err);
      toast.error("Failed to apply backend filters");
    }
  };

  const clearAllFilters = async () => {
    setDeptFilterId("");
    setStartDateRange("");
    setEndDateRange("");
    setCompletedDateFilter("");
    setIsFilteringBackend(false);
    setIsServerPaging(true);
    await refreshAll(0, pageSize);
    toast.success("All filters cleared");
  };

  /* ========== Actions (create/start/submit/review/delete/update) ========== */

  const handleCreate = async () => {
    if (!form.title?.trim()) return toast.error("Title required");
    if (!form.assigneeId) return toast.error("Select assignee");

    try {
      if (form.assigneeId === "ALL") {
        // Bulk create: expand to all employees in chosen dept
        const deptToUse = user.role === "SUPER_ADMIN" ? form.selectedDepartmentId : getDeptId(user);
        const employees = getUsersInDepartment(deptToUse).filter(u => u.role === "EMPLOYEE");
        for (const emp of employees) {
          await createTask({ title: form.title, description: form.description, assigneeId: emp.id, file: form.file });
        }
        toast.success("Created tasks for all employees");
      } else {
        await createTask({ title: form.title, description: form.description, assigneeId: Number(form.assigneeId), file: form.file });
        toast.success("Task created");
      }

      // Refresh depending on filter mode
      if (isFilteringBackend && (startDateRange || endDateRange || deptFilterId)) {
        await applyBackendFilters(currentPage);
      } else {
        await refreshAll(0, pageSize);
      }

      setShowForm(false);
      setForm({ title: "", description: "", selectedDepartmentId: "", assigneeId: "", file: null });
      setCurrentPage(0);
    } catch (err) {
      console.error("create failed", err);
      toast.error(err?.message || "Create failed");
    }
  };

  const handleStart = async (id) => {
    try {
      await startTask(id);
      toast.success("Started");
      if (isFilteringBackend) await applyBackendFilters(currentPage);
      else await refreshAll(currentPage, pageSize);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data || "Start failed");
    }
  };

  const handleSubmit = async (id) => {
    const entry = proofFileMap[id];
    if (!entry?.file) return toast.error("Attach proof file");

    try {
      await submitTask(id, entry.file, entry.comment || entry.message || "");
      toast.success("Submitted");
      const cp = { ...proofFileMap };
      delete cp[id];
      setProofFileMap(cp);

      if (isFilteringBackend) await applyBackendFilters(currentPage);
      else await refreshAll(currentPage, pageSize);
    } catch (err) {
      console.error("submit failed", err);
      toast.error(err?.response?.data || "Submit failed");
    }
  };

  const handleReview = async (id, action) => {
    try {
      const comment = reviewComments[id] || "";
      await reviewTask(id, { action, comment });
      toast.success(`${action}ed`);

      const cp = { ...reviewComments };
      delete cp[id];
      setReviewComments(cp);

      if (isFilteringBackend) await applyBackendFilters(currentPage);
      else await refreshAll(currentPage, pageSize);

      if (drawerTaskId === id) openDrawer(id, null);
    } catch (err) {
      console.error("review failed", err);
      toast.error(err?.response?.data || "Review failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      if (isFilteringBackend) await applyBackendFilters(currentPage);
      else await refreshAll(currentPage, pageSize);
    } catch (err) {
      console.error("delete failed", err);
      toast.error(err?.response?.data || "Delete failed");
    }
  };

  const handleEditSave = async () => {
    if (!editForm.title?.trim()) return toast.error("Title required");
    if (!editForm.assigneeId) return toast.error("Select assignee");

    try {
      await updateTask(editForm.id, {
        title: editForm.title,
        description: editForm.description,
        assigneeId: editForm.assigneeId,
        file: editForm.file,
      });
      toast.success("Task updated");
      setEditOpen(false);
      if (isFilteringBackend) await applyBackendFilters(currentPage);
      else await refreshAll(currentPage, pageSize);
    } catch (err) {
      console.error("update failed", err);
      toast.error(err?.response?.data || "Update failed");
    }
  };

  /* ========== History Drawer ========== */
  const openDrawer = async (id, event) => {
    setDrawerClickEvent(event);
    try {
      const hist = await getTaskHistory(id);
      setDrawerHistory(hist || []);
      setDrawerTaskId(id);
      setDrawerOpen(true);
    } catch (err) {
      console.error("history load failed", err);
      toast.error("Failed to load history");
    }
  };

  const openEditPopup = (task) => {
    setEditForm({
      id: task.id,
      title: task.title,
      description: task.description,
      assigneeId: task.assignee?.id || "",
      file: null,
      createdAt: task.createdAt,
      creatorId: task.creator?.id,
      currentAttachmentUrl: task.attachmentUrl,
    });
    setEditOpen(true);
  };

  /* ========== Search (server when possible) ========== */
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        // If search empty -> reload current page
        if (!search || search.trim().length === 0) {
          if (isServerPaging) await refreshAll(currentPage, pageSize, startDateRange || undefined, endDateRange || undefined);
          else await refreshAll();
          return;
        }

        // For Super Admin use server-side /tasks/search
        if (user?.role === "SUPER_ADMIN") {
          const res = await searchTasks(search.trim());
          setTasks(res || []);
          setIsServerPaging(false);
          setCurrentPage(0);
          setTotalPages(1);
        } else {
          // fallback: client-side filtering of current tasks
          const filtered = tasks.filter(t =>
            (t.title || "").toLowerCase().includes(search.toLowerCase())
            || (t.assignee?.username || "").toLowerCase().includes(search.toLowerCase())
            || (t.creator?.username || "").toLowerCase().includes(search.toLowerCase())
            || (t.status || "").toLowerCase().includes(search.toLowerCase())
          );
          setTasks(filtered);
          setIsServerPaging(false);
          setCurrentPage(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("search error", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /* ========== Client side filtered list (used by TasksPage when server not used) ========== */
  const filteredTasks = tasks.filter((t) => {
    const text = (search || "").toLowerCase();
    const passesSearch =
      t.title?.toLowerCase().includes(text) ||
      t.status?.toLowerCase().includes(text) ||
      t.assignee?.username?.toLowerCase().includes(text) ||
      t.creator?.username?.toLowerCase().includes(text);

    if (!passesSearch) return false;

    if (completedDateFilter && t.status === "COMPLETED") {
      if (completedDateFilter === "TODAY")
        return new Date(t.completedAt || t.updatedAt).getTime() >= getStartOfDay();
    } else if (completedDateFilter && t.status !== "COMPLETED") {
      return false;
    }
    return true;
  });

  return {
    user, loading: userLoading,
    tasks, users, departments,
    search, setSearch,
    showForm, setShowForm,
    statsView, setStatsView,
    form, setForm,
    proofFileMap, setProofFileMap,
    reviewComments, setReviewComments,
    pageSize, setPageSize,
    currentPage, setCurrentPage,
    totalPages, totalElements,
    isServerPaging, setIsServerPaging,
    // Filters
    deptFilterId, setDeptFilterId,
    startDateRange, setStartDateRange,
    endDateRange, setEndDateRange,
    completedDateFilter, setCompletedDateFilter,
    applyBackendFilters, clearAllFilters,

    // Actions
    handleCreate, handleStart, handleSubmit, handleReview, handleDelete,
    getAssignableUsers, getDeptId, getUsersInDepartment, getUserDeptName,

    // Modals
    expandedTask, setExpandedTask,
    drawerOpen, setDrawerOpen,
    drawerTaskId, drawerHistory, drawerClickEvent, openDrawer,
    editOpen, setEditOpen, editForm, setEditForm, openEditPopup, handleEditSave,

    // preview, edit
    preview, setPreview,
    handleEditSave,

    // permissions & filtered list
    canStartTask: (t) => t.assignee?.email === user.email && t.status === "PENDING",
    canSubmitTask: (t) => t.assignee?.email === user.email && t.status === "IN_PROGRESS",
    canReviewTask: (t) => t.creator?.email === user.email && t.status === "SUBMITTED",
    canEditTask: (task) => {
      if (task.creator?.email !== user.email) return false;
      const diffMin = (Date.now() - new Date(task.createdAt).getTime()) / 60000;
      return diffMin <= 5;
    },

    filteredTasks,
    refreshAll
  };
}
