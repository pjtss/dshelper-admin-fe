// src/components/common/TextArea.jsx
export default function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16, width: "100%", boxSizing: "border-box" }}>
      <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={8}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #bfdbfe",
          background: "#fff",
          resize: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
