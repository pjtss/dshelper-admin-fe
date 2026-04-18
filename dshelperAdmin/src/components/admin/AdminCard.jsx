// src/components/admin/AdminCard.jsx
export default function AdminCard({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        border: "1px solid #dbeafe",
        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
        marginBottom: "24px",
      }}
    >
      {children}
    </div>
  );
}
 
