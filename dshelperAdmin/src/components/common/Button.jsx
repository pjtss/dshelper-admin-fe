// src/components/common/Button.jsx
export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px 0",
        borderRadius: 10,
        border: "none",
        background: disabled ? "#93c5fd" : "#2563eb",
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}
