import AdminSidebar from "@/layout/AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="app-shell d-lg-flex">
      <AdminSidebar />
      <main className="app-main">
        <div className="container-fluid px-3 px-lg-4 py-4 py-lg-5">
          {children}
        </div>
      </main>
    </div>
  );
}
