import { Link } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "?룧 ?붾㈃" },
  { to: "/admin/inquiry", label: "?벃 臾몄쓽 愿由?" },
  { to: "/admin/reservations", label: "?뱟 ?덉빟 愿由?" },
  { to: "/admin/create-post", label: "?뱷 ?꾩??쒕┛ ?댁빞湲?" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-badge">DS</span>
        <div>
          <p className="sidebar-eyebrow">Workspace</p>
          <h2>DSHelper Admin</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <Link key={item.to} className="sidebar-link" to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
