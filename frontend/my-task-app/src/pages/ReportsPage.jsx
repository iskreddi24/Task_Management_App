// // // src/pages/ReportsPage.jsx
// // import React, { useEffect, useState, useContext } from "react";
// // import Sidebar from "../components/Sidebar";
// // import Topbar from "../components/Topbar";
// // import { AuthContext } from "../context/AuthProvider";

// // import {
// //   getMyStats,
// //   getEmployeeStats,
// //   getDepartmentStats,
// //   // downloadReportPdf, // kept if you have server-side PDF export (optional)
// // } from "../api/reports";

// // import jsPDF from "jspdf";
// // import html2canvas from "html2canvas";
// // import * as XLSX from "xlsx";
// // import { saveAs } from "file-saver";

// // import { Bar, Pie } from "react-chartjs-2";
// // import "../styles/reports.css";

// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement,
// // } from "chart.js";

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// // /**
// //  * Advanced Reports Dashboard (Option B)
// //  * - Works with your backend endpoints exactly (no backend changes).
// //  * - Adds client-side filters + date presets + status filter + scope selector
// //  */

// // const DEFAULT_COLORS = {
// //   primary: "#2563eb",
// //   accent: "#8b5cf6",
// //   success: "#10b981",
// //   warn: "#f59e0b",
// //   danger: "#ef4444",
// //   neutral: "#6b7280",
// // };

// // const STATUS_OPTIONS = [
// //   { value: "", label: "All Statuses" },
// //   { value: "PENDING", label: "Pending" },
// //   { value: "IN_PROGRESS", label: "In Progress" },
// //   { value: "SUBMITTED", label: "Submitted" },
// //   { value: "COMPLETED", label: "Completed" },
// //   { value: "REJECTED", label: "Rejected" },
// // ];

// // function getTodayRange() {
// //   const d = new Date();
// //   const start = d.toISOString().slice(0, 10);
// //   const end = start;
// //   return { start, end };
// // }

// // function getThisWeekRange() {
// //   const now = new Date();
// //   const day = now.getDay(); // 0 (Sun) - 6
// //   const diffStart = new Date(now);
// //   diffStart.setDate(now.getDate() - day);
// //   diffStart.setHours(0, 0, 0, 0);
// //   const diffEnd = new Date(diffStart);
// //   diffEnd.setDate(diffStart.getDate() + 6);
// //   return {
// //     start: diffStart.toISOString().slice(0, 10),
// //     end: diffEnd.toISOString().slice(0, 10),
// //   };
// // }

// // function getThisMonthRange() {
// //   const now = new Date();
// //   const start = new Date(now.getFullYear(), now.getMonth(), 1);
// //   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
// //   return {
// //     start: start.toISOString().slice(0, 10),
// //     end: end.toISOString().slice(0, 10),
// //   };
// // }

// // function getLast30DaysRange() {
// //   const end = new Date();
// //   const start = new Date();
// //   start.setDate(end.getDate() - 29);
// //   return {
// //     start: start.toISOString().slice(0, 10),
// //     end: end.toISOString().slice(0, 10),
// //   };
// // }

// // export default function ReportsPage() {
// //   const { user } = useContext(AuthContext);

// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   const [departments, setDepartments] = useState([]);
// //   const [users, setUsers] = useState([]);

// //   const [selectedDept, setSelectedDept] = useState("");
// //   const [selectedEmployee, setSelectedEmployee] = useState("");

// //   // NEW FILTERS
// //   const [selectedStatus, setSelectedStatus] = useState("");
// //   const [scope, setScope] = useState(() => (user.role === "EMPLOYEE" ? "MY" : "DEPARTMENT")); // MY, DEPARTMENT, EMPLOYEE
// //   const [creatorOrAssignee, setCreatorOrAssignee] = useState("ASSIGNEE"); // toggles labeling; backend aggregates by assignee

// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const chartId = "report-chart-wrap";

// //   // load departments & users if allowed (admin/head)
// //   useEffect(() => {
// //     if (user.role !== "EMPLOYEE") {
// //       fetchDeps();
// //       fetchUsersList();
// //     }
// //   }, []);

// //   async function fetchDeps() {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://localhost:8081/api/v1/departments", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const json = await res.json();
// //       setDepartments(json || []);
// //     } catch (err) {
// //       console.error("Fetch deps failed", err);
// //     }
// //   }

// //   async function fetchUsersList() {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://localhost:8081/api/v1/users", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const json = await res.json();
// //       setUsers(json || []);
// //     } catch (err) {
// //       console.error("Fetch users failed", err);
// //     }
// //   }

// //   const validDates = () => startDate && endDate && startDate <= endDate;

// //   const applyPreset = (preset) => {
// //     let range = { start: "", end: "" };
// //     if (preset === "TODAY") range = getTodayRange();
// //     else if (preset === "WEEK") range = getThisWeekRange();
// //     else if (preset === "MONTH") range = getThisMonthRange();
// //     else if (preset === "LAST30") range = getLast30DaysRange();

// //     setStartDate(range.start);
// //     setEndDate(range.end);
// //     setStats(null);
// //   };

// //   const handleFetch = async (e) => {
// //     e?.preventDefault();
// //     if (!validDates()) {
// //       return alert("Please choose a valid date range (start <= end).");
// //     }

// //     setLoading(true);
// //     setStats(null);

// //     try {
// //       // If Employee -> only my stats
// //       if (user.role === "EMPLOYEE") {
// //         const data = await getMyStats(startDate, endDate);
// //         setStats(filterByStatus(data, selectedStatus));
// //         setLoading(false);
// //         return;
// //       }

// //       // ADMIN / HEAD
// //       if (scope === "EMPLOYEE") {
// //         if (!selectedEmployee) {
// //           alert("Select an employee.");
// //           setLoading(false);
// //           return;
// //         }
// //         const data = await getEmployeeStats(selectedEmployee, startDate, endDate);
// //         setStats(filterByStatus(data, selectedStatus));
// //         setLoading(false);
// //         return;
// //       }

// //       if (scope === "DEPARTMENT") {
// //         if (!selectedDept) {
// //           alert("Select a department.");
// //           setLoading(false);
// //           return;
// //         }
// //         const data = await getDepartmentStats(selectedDept, startDate, endDate);
// //         setStats(filterByStatus(data, selectedStatus));
// //         setLoading(false);
// //         return;
// //       }

// //       // Fallback: try department if available
// //       if (selectedDept) {
// //         const data = await getDepartmentStats(selectedDept, startDate, endDate);
// //         setStats(filterByStatus(data, selectedStatus));
// //         setLoading(false);
// //         return;
// //       }

// //       setLoading(false);
// //       alert("No target selected — choose Department or Employee.");
// //     } catch (err) {
// //       console.error("Fetch stats failed", err);
// //       toastIfAvailable("Failed to fetch stats");
// //       setLoading(false);
// //     }
// //   };

// //   // helper to allow client-side filtering by status (since backend returns aggregated counts)
// //   function filterByStatus(dto, status) {
// //     if (!dto || !status) return dto;
// //     // dto is TaskStatsDTO shaped { total, pending, inProgress, submitted, completed, rejected }
// //     // If we filter for a single status, set total = that status count and zero others.
// //     const map = {
// //       PENDING: dto.pending,
// //       IN_PROGRESS: dto.inProgress,
// //       SUBMITTED: dto.submitted,
// //       COMPLETED: dto.completed,
// //       REJECTED: dto.rejected,
// //     };
// //     const newDto = { ...dto };
// //     if (map[status] !== undefined) {
// //       newDto.total = map[status];
// //       newDto.pending = status === "PENDING" ? dto.pending : 0;
// //       newDto.inProgress = status === "IN_PROGRESS" ? dto.inProgress : 0;
// //       newDto.submitted = status === "SUBMITTED" ? dto.submitted : 0;
// //       newDto.completed = status === "COMPLETED" ? dto.completed : 0;
// //       newDto.rejected = status === "REJECTED" ? dto.rejected : 0;
// //     }
// //     return newDto;
// //   }

// //   // Export PDF (client-side)
// //   const exportPDFLocal = async () => {
// //     if (!stats) return alert("No data to export");
// //     try {
// //       const el = document.getElementById(chartId);
// //       const canvas = await html2canvas(el, { scale: 2 });
// //       const imgData = canvas.toDataURL("image/png");

// //       const doc = new jsPDF("p", "pt", "a4");
// //       const margin = 30;
// //       const pageWidth = doc.internal.pageSize.getWidth();
// //       doc.setFontSize(18);
// //       doc.text("Task Report", margin, 40);

// //       doc.setFontSize(11);
// //       doc.text(`User: ${user.username || user.email}`, margin, 60);
// //       doc.text(`Scope: ${scope}`, margin, 76);
// //       doc.text(`Dates: ${startDate} → ${endDate}`, margin, 92);

// //       const imgProps = doc.getImageProperties(imgData);
// //       const pdfWidth = pageWidth - margin * 2;
// //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

// //       doc.addImage(imgData, "PNG", margin, 110, pdfWidth, pdfHeight);
// //       doc.save(`task_report_${startDate}_${endDate}.pdf`);
// //     } catch (err) {
// //       console.error("Export PDF failed", err);
// //       alert("Export failed");
// //     }
// //   };

// //   // Export Excel
// //   const exportExcel = () => {
// //     if (!stats) return alert("No data");
// //     const sheet = [
// //       ["Metric", "Value"],
// //       ["Total", stats.total],
// //       ["Pending", stats.pending],
// //       ["In Progress", stats.inProgress],
// //       ["Submitted", stats.submitted],
// //       ["Completed", stats.completed],
// //       ["Rejected", stats.rejected],
// //     ];
// //     const ws = XLSX.utils.aoa_to_sheet(sheet);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "Report");
// //     XLSX.writeFile(wb, `task_report_${startDate}_${endDate}.xlsx`);
// //   };

// //   // Export CSV
// //   const exportCSV = () => {
// //     if (!stats) return alert("No data");
// //     const rows = [
// //       ["Metric", "Value"],
// //       ["Total", stats.total],
// //       ["Pending", stats.pending],
// //       ["In Progress", stats.inProgress],
// //       ["Submitted", stats.submitted],
// //       ["Completed", stats.completed],
// //       ["Rejected", stats.rejected],
// //     ];
// //     const csv = rows.map((r) => r.join(",")).join("\n");
// //     saveAs(new Blob([csv], { type: "text/csv" }), `task_report_${startDate}_${endDate}.csv`);
// //   };

// //   // small helper: toast if 'toast' library available else alert
// //   function toastIfAvailable(msg) {
// //     try {
// //       // eslint-disable-next-line no-undef
// //       if (typeof toast !== "undefined") toast.error(msg);
// //       else alert(msg);
// //     } catch {
// //       alert(msg);
// //     }
// //   }

// //   // chart data creators
// //   function buildBarData(s) {
// //     if (!s) return { labels: [], datasets: [] };
// //     return {
// //       labels: ["Pending", "In Progress", "Submitted", "Completed", "Rejected"],
// //       datasets: [
// //         {
// //           label: "Tasks",
// //           data: [s.pending, s.inProgress, s.submitted, s.completed, s.rejected],
// //           backgroundColor: [
// //             DEFAULT_COLORS.warn,
// //             DEFAULT_COLORS.primary,
// //             DEFAULT_COLORS.accent,
// //             DEFAULT_COLORS.success,
// //             DEFAULT_COLORS.danger,
// //           ],
// //         },
// //       ],
// //     };
// //   }

// //   function buildPieData(s) {
// //     if (!s) return { labels: [], datasets: [] };
// //     return {
// //       labels: ["Pending", "In Progress", "Submitted", "Completed", "Rejected"],
// //       datasets: [
// //         {
// //           data: [s.pending, s.inProgress, s.submitted, s.completed, s.rejected],
// //           backgroundColor: [
// //             DEFAULT_COLORS.warn,
// //             DEFAULT_COLORS.primary,
// //             DEFAULT_COLORS.accent,
// //             DEFAULT_COLORS.success,
// //             DEFAULT_COLORS.danger,
// //           ],
// //           hoverOffset: 6,
// //         },
// //       ],
// //     };
// //   }

// //   function employeeOptionsForDept(deptId) {
// //     return users.filter((u) => String(u.departmentId) === String(deptId));
// //   }

// //   // quick guards
// //   const canSelectDept = user.role !== "EMPLOYEE";
// //   const canSelectEmployee = user.role !== "EMPLOYEE";

// //   // UI
// //   return (
// //     <div className="tasks-page">
// //       <Sidebar />

// //       <div className="tasks-main">
// //         <Topbar />

// //         <div className="tasks-container">
// //           <h1 className="tasks-title">Advanced Reports</h1>

// //           {/* CONTROLS */}
// //           <form className="report-controls advanced" onSubmit={handleFetch}>
// //             {/* Date presets */}
// //             <div className="preset-group">
// //               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("TODAY")}>
// //                 Today
// //               </button>
// //               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("WEEK")}>
// //                 This Week
// //               </button>
// //               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("MONTH")}>
// //                 This Month
// //               </button>
// //               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("LAST30")}>
// //                 Last 30 Days
// //               </button>
// //             </div>

// //             <div className="date-range">
// //               <label>From</label>
// //               <input type="date" value={startDate} required onChange={(e) => setStartDate(e.target.value)} />
// //             </div>

// //             <div className="date-range">
// //               <label>To</label>
// //               <input type="date" value={endDate} required onChange={(e) => setEndDate(e.target.value)} />
// //             </div>

// //             {/* Scope selector */}
// //             <div className="form-field small">
// //               <label>Scope</label>
// //               <select value={scope} onChange={(e) => setScope(e.target.value)}>
// //                 {user.role !== "EMPLOYEE" && <option value="DEPARTMENT">Department</option>}
// //                 {user.role !== "EMPLOYEE" && <option value="EMPLOYEE">Employee</option>}
// //                 <option value="MY">My Stats</option>
// //               </select>
// //             </div>

// //             {/* Department select (only if scope=DEPARTMENT) */}
// //             {scope === "DEPARTMENT" && canSelectDept && (
// //               <div className="form-field small">
// //                 <label>Department</label>
// //                 <select
// //                   value={selectedDept}
// //                   onChange={(e) => {
// //                     setSelectedDept(e.target.value);
// //                     setSelectedEmployee("");
// //                   }}
// //                 >
// //                   <option value="">Select Department</option>
// //                   {departments.map((d) => (
// //                     <option key={d.id} value={d.id}>
// //                       {d.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* Employee select (only if scope=EMPLOYEE) */}
// //             {scope === "EMPLOYEE" && canSelectEmployee && (
// //               <div className="form-field small">
// //                 <label>Employee</label>
// //                 <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
// //                   <option value="">Select Employee</option>
// //                   {users.map((u) => (
// //                     <option key={u.id} value={u.id}>
// //                       {u.username} ({u.role})
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* When department chosen, allow quick employee filter within that dept */}
// //             {scope === "DEPARTMENT" && selectedDept && (
// //               <div className="form-field small">
// //                 <label>Quick Employees</label>
// //                 <select
// //                   value={selectedEmployee}
// //                   onChange={(e) => setSelectedEmployee(e.target.value)}
// //                 >
// //                   <option value="">All employees in dept</option>
// //                   {employeeOptionsForDept(selectedDept).map((u) => (
// //                     <option key={u.id} value={u.id}>
// //                       {u.username} ({u.role})
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* Status filter */}
// //             <div className="form-field small">
// //               <label>Status</label>
// //               <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
// //                 {STATUS_OPTIONS.map((s) => (
// //                   <option key={s.value || "all"} value={s.value}>
// //                     {s.label}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Creator / Assignee toggle for labelling purpose */}
// //             <div className="form-field small">
// //               <label>Label as</label>
// //               <select value={creatorOrAssignee} onChange={(e) => setCreatorOrAssignee(e.target.value)}>
// //                 <option value="ASSIGNEE">Assignee (default)</option>
// //                 <option value="CREATOR">Creator</option>
// //               </select>
// //             </div>

// //             <div className="form-actions">
// //               <button className="btn btn-primary" type="submit" disabled={loading}>
// //                 {loading ? "Loading..." : "Get Stats"}
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn btn-ghost"
// //                 onClick={() => {
// //                   // reset
// //                   setStartDate("");
// //                   setEndDate("");
// //                   setSelectedDept("");
// //                   setSelectedEmployee("");
// //                   setSelectedStatus("");
// //                   setStats(null);
// //                 }}
// //               >
// //                 Reset
// //               </button>
// //             </div>
// //           </form>

// //           {/* STATS */}
// //           {stats ? (
// //             <>
// //               <div className="stats-grid advanced">
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.total}</div>
// //                   <div>Total</div>
// //                 </div>
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.pending}</div>
// //                   <div>Pending</div>
// //                 </div>
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.inProgress}</div>
// //                   <div>In Progress</div>
// //                 </div>
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.submitted}</div>
// //                   <div>Submitted</div>
// //                 </div>
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.completed}</div>
// //                   <div>Completed</div>
// //                 </div>
// //                 <div className="card stat-card">
// //                   <div className="big">{stats.rejected}</div>
// //                   <div>Rejected</div>
// //                 </div>
// //               </div>

// //               {/* CHART AREA */}
// //               <div id={chartId} className="chart-wrap advanced-charts">
// //                 <div className="chart-left">
// //                   <Bar
// //                     data={buildBarData(stats)}
// //                     options={{
// //                       responsive: true,
// //                       plugins: {
// //                         legend: { display: false },
// //                         title: { display: true, text: "Status distribution" },
// //                       },
// //                     }}
// //                   />
// //                 </div>

// //                 <div className="chart-right">
// //                   <Pie
// //                     data={buildPieData(stats)}
// //                     options={{
// //                       responsive: true,
// //                       plugins: {
// //                         legend: { position: "bottom" },
// //                         title: { display: true, text: "Status share" },
// //                       },
// //                     }}
// //                   />
// //                 </div>
// //               </div>

// //               {/* EXPORT BUTTONS */}
// //               <div className="export-buttons">
// //                 <button className="btn btn-primary" onClick={exportPDFLocal}>
// //                   📄 Export PDF
// //                 </button>
// //                 <button className="btn btn-success" onClick={exportExcel}>
// //                   📊 Export Excel
// //                 </button>
// //                 <button className="btn btn-ghost" onClick={exportCSV}>
// //                   📥 Export CSV
// //                 </button>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="empty-state">No report loaded. Choose filters and click "Get Stats".</div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // src/pages/ReportsPage.jsx
// import React, { useEffect, useState, useContext } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { AuthContext } from "../context/AuthProvider";

// import {
//   getMyStats,
//   getEmployeeStats,
//   getDepartmentStats,
// } from "../api/reports";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import toast from "react-hot-toast";

// import PopupModal from "../components/PopupModal";

// import { Bar, Pie } from "react-chartjs-2";
// import "../styles/reports.css";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// /* -------------------------------------------------------
//    COLOR PALETTE
// ------------------------------------------------------- */
// const COLORS = {
//   primary: "#2563eb",
//   accent: "#8b5cf6",
//   success: "#10b981",
//   warn: "#f59e0b",
//   danger: "#ef4444",
//   neutral: "#6b7280",
// };

// const STATUS_OPTIONS = [
//   { value: "", label: "All Statuses" },
//   { value: "PENDING", label: "Pending" },
//   { value: "IN_PROGRESS", label: "In Progress" },
//   { value: "SUBMITTED", label: "Submitted" },
//   { value: "COMPLETED", label: "Completed" },
//   { value: "REJECTED", label: "Rejected" },
// ];

// /* -------------------------------------------------------
//    DATE PRESETS
// ------------------------------------------------------- */
// function getTodayRange() {
//   const today = new Date().toISOString().slice(0, 10);
//   return { start: today, end: today };
// }

// function getThisWeekRange() {
//   const now = new Date();
//   const day = now.getDay(); // 0=Sun
//   const start = new Date(now);
//   start.setDate(now.getDate() - day);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(start);
//   end.setDate(start.getDate() + 6);

//   return {
//     start: start.toISOString().slice(0, 10),
//     end: end.toISOString().slice(0, 10),
//   };
// }

// function getThisMonthRange() {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   return {
//     start: start.toISOString().slice(0, 10),
//     end: end.toISOString().slice(0, 10),
//   };
// }

// function getLast30DaysRange() {
//   const end = new Date();
//   const start = new Date();
//   start.setDate(end.getDate() - 29);

//   return {
//     start: start.toISOString().slice(0, 10),
//     end: end.toISOString().slice(0, 10),
//   };
// }

// /* -------------------------------------------------------
//    MAIN COMPONENT
// ------------------------------------------------------- */
// export default function ReportsPage() {
//   const { user } = useContext(AuthContext);

//   /* ------------------------------------ State ------------------------------------ */
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [departments, setDepartments] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [selectedDept, setSelectedDept] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");

//   const [scope, setScope] = useState(user.role === "EMPLOYEE" ? "MY" : "DEPARTMENT");

//   const [creatorOrAssignee, setCreatorOrAssignee] = useState("ASSIGNEE");

//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const chartId = "chart-report";

//   /* ------------------------------------ MODAL ------------------------------------ */
//   const [modal, setModal] = useState({
//     open: false,
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   const openModal = (title, message, onConfirm) => {
//     setModal({
//       open: true,
//       title,
//       message,
//       onConfirm,
//     });
//   };

//   const closeModal = () => {
//     setModal((prev) => ({ ...prev, open: false }));
//   };

//   /* ------------------------------------ Fetch Data ------------------------------------ */
//   useEffect(() => {
//     if (user.role !== "EMPLOYEE") {
//       loadDepartments();
//       loadUsers();
//     }
//   }, []);

//   async function loadDepartments() {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:8081/api/v1/departments", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDepartments(await res.json());
//     } catch (err) {
//       toast.error("Failed to load departments");
//     }
//   }

//   async function loadUsers() {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:8081/api/v1/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(await res.json());
//     } catch (err) {
//       toast.error("Failed to load users");
//     }
//   }

//   /* ------------------------------------ Utility ------------------------------------ */

//   const validDates = () => startDate && endDate && startDate <= endDate;

//   const applyPreset = (preset) => {
//     let r = {};
//     if (preset === "TODAY") r = getTodayRange();
//     else if (preset === "WEEK") r = getThisWeekRange();
//     else if (preset === "MONTH") r = getThisMonthRange();
//     else r = getLast30DaysRange();

//     setStartDate(r.start);
//     setEndDate(r.end);
//     setStats(null);
//   };

//   function filterStatus(dto, status) {
//     if (!dto || !status) return dto;

//     const clone = { ...dto };

//     const map = {
//       PENDING: clone.pending,
//       IN_PROGRESS: clone.inProgress,
//       SUBMITTED: clone.submitted,
//       COMPLETED: clone.completed,
//       REJECTED: clone.rejected,
//     };

//     const newTotal = map[status] ?? 0;

//     clone.total = newTotal;
//     clone.pending = status === "PENDING" ? clone.pending : 0;
//     clone.inProgress = status === "IN_PROGRESS" ? clone.inProgress : 0;
//     clone.submitted = status === "SUBMITTED" ? clone.submitted : 0;
//     clone.completed = status === "COMPLETED" ? clone.completed : 0;
//     clone.rejected = status === "REJECTED" ? clone.rejected : 0;

//     return clone;
//   }

//   /* ------------------------------------ Fetch Report ------------------------------------ */
//   const handleFetch = async (e) => {
//     e.preventDefault();

//     if (!validDates()) {
//       openModal(
//         "Invalid Date Range",
//         "Please select a proper Start and End date.",
//         () => {
//           toast.error("Invalid date range.");
//           closeModal();
//         }
//       );
//       return;
//     }

//     if (user.role !== "EMPLOYEE") {
//       if (scope === "DEPARTMENT" && !selectedDept) {
//         openModal(
//           "Department Required",
//           "Please select a department.",
//           () => {
//             toast.error("No department selected.");
//             closeModal();
//           }
//         );
//         return;
//       }

//       if (scope === "EMPLOYEE" && !selectedEmployee) {
//         openModal(
//           "Employee Required",
//           "Please select an employee.",
//           () => {
//             toast.error("No employee selected.");
//             closeModal();
//           }
//         );
//         return;
//       }
//     }

//     setLoading(true);
//     setStats(null);

//     try {
//       let data;

//       if (user.role === "EMPLOYEE" || scope === "MY") {
//         data = await getMyStats(startDate, endDate);
//       } else if (scope === "EMPLOYEE") {
//         data = await getEmployeeStats(selectedEmployee, startDate, endDate);
//       } else {
//         data = await getDepartmentStats(selectedDept, startDate, endDate);
//       }

//       setStats(filterStatus(data, selectedStatus));
//     } catch (err) {
//       toast.error("Failed to fetch report.");
//     }

//     setLoading(false);
//   };

//   /* ------------------------------------ Export PDF ------------------------------------ */
//   const exportPDF = async () => {
//     if (!stats) {
//       toast.error("No data to export");
//       return;
//     }

//     openModal("Export PDF?", "Do you want to download the report as PDF?", async () => {
//       closeModal();

//       try {
//         const el = document.getElementById(chartId);
//         const canvas = await html2canvas(el);
//         const img = canvas.toDataURL("image/png");

//         const doc = new jsPDF();
//         doc.text("Task Report", 14, 20);
//         doc.text(`From: ${startDate}`, 14, 32);
//         doc.text(`To: ${endDate}`, 14, 42);

//         doc.addImage(img, "PNG", 10, 55, 190, 100);
//         doc.save("task_report.pdf");

//         toast.success("PDF exported");
//       } catch (err) {
//         toast.error("Export failed");
//       }
//     });
//   };

//   /* ------------------------------------ Excel ------------------------------------ */
//   const exportExcel = () => {
//     if (!stats) {
//       toast.error("No data");
//       return;
//     }

//     const sheet = [
//       ["Metric", "Value"],
//       ["Total", stats.total],
//       ["Pending", stats.pending],
//       ["In Progress", stats.inProgress],
//       ["Submitted", stats.submitted],
//       ["Completed", stats.completed],
//       ["Rejected", stats.rejected],
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(sheet);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report");

//     XLSX.writeFile(wb, "task_report.xlsx");
//     toast.success("Excel downloaded");
//   };

//   /* ------------------------------------ CSV ------------------------------------ */
//   const exportCSV = () => {
//     if (!stats) {
//       toast.error("No data");
//       return;
//     }

//     const rows = [
//       ["Metric", "Value"],
//       ["Total", stats.total],
//       ["Pending", stats.pending],
//       ["In Progress", stats.inProgress],
//       ["Submitted", stats.submitted],
//       ["Completed", stats.completed],
//       ["Rejected", stats.rejected],
//     ];

//     const csv = rows.map((r) => r.join(",")).join("\n");
//     saveAs(new Blob([csv], { type: "text/csv" }), "task_report.csv");

//     toast.success("CSV downloaded");
//   };

//   /* ------------------------------------ Chart Data ------------------------------------ */
//   const barData = stats
//     ? {
//       labels: ["Pending", "In Progress", "Submitted", "Completed", "Rejected"],
//       datasets: [
//         {
//           label: "Tasks",
//           data: [
//             stats.pending,
//             stats.inProgress,
//             stats.submitted,
//             stats.completed,
//             stats.rejected,
//           ],
//           backgroundColor: [
//             COLORS.warn,
//             COLORS.primary,
//             COLORS.accent,
//             COLORS.success,
//             COLORS.danger,
//           ],
//         },
//       ],
//     }
//     : {};

//   const pieData = barData;

//   /* ------------------------------------ UI ------------------------------------ */

//   return (
//     <div className="tasks-page">
//       <Sidebar />

//       <div className="tasks-main">
//         <Topbar />

//         <div className="tasks-container">
//           <h1 className="tasks-title">Advanced Reports</h1>

//           {/* FILTER FORM */}
//           <form className="report-controls advanced" onSubmit={handleFetch}>
//             <div className="preset-group">
//               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("TODAY")}>Today</button>
//               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("WEEK")}>This Week</button>
//               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("MONTH")}>This Month</button>
//               <button type="button" className="btn btn-ghost" onClick={() => applyPreset("LAST30")}>Last 30 Days</button>
//             </div>

//             <div className="date-range">
//               <label>From</label>
//               <input type="date" value={startDate} required onChange={(e) => setStartDate(e.target.value)} />
//             </div>

//             <div className="date-range">
//               <label>To</label>
//               <input type="date" value={endDate} required onChange={(e) => setEndDate(e.target.value)} />
//             </div>

//             <div className="form-field small">
//               <label>Scope</label>
//               <select value={scope} onChange={(e) => setScope(e.target.value)}>
//                 {user.role !== "EMPLOYEE" && <option value="DEPARTMENT">Department</option>}
//                 {user.role !== "EMPLOYEE" && <option value="EMPLOYEE">Employee</option>}
//                 <option value="MY">My Stats</option>
//               </select>
//             </div>

//             {scope === "DEPARTMENT" && user.role !== "EMPLOYEE" && (
//               <div className="form-field small">
//                 <label>Department</label>
//                 <select
//                   value={selectedDept}
//                   onChange={(e) => {
//                     setSelectedDept(e.target.value);
//                     setSelectedEmployee("");
//                   }}
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((d) => (
//                     <option key={d.id} value={d.id}>{d.name}</option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {scope === "EMPLOYEE" && user.role !== "EMPLOYEE" && (
//               <div className="form-field small">
//                 <label>Employee</label>
//                 <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
//                   <option value="">Select Employee</option>
//                   {users.map((u) => (
//                     <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {/* Status Filter */}
//             <div className="form-field small">
//               <label>Status</label>
//               <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
//                 {STATUS_OPTIONS.map((s) => (
//                   <option key={s.value || "all"} value={s.value}>{s.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-actions">
//               <button className="btn btn-primary" disabled={loading}>
//                 {loading ? "Loading..." : "Get Stats"}
//               </button>

//               <button
//                 type="button"
//                 className="btn btn-ghost"
//                 onClick={() =>
//                   openModal(
//                     "Reset Filters?",
//                     "Are you sure you want to reset all filters?",
//                     () => {
//                       setStartDate("");
//                       setEndDate("");
//                       setSelectedDept("");
//                       setSelectedEmployee("");
//                       setSelectedStatus("");
//                       setStats(null);
//                       toast.success("Filters reset");
//                       closeModal();
//                     }
//                   )
//                 }
//               >
//                 Reset
//               </button>
//             </div>
//           </form>

//           {/* RESULTS */}
//           {stats ? (
//             <>
//               <div className="stats-grid advanced">
//                 <div className="card stat-card"><div className="big">{stats.total}</div><div>Total</div></div>
//                 <div className="card stat-card"><div className="big">{stats.pending}</div><div>Pending</div></div>
//                 <div className="card stat-card"><div className="big">{stats.inProgress}</div><div>In Progress</div></div>
//                 <div className="card stat-card"><div className="big">{stats.submitted}</div><div>Submitted</div></div>
//                 <div className="card stat-card"><div className="big">{stats.completed}</div><div>Completed</div></div>
//                 <div className="card stat-card"><div className="big">{stats.rejected}</div><div>Rejected</div></div>
//               </div>

//               <div id={chartId} className="chart-wrap advanced-charts">
//                 <div className="chart-left">
//                   <Bar data={barData} />
//                 </div>
//                 <div className="chart-right">
//                   <Pie data={pieData} />
//                 </div>
//               </div>

//               <div className="export-buttons">
//                 <button className="btn btn-primary" onClick={exportPDF}>📄 Export PDF</button>
//                 <button className="btn btn-success" onClick={exportExcel}>📊 Export Excel</button>
//                 <button className="btn btn-ghost" onClick={exportCSV}>📥 Export CSV</button>
//               </div>
//             </>
//           ) : (
//             <div className="empty-state">Select filters and click <b>Get Stats</b>.</div>
//           )}
//         </div>
//       </div>

//       {/* GLOBAL MODAL */}
//       <PopupModal
//         open={modal.open}
//         title={modal.title}
//         message={modal.message}
//         onConfirm={modal.onConfirm}
//         onCancel={closeModal}
//       />
//     </div>
//   );
// }
// src/pages/ReportsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { AuthContext } from "../context/AuthProvider";

// --- CHANGED: Import your configured API instance ---
import api from "../api/api"; 

import {
  getMyStats,
  getEmployeeStats,
  getDepartmentStats,
} from "../api/reports";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

import PopupModal from "../components/PopupModal";

import { Bar, Pie } from "react-chartjs-2";
import "../styles/reports.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

/* -------------------------------------------------------
   COLOR PALETTE
------------------------------------------------------- */
const COLORS = {
  primary: "#2563eb",
  accent: "#8b5cf6",
  success: "#10b981",
  warn: "#f59e0b",
  danger: "#ef4444",
  neutral: "#6b7280",
};

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "COMPLETED", label: "Completed" },
  { value: "REJECTED", label: "Rejected" },
];

/* -------------------------------------------------------
   DATE PRESETS
------------------------------------------------------- */
function getTodayRange() {
  const today = new Date().toISOString().slice(0, 10);
  return { start: today, end: today };
}

function getThisWeekRange() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const start = new Date(now);
  start.setDate(now.getDate() - day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function getThisMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function getLast30DaysRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */
export default function ReportsPage() {
  const { user } = useContext(AuthContext);

  /* ------------------------------------ State ------------------------------------ */
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [scope, setScope] = useState(user.role === "EMPLOYEE" ? "MY" : "DEPARTMENT");

  // eslint-disable-next-line no-unused-vars
  const [creatorOrAssignee, setCreatorOrAssignee] = useState("ASSIGNEE");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartId = "chart-report";

  /* ------------------------------------ MODAL ------------------------------------ */
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const openModal = (title, message, onConfirm) => {
    setModal({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, open: false }));
  };

  /* ------------------------------------ Fetch Data ------------------------------------ */
  useEffect(() => {
    // Only load lists if user is NOT an employee (i.e. Admin or Manager)
    if (user.role !== "EMPLOYEE") {
      loadDepartments();
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- CHANGED: Use 'api' instance instead of fetch ---
  async function loadDepartments() {
    try {
      // api.js handles the IP address and Token automatically
      const res = await api.get("/departments");
      setDepartments(res.data || []);
    } catch (err) {
      console.error("Failed to load departments", err);
      toast.error("Failed to load departments");
    }
  }

  // --- CHANGED: Use 'api' instance instead of fetch ---
  async function loadUsers() {
    try {
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      toast.error("Failed to load users");
    }
  }

  /* ------------------------------------ Utility ------------------------------------ */

  const validDates = () => startDate && endDate && startDate <= endDate;

  const applyPreset = (preset) => {
    let r = {};
    if (preset === "TODAY") r = getTodayRange();
    else if (preset === "WEEK") r = getThisWeekRange();
    else if (preset === "MONTH") r = getThisMonthRange();
    else r = getLast30DaysRange();

    setStartDate(r.start);
    setEndDate(r.end);
    setStats(null);
  };

  function filterStatus(dto, status) {
    if (!dto || !status) return dto;

    const clone = { ...dto };

    const map = {
      PENDING: clone.pending,
      IN_PROGRESS: clone.inProgress,
      SUBMITTED: clone.submitted,
      COMPLETED: clone.completed,
      REJECTED: clone.rejected,
    };

    const newTotal = map[status] ?? 0;

    clone.total = newTotal;
    clone.pending = status === "PENDING" ? clone.pending : 0;
    clone.inProgress = status === "IN_PROGRESS" ? clone.inProgress : 0;
    clone.submitted = status === "SUBMITTED" ? clone.submitted : 0;
    clone.completed = status === "COMPLETED" ? clone.completed : 0;
    clone.rejected = status === "REJECTED" ? clone.rejected : 0;

    return clone;
  }

  /* ------------------------------------ Fetch Report ------------------------------------ */
  const handleFetch = async (e) => {
    e.preventDefault();

    if (!validDates()) {
      openModal(
        "Invalid Date Range",
        "Please select a proper Start and End date.",
        () => {
          toast.error("Invalid date range.");
          closeModal();
        }
      );
      return;
    }

    if (user.role !== "EMPLOYEE") {
      if (scope === "DEPARTMENT" && !selectedDept) {
        openModal(
          "Department Required",
          "Please select a department.",
          () => {
            toast.error("No department selected.");
            closeModal();
          }
        );
        return;
      }

      if (scope === "EMPLOYEE" && !selectedEmployee) {
        openModal(
          "Employee Required",
          "Please select an employee.",
          () => {
            toast.error("No employee selected.");
            closeModal();
          }
        );
        return;
      }
    }

    setLoading(true);
    setStats(null);

    try {
      let data;

      if (user.role === "EMPLOYEE" || scope === "MY") {
        data = await getMyStats(startDate, endDate);
      } else if (scope === "EMPLOYEE") {
        data = await getEmployeeStats(selectedEmployee, startDate, endDate);
      } else {
        data = await getDepartmentStats(selectedDept, startDate, endDate);
      }

      setStats(filterStatus(data, selectedStatus));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch report.");
    }

    setLoading(false);
  };

  /* ------------------------------------ Export PDF ------------------------------------ */
  const exportPDF = async () => {
    if (!stats) {
      toast.error("No data to export");
      return;
    }

    openModal("Export PDF?", "Do you want to download the report as PDF?", async () => {
      closeModal();

      try {
        const el = document.getElementById(chartId);
        const canvas = await html2canvas(el);
        const img = canvas.toDataURL("image/png");

        const doc = new jsPDF();
        doc.text("Task Report", 14, 20);
        doc.text(`From: ${startDate}`, 14, 32);
        doc.text(`To: ${endDate}`, 14, 42);

        doc.addImage(img, "PNG", 10, 55, 190, 100);
        doc.save("task_report.pdf");

        toast.success("PDF exported");
      } catch (err) {
        toast.error("Export failed");
      }
    });
  };

  /* ------------------------------------ Excel ------------------------------------ */
  const exportExcel = () => {
    if (!stats) {
      toast.error("No data");
      return;
    }

    const sheet = [
      ["Metric", "Value"],
      ["Total", stats.total],
      ["Pending", stats.pending],
      ["In Progress", stats.inProgress],
      ["Submitted", stats.submitted],
      ["Completed", stats.completed],
      ["Rejected", stats.rejected],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    XLSX.writeFile(wb, "task_report.xlsx");
    toast.success("Excel downloaded");
  };

  /* ------------------------------------ CSV ------------------------------------ */
  const exportCSV = () => {
    if (!stats) {
      toast.error("No data");
      return;
    }

    const rows = [
      ["Metric", "Value"],
      ["Total", stats.total],
      ["Pending", stats.pending],
      ["In Progress", stats.inProgress],
      ["Submitted", stats.submitted],
      ["Completed", stats.completed],
      ["Rejected", stats.rejected],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    saveAs(new Blob([csv], { type: "text/csv" }), "task_report.csv");

    toast.success("CSV downloaded");
  };

  /* ------------------------------------ Chart Data ------------------------------------ */
  const barData = stats
    ? {
        labels: ["Pending", "In Progress", "Submitted", "Completed", "Rejected"],
        datasets: [
          {
            label: "Tasks",
            data: [
              stats.pending,
              stats.inProgress,
              stats.submitted,
              stats.completed,
              stats.rejected,
            ],
            backgroundColor: [
              COLORS.warn,
              COLORS.primary,
              COLORS.accent,
              COLORS.success,
              COLORS.danger,
            ],
          },
        ],
      }
    : {};

  const pieData = barData;

  /* ------------------------------------ UI ------------------------------------ */

  return (
    <div className="tasks-page">
      <Sidebar />

      <div className="tasks-main">
        <Topbar />

        <div className="tasks-container">
          <h1 className="tasks-title">Advanced Reports</h1>

          {/* FILTER FORM */}
          <form className="report-controls advanced" onSubmit={handleFetch}>
            <div className="preset-group">
              <button type="button" className="btn btn-ghost" onClick={() => applyPreset("TODAY")}>Today</button>
              <button type="button" className="btn btn-ghost" onClick={() => applyPreset("WEEK")}>This Week</button>
              <button type="button" className="btn btn-ghost" onClick={() => applyPreset("MONTH")}>This Month</button>
              <button type="button" className="btn btn-ghost" onClick={() => applyPreset("LAST30")}>Last 30 Days</button>
            </div>

            <div className="date-range">
              <label>From</label>
              <input type="date" value={startDate} required onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="date-range">
              <label>To</label>
              <input type="date" value={endDate} required onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="form-field small">
              <label>Scope</label>
              <select value={scope} onChange={(e) => setScope(e.target.value)}>
                {user.role !== "EMPLOYEE" && <option value="DEPARTMENT">Department</option>}
                {user.role !== "EMPLOYEE" && <option value="EMPLOYEE">Employee</option>}
                <option value="MY">My Stats</option>
              </select>
            </div>

            {scope === "DEPARTMENT" && user.role !== "EMPLOYEE" && (
              <div className="form-field small">
                <label>Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedEmployee("");
                  }}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            )}

            {scope === "EMPLOYEE" && user.role !== "EMPLOYEE" && (
              <div className="form-field small">
                <label>Employee</label>
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                  <option value="">Select Employee</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Status Filter */}
            <div className="form-field small">
              <label>Status</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value || "all"} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Loading..." : "Get Stats"}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  openModal(
                    "Reset Filters?",
                    "Are you sure you want to reset all filters?",
                    () => {
                      setStartDate("");
                      setEndDate("");
                      setSelectedDept("");
                      setSelectedEmployee("");
                      setSelectedStatus("");
                      setStats(null);
                      toast.success("Filters reset");
                      closeModal();
                    }
                  )
                }
              >
                Reset
              </button>
            </div>
          </form>

          {/* RESULTS */}
          {stats ? (
            <>
              <div className="stats-grid advanced">
                <div className="card stat-card"><div className="big">{stats.total}</div><div>Total</div></div>
                <div className="card stat-card"><div className="big">{stats.pending}</div><div>Pending</div></div>
                <div className="card stat-card"><div className="big">{stats.inProgress}</div><div>In Progress</div></div>
                <div className="card stat-card"><div className="big">{stats.submitted}</div><div>Submitted</div></div>
                <div className="card stat-card"><div className="big">{stats.completed}</div><div>Completed</div></div>
                <div className="card stat-card"><div className="big">{stats.rejected}</div><div>Rejected</div></div>
              </div>

              <div id={chartId} className="chart-wrap advanced-charts">
                <div className="chart-left">
                  <Bar data={barData} />
                </div>
                <div className="chart-right">
                  <Pie data={pieData} />
                </div>
              </div>

              <div className="export-buttons">
                <button className="btn btn-primary" onClick={exportPDF}>📄 Export PDF</button>
                <button className="btn btn-success" onClick={exportExcel}>📊 Export Excel</button>
                <button className="btn btn-ghost" onClick={exportCSV}>📥 Export CSV</button>
              </div>
            </>
          ) : (
            <div className="empty-state">Select filters and click <b>Get Stats</b>.</div>
          )}
        </div>
      </div>

      {/* GLOBAL MODAL */}
      <PopupModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />
    </div>
  );
}