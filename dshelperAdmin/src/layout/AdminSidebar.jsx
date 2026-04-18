// src/layout/AdminSidebar.jsx
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#2563eb",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        fontWeight: 600,

        // 반응형: 모바일에서는 상단바로 변경
        position: "sticky",
        top: 0,
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>💚 DSHelper Admin</h2>

      <Link style={linkStyle} to="/">🏠 홈 화면</Link>
      <Link style={linkStyle} to="/admin/inquiry">📩 문의 관리</Link>
      <Link style={linkStyle} to="/admin/reservations">📅 예약 관리</Link>
      <Link style={linkStyle} to="/admin/create-post">📝 도와드린 이야기</Link>
    </aside>
  );
}

const linkStyle = {
  color: "white", 
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.14)",
  transition: "0.2s",
  display: "block",
};
