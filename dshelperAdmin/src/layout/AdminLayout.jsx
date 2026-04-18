// src/layout/AdminLayout.jsx
import AdminSidebar from "@/layout/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
