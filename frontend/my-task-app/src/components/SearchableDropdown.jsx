import React, { useState } from "react";
import "../styles/searchableDropdown.css";

export default function SearchableDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select option...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sd-container">
      {label && <label className="sd-label">{label}</label>}

      <div
        className="sd-select-box"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? options.find((o) => o.value === value)?.label : placeholder}
        <span className="sd-arrow">▾</span>
      </div>

      {open && (
        <div className="sd-dropdown">
          <input
            className="sd-search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="sd-list">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  className="sd-item"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="sd-no-results">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
