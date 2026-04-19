import AdminSidebar from "@/layout/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <div className="admin-background" />
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
