// import React, { useState } from "react";



// export function FilePreview({ file, onRemove }) {
//   if (!file) return null;
//   const ext = file.name.toLowerCase().split(".").pop();
//   const icon =
//     ext === "pdf"
//       ? "📄"
//       : ["jpg", "jpeg", "png", "gif"].includes(ext)
//       ? "🖼️"
//       : "📎";

//   return (
//     <div className="file-preview">
//       <span className="file-icon">{icon}</span>
//       <span className="file-name">{file.name}</span>
//       <button className="file-remove-btn" onClick={onRemove}>
//         ✕
//       </button>
//     </div>
//   );
// }

// export function UrlFilePreview({ url, label, isImage = false, onPreview }) {
//   if (!url) return null;

//   const fullUrl = `http://10.69.8.236:8081/uploads/${url}`;
//   const ext = url.toLowerCase().split(".").pop();
//   const isImageFile = isImage || ["jpg", "jpeg", "png", "gif"].includes(ext);
//   const isPdf = ext === "pdf";

//   const [open, setOpen] = useState(false);

//   const handlePreviewClick = (e) => {
//     e.preventDefault();

//     if (isImageFile && onPreview) {
//       // Open full-screen black overlay
//       onPreview(fullUrl);
//     } else if (isPdf) {
//       // Open PDF in new tab
//       window.open(fullUrl, "_blank");
//     } else {
//       // Other files => download
//       const a = document.createElement("a");
//       a.href = fullUrl;
//       a.download = url;
//       a.click();
//     }
//   };

//   return (
//     <div className="attachment-preview-container">
//       <a href={fullUrl} target="_blank" rel="noreferrer" className="file-link">
//         {label}
//       </a>

//       {/* Inline small preview toggle */}
//       {isImageFile && (
//         <button
//           className="link-btn small"
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           {open ? "▲ Hide Inline" : "▼ Show Inline"}
//         </button>
//       )}

//       {/* New Preview behavior */}
//       <button className="preview-btn small" onClick={handlePreviewClick}>
//         Preview
//       </button>

//       {open && isImageFile && (
//         <div className="image-preview-box">
//           <img src={fullUrl} alt="preview" />
//         </div>
//       )}
//     </div>
//   );
// }

// export function StatCard({ title, value, color }) {
//   return (
//     <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
//       <div className="stat-value">{value}</div>
//       <div className="stat-label">{title}</div>
//     </div>
//   );
// }

// /* ===========================
//    Date & Status Helpers
//    (Pure JS functions, but kept here for convenience)
// =========================== */

// export const getStartOfDay = () => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   return today.getTime();
// };

// export function getTodayRange() {
//   const today = new Date().toISOString().slice(0, 10);
//   return { start: today, end: today };
// }

// export function getThisWeekRange() {
//   const now = new Date();
//   const day = now.getDay();
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

// export function getThisMonthRange() {
//   const now = new Date();
//   const start = new Date(now.getFullYear(), now.getMonth(), 1);
//   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   return {
//     start: start.toISOString().slice(0, 10),
//     end: end.toISOString().slice(0, 10),
//   };
// }

// export function getLast30DaysRange() {
//   const end = new Date();
//   const start = new Date();
//   start.setDate(end.getDate() - 29);

//   return {
//     start: start.toISOString().slice(0, 10),
//     end: end.toISOString().slice(0, 10),
//   };
// }

// export const getStatusColor = (s) =>
//   ({
//     PENDING: "#f59e0b",
//     IN_PROGRESS: "#3b82f6",
//     SUBMITTED: "#8b5cf6",
//     COMPLETED: "#10b981",
//     REJECTED: "#ef4444",
//   }[s] || "#6b7280");

import React, { useState } from "react";
import { FILE_BASE_URL } from "../api/api";
/* ===========================
   UI Helper Components
=========================== */

export function FilePreview({ file, onRemove }) {
  if (!file) return null;
  const ext = file.name.toLowerCase().split(".").pop();
  const icon =
    ext === "pdf"
      ? "📄"
      : ["jpg", "jpeg", "png", "gif"].includes(ext)
        ? "🖼️"
        : "📎";

  return (
    <div className="file-preview">
      <span className="file-icon">{icon}</span>
      <span className="file-name">{file.name}</span>
      <button className="file-remove-btn" onClick={onRemove}>
        ✕
      </button>
    </div>
  );
}

export function UrlFilePreview({ url, label, isImage = false, onPreview }) {
  if (!url) return null;

  // Ensure this IP matches your Spring Boot Application properties
  const fullUrl = `${FILE_BASE_URL}/uploads/${url}`;

  const ext = url.toLowerCase().split(".").pop();
  const isImageFile = isImage || ["jpg", "jpeg", "png", "gif"].includes(ext);
  const isPdf = ext === "pdf";

  const [open, setOpen] = useState(false);

  const handlePreviewClick = (e) => {
    e.preventDefault();

    if (isImageFile && onPreview) {
      // Open full-screen black overlay
      onPreview(fullUrl);
    } else if (isPdf) {
      // Open PDF in new tab
      window.open(fullUrl, "_blank");
    } else {
      // Other files => download
      const a = document.createElement("a");
      a.href = fullUrl;
      a.download = url;
      a.click();
    }
  };

  return (
    <div className="attachment-preview-container">
      <a href={fullUrl} target="_blank" rel="noreferrer" className="file-link">
        {label}
      </a>

      {/* Inline small preview toggle */}
      {isImageFile && (
        <button
          className="link-btn small"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "▲ Hide Inline" : "▼ Show Inline"}
        </button>
      )}

      {/* New Preview behavior */}
      <button className="preview-btn small" onClick={handlePreviewClick}>
        Preview
      </button>

      {open && isImageFile && (
        <div className="image-preview-box">
          <img src={fullUrl} alt="preview" />
        </div>
      )}
    </div>
  );
}

export function StatCard({ title, value, color }) {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
    </div>
  );
}

/* ===========================
   Date & Status Helpers
=========================== */

export const getStartOfDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

export function getTodayRange() {
  const today = new Date().toISOString().slice(0, 10);
  return { start: today, end: today };
}

export function getThisWeekRange() {
  const now = new Date();
  const day = now.getDay();
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

export function getThisMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export function getLast30DaysRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

export const getStatusColor = (s) =>
({
  PENDING: "#f59e0b",
  IN_PROGRESS: "#3b82f6",
  SUBMITTED: "#8b5cf6",
  COMPLETED: "#10b981",
  REJECTED: "#ef4444",
}[s] || "#6b7280");