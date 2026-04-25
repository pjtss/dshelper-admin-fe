import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { join, login, kakaoLogin, naverLogin, logout } from "@/services/UserService.jsx";
import { ACCESS_TOKEN_KEY, getAccessToken, getTokenStorage } from "@/utils/tokenStorage.js";

export default function Dshelper() {
  const navigate = useNavigate();
  const storage = getTokenStorage();
  const [accessTokenInput, setAccessTokenInput] = useState(getAccessToken(storage) ?? "");

  const quickActions = [
    { label: "가입", onClick: join, variant: "secondary", tone: "회원가입을 진행합니다." },
    { label: "로그인", onClick: login, variant: "primary", tone: "일반 로그인 페이지로 이동합니다." },
    { label: "카카오", onClick: kakaoLogin, variant: "kakao", tone: "카카오 인증을 시작합니다." },
    { label: "네이버", onClick: naverLogin, variant: "secondary", tone: "네이버 인증을 시작합니다." },
    { label: "로그아웃", onClick: logout, variant: "ghost", tone: "저장된 인증 정보를 정리합니다." },
  ];

  const adminLinks = [
    { label: "문의", onClick: () => navigate("/admin/inquiry"), description: "응답이 필요한 문의를 확인합니다." },
    { label: "예약", onClick: () => navigate("/admin/reservations"), description: "개인/기관 예약 상태를 변경합니다." },
    { label: "게시글", onClick: () => navigate("/admin/create-post"), description: "공지나 게시글을 등록합니다." },
  ];

  const saveAccessToken = () => {
    storage.setItem(ACCESS_TOKEN_KEY, accessTokenInput.trim());
    alert("accessToken을 localStorage에 저장했습니다.");
  };

  return (
    <section className="d-flex flex-column gap-4">
      <div className="page-card hero-gradient p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4">
          <div>
            <div className="text-uppercase small fw-bold text-primary mb-2">DSHelper Admin</div>
            <h2 className="display-6 fw-bold mb-2">관리자 홈</h2>
            <p className="mb-0 text-secondary">
              인증 처리, 문의 응답, 예약 관리, 게시글 등록을 이 화면에서 빠르게 시작할 수 있습니다.
            </p>
          </div>
          <span className="badge rounded-pill text-bg-primary fs-6 px-4 py-3">Dashboard</span>
        </div>
      </div>

      <section className="page-card token-panel p-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-3">
          <div>
            <div className="text-uppercase small fw-bold text-white-50 mb-2">Access Token</div>
            <h3 className="h4 fw-bold mb-1">로컬 저장</h3>
            <p className="mb-0 text-white-50">수동으로 발급받은 토큰을 입력해 즉시 API 요청에 반영합니다.</p>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-12 col-lg-9">
            <input
              type="text"
              value={accessTokenInput}
              onChange={(event) => setAccessTokenInput(event.target.value)}
              placeholder="accessToken"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-12 col-lg-3">
            <button type="button" onClick={saveAccessToken} className="btn btn-light btn-lg w-100 fw-bold text-primary">
              저장
            </button>
          </div>
        </div>
      </section>

      <div className="row g-4">
        <section className="col-12 col-xl-6">
          <div className="page-card h-100 p-4">
            <div className="mb-4">
              <div className="text-uppercase small fw-bold text-primary mb-2">Auth</div>
              <h3 className="page-section-title mb-1">계정 작업</h3>
              <div className="page-section-subtitle">로그인과 인증 관련 작업을 바로 실행합니다.</div>
            </div>
            <div className="row g-3">
              {quickActions.map((action) => (
                <div key={action.label} className="col-12 col-md-6">
                  <button
                    type="button"
                    onClick={action.onClick}
                    className={`action-tile action-tile-${action.variant} w-100 p-3 text-start`}
                  >
                    <div className="fw-bold fs-5 mb-2">{action.label}</div>
                    <div className="small opacity-75">{action.tone}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="col-12 col-xl-6">
          <div className="page-card h-100 p-4">
            <div className="mb-4">
              <div className="text-uppercase small fw-bold text-primary mb-2">Admin</div>
              <h3 className="page-section-title mb-1">관리 메뉴</h3>
              <div className="page-section-subtitle">운영 업무로 바로 이동할 수 있는 진입점입니다.</div>
            </div>
            <div className="d-grid gap-3">
              {adminLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.onClick}
                  className="btn btn-outline-primary btn-lg text-start rounded-4 px-4 py-3"
                >
                  <div className="fw-bold fs-5">{link.label}</div>
                  <div className="small text-secondary mt-1">{link.description}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
