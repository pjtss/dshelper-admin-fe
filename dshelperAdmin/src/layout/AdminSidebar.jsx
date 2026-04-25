import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "홈" },
  { to: "/admin/inquiry", label: "문의 관리" },
  { to: "/admin/reservations", label: "예약 관리" },
  { to: "/admin/create-post", label: "게시글 작성" },
];

export default function AdminSidebar() {
  return (
    <aside className="app-sidebar px-3 px-lg-4 py-4 py-lg-5 text-white">
      <div className="mb-4">
        <div className="text-uppercase small fw-bold opacity-75 mb-2">DSHelper</div>
        <h1 className="h4 fw-bold mb-1">관리자 센터</h1>
        <p className="mb-0 small text-white-50">관리 기능을 한 화면에서 처리합니다.</p>
      </div>

      <nav className="nav nav-pills flex-column gap-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
