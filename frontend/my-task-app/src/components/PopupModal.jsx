import React from "react";
import "../styles/popup.css";

export default function PopupModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3 className="popup-title">{title}</h3>
        <p className="popup-message">{message}</p>

        <div className="popup-actions">
          <button className="btn btn-success" onClick={onConfirm}>OK</button>
          <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
