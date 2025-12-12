// src/components/SearchableSelect.jsx
import React, { useState, useMemo } from "react";

/**
 * props:
 *  - options: array of objects
 *  - value: selected value (id/string)
 *  - onChange: (value) => void
 *  - placeholder: string
 *  - labelKey: property name to show (default: 'username' or 'name')
 *  - valueKey: property name used as value (default: 'id')
 */
export default function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  labelKey = "username",
  valueKey = "id",
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const normalized = q.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter(opt => (opt[labelKey] || "").toString().toLowerCase().includes(normalized));
  }, [options, q, labelKey]);

  const selected = options.find(o => String(o[valueKey]) === String(value));

  return (
    <div className="searchable-select" style={{ position: "relative", minWidth: 220 }}>
      <div className="ss-input" onClick={() => setOpen(s => !s)} style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", border: "1px solid #e6e6e6", padding: 8, borderRadius: 6, background: "#fff" }}>
        <div style={{ flex: 1 }}>
          {selected ? `${selected[labelKey]}${selected.role ? ` (${selected.role})` : ""}` : placeholder}
        </div>
        <div style={{ opacity: 0.6 }}>{open ? "▲" : "▼"}</div>
      </div>

      {open && (
        <div className="ss-dropdown" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 40, background: "#fff", border: "1px solid #e6e6e6", borderRadius: 6, boxShadow: "0 6px 20px rgba(2,6,23,0.08)" }}>
          <div style={{ padding: 8 }}>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #e6e6e6" }}
            />
          </div>

          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 12, color: "#6b7280" }}>No results</div>
            ) : (
              filtered.map((opt) => (
                <div key={opt[valueKey]} onClick={() => { onChange(opt[valueKey]); setOpen(false); setQ(""); }} style={{ padding: "10px 12px", cursor: "pointer", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ fontWeight: 600 }}>{opt[labelKey]}</div>
                  {opt.role && <div style={{ fontSize: 12, color: "#6b7280" }}>{opt.role}</div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
