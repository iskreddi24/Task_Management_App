// import React, { useState, useEffect } from "react";
// import { FilePreview, UrlFilePreview } from "../utils/TaskHelpers";

// /* ===========================
//    1. Draggable History Drawer
// =========================== */
// export function HistoryDrawer({ open, onClose, history, clickEvent }) {
//   const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   // Initialize position based on click or center
//   useEffect(() => {
//     if (open) {
//       let x = window.innerWidth / 2 - 275;
//       let y = window.innerHeight / 2 - 250;

//       if (clickEvent && clickEvent.currentTarget) {
//         const rect = clickEvent.currentTarget.getBoundingClientRect();
//         x = rect.left + rect.width / 2 - 275;
//         y = rect.top + window.scrollY - 40;
//       }
//       setModalPos({ x: Math.max(16, x), y: Math.max(16, y) });
//     }
//   }, [open, clickEvent]);

//   // Drag Logic
//   const startDrag = (e) => {
//     setDragging(true);
//     setDragOffset({
//       x: e.clientX - modalPos.x,
//       y: e.clientY - modalPos.y,
//     });
//   };

//   const stopDrag = () => setDragging(false);

//   const onDrag = (e) => {
//     if (!dragging) return;
//     setModalPos({
//       x: e.clientX - dragOffset.x,
//       y: e.clientY - dragOffset.y,
//     });
//   };

//   useEffect(() => {
//     if (dragging) {
//       window.addEventListener("mousemove", onDrag);
//       window.addEventListener("mouseup", stopDrag);
//     }
//     return () => {
//       window.removeEventListener("mousemove", onDrag);
//       window.removeEventListener("mouseup", stopDrag);
//     };
//   }, [dragging, dragOffset]);

//   if (!open) return null;

//   return (
//     <div className="history-modal-overlay">
//       <div
//         className="history-modal"
//         style={{ top: modalPos.y, left: modalPos.x }}
//         onMouseDown={startDrag}
//       >
//         <div className="history-modal-header" onMouseDown={startDrag}>
//           <strong>Task History</strong>
//           <button className="btn-close" onClick={onClose}>✕</button>
//         </div>

//         <div className="history-modal-body">
//           {history.length === 0 ? (
//             <div className="empty">No history available</div>
//           ) : (
//             history.map((h, i) => (
//               <div className="history-item" key={i}>
//                 <div className="history-top">
//                   <strong>{h.actionType}</strong>
//                   <span>{new Date(h.timestamp).toLocaleString()}</span>
//                 </div>
//                 <div><strong>{h.actionBy}</strong></div>
//                 {h.comment && <div className="history-comment">💬 {h.comment}</div>}
//                 {h.fileUrl && (
//                   <div className="history-file">
//                     <a
//                       href={`http://10.69.8.236:8081/uploads/${h.fileUrl}`}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       📎 View File
//                     </a>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===========================
//    2. Edit Task Modal
// =========================== */
// export function EditTaskModal({
//   open,
//   onClose,
//   editForm,
//   setEditForm,
//   handleSave,
//   userRole,
//   userDeptId,
//   departments,
//   getUsersInDepartment,
//   setPreview
// }) {
//   if (!open) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <div className="modal-header">
//           <h3>Edit Task</h3>
//           <button className="btn-close" onClick={onClose}>✕</button>
//         </div>

//         <div className="modal-body">
//           <div className="form-field">
//             <label>Title *</label>
//             <input
//               value={editForm.title}
//               onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//             />
//           </div>

//           <div className="form-field">
//             <label>Description</label>
//             <textarea
//               rows={4}
//               value={editForm.description}
//               onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//             ></textarea>
//           </div>

//           <div className="form-field">
//             <label>Change Attachment (optional)</label>
//             {!editForm.file ? (
//               <input
//                 type="file"
//                 onChange={(e) => setEditForm({ ...editForm, file: e.target.files[0] })}
//               />
//             ) : (
//               <FilePreview
//                 file={editForm.file}
//                 onRemove={() => setEditForm({ ...editForm, file: null })}
//               />
//             )}
//             {editForm.currentAttachmentUrl && (
//               <UrlFilePreview
//                 url={editForm.currentAttachmentUrl}
//                 label="Current File"
//                 onPreview={(url) => setPreview({ open: true, url })}
//               />
//             )}
//           </div>

//           {(userRole === "SUPER_ADMIN" || userRole === "DEPT_HEAD") && (
//             <div className="form-field">
//               <label>Assignee *</label>
//               <select
//                 value={editForm.assigneeId}
//                 onChange={(e) => setEditForm({ ...editForm, assigneeId: e.target.value })}
//               >
//                 <option value="">— Select —</option>
//                 {departments
//                   .filter((d) => userRole === "SUPER_ADMIN" || userDeptId === d.id)
//                   .flatMap((d) =>
//                     getUsersInDepartment(d.id)
//                       .filter((u) => u.role !== "SUPER_ADMIN")
//                       .map((u) => ({ ...u, deptName: d.name }))
//                   )
//                   .map((u) => (
//                     <option key={u.id} value={u.id}>
//                       {u.username} ({u.role}) - {u.deptName}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}
//         </div>

//         <div className="modal-footer">
//           <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
//           <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===========================
//    3. Image Preview Overlay
// =========================== */
// export function ImagePreviewOverlay({ open, url, onClose }) {
//   if (!open) return null;
//   return (
//     <div className="image-preview-overlay" onClick={onClose}>
//       <img src={url} alt="Preview" onClick={(e) => e.stopPropagation()} />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { FilePreview, UrlFilePreview } from "../utils/TaskHelpers";
import { FILE_BASE_URL } from "../api/api";
/* ===========================
   1. Draggable History Drawer
=========================== */
export function HistoryDrawer({ open, onClose, history, clickEvent }) {
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize position based on click or center
  useEffect(() => {
    if (open) {
      let x = window.innerWidth / 2 - 275;
      let y = window.innerHeight / 2 - 250;

      if (clickEvent && clickEvent.currentTarget) {
        const rect = clickEvent.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2 - 275;
        y = rect.top + window.scrollY - 40;
      }
      setModalPos({ x: Math.max(16, x), y: Math.max(16, y) });
    }
  }, [open, clickEvent]);

  // Drag Logic
  const startDrag = (e) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - modalPos.x,
      y: e.clientY - modalPos.y,
    });
  };

  const stopDrag = () => setDragging(false);

  const onDrag = (e) => {
    if (!dragging) return;
    setModalPos({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [dragging, dragOffset]);

  if (!open) return null;

  return (
    <div className="history-modal-overlay">
      <div
        className="history-modal"
        style={{ top: modalPos.y, left: modalPos.x }}
        onMouseDown={startDrag}
      >
        <div className="history-modal-header" onMouseDown={startDrag}>
          <strong>Task History</strong>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="history-modal-body">
          {history.length === 0 ? (
            <div className="empty">No history available</div>
          ) : (
            history.map((h, i) => (
              <div className="history-item" key={i}>
                <div className="history-top">
                  <strong>{h.actionType}</strong>
                  <span>{new Date(h.timestamp).toLocaleString()}</span>
                </div>
                <div><strong>{h.actionBy}</strong></div>
                {h.comment && <div className="history-comment">💬 {h.comment}</div>}
                {h.fileUrl && (
                  <div className="history-file">
                    <a
                      href={`${FILE_BASE_URL}/uploads/${h.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📎 View File
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   2. Edit Task Modal
=========================== */
export function EditTaskModal({
  open,
  onClose,
  editForm,
  setEditForm,
  handleSave,
  userRole,
  userDeptId,
  departments,
  getUsersInDepartment,
  setPreview
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-field">
            <label>Title *</label>
            <input
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea
              rows={4}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            ></textarea>
          </div>

          <div className="form-field">
            <label>Change Attachment (optional)</label>
            {!editForm.file ? (
              <input
                type="file"
                onChange={(e) => setEditForm({ ...editForm, file: e.target.files[0] })}
              />
            ) : (
              <FilePreview
                file={editForm.file}
                onRemove={() => setEditForm({ ...editForm, file: null })}
              />
            )}
            {editForm.currentAttachmentUrl && (
              <UrlFilePreview
                url={editForm.currentAttachmentUrl}
                label="Current File"
                onPreview={(url) => setPreview({ open: true, url })}
              />
            )}
          </div>

          {(userRole === "SUPER_ADMIN" || userRole === "DEPT_HEAD") && (
            <div className="form-field">
              <label>Assignee *</label>
              <select
                value={editForm.assigneeId}
                onChange={(e) => setEditForm({ ...editForm, assigneeId: e.target.value })}
              >
                <option value="">— Select —</option>
                {departments
                  .filter((d) => userRole === "SUPER_ADMIN" || userDeptId === d.id)
                  .flatMap((d) =>
                    getUsersInDepartment(d.id)
                      .filter((u) => u.role !== "SUPER_ADMIN")
                      .map((u) => ({ ...u, deptName: d.name }))
                  )
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.role}) - {u.deptName}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   3. Image Preview Overlay
=========================== */
export function ImagePreviewOverlay({ open, url, onClose }) {
  if (!open) return null;
  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <img src={url} alt="Preview" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}