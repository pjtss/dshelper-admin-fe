// src/components/common/TextInput.jsx
export default function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16, width: "100%", boxSizing: "border-box" }}>
      <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #bfdbfe",
          background: "#fff",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
