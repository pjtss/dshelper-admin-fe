import { useState } from 'react';
import { join, login, kakaoLogin, naverLogin, logout } from '@/services/UserService.jsx';
import { ACCESS_TOKEN_KEY, getAccessToken, getTokenStorage } from '@/utils/tokenStorage.js';
import { useNavigate } from 'react-router-dom';

export default function Dshelper() {
  const navigate = useNavigate();
  const storage = getTokenStorage();
  const [accessTokenInput, setAccessTokenInput] = useState(getAccessToken(storage) ?? '');

  const quickActions = [
    { label: '회원가입', description: '기본 조직 계정을 생성합니다.', onClick: join, variant: 'secondary' },
    { label: '로그인', description: '조직 관리자 로그인 요청을 보냅니다.', onClick: login, variant: 'primary' },
    { label: '카카오 로그인', description: '카카오 OAuth 로그인으로 이동합니다.', onClick: kakaoLogin, variant: 'kakao' },
    { label: '네이버 로그인', description: '네이버 OAuth 로그인으로 이동합니다.', onClick: naverLogin, variant: 'secondary' },
    { label: '로그아웃', description: '현재 로그인 세션을 종료합니다.', onClick: logout, variant: 'ghost' },
  ];

  const adminLinks = [
    { label: '문의 관리', description: '미응답 문의를 확인하고 답변합니다.', onClick: () => navigate('/admin/inquiry') },
    { label: '예약 관리', description: '개인/기관 예약 요청을 검토합니다.', onClick: () => navigate('/admin/reservations') },
    { label: '게시글 작성', description: '새 공지나 게시글을 등록합니다.', onClick: () => navigate('/admin/create-post') },
  ];

  const saveAccessToken = () => {
    storage.setItem(ACCESS_TOKEN_KEY, accessTokenInput.trim());
    alert('accessToken을 localStorage에 저장했습니다.');
  };

  return (
    <section className="home-dashboard">
      <div className="home-hero-card">
        <div>
          <p className="home-kicker">DSHelper Admin</p>
          <h1 className="home-title">관리자 작업을 한 화면에서 빠르게 처리하세요.</h1>
          <p className="home-description">
            로그인, 외부 인증, 문의 확인, 예약 검토, 게시글 등록까지 바로 이동할 수 있도록 홈 화면을 정리했습니다.
          </p>
        </div>
        <div className="home-hero-badge">BLUE</div>
      </div>

      <section className="home-token-panel">
        <div className="home-panel-header home-token-header">
          <div>
            <p className="home-panel-kicker home-panel-kicker-light">Access Token</p>
            <h2>액세스 토큰 직접 저장</h2>
          </div>
        </div>
        <div className="home-token-row">
          <input
            type="text"
            value={accessTokenInput}
            onChange={(event) => setAccessTokenInput(event.target.value)}
            placeholder="accessToken을 입력하세요"
            className="home-token-input"
          />
          <button type="button" onClick={saveAccessToken} className="home-token-button">
            저장
          </button>
        </div>
      </section>

      <div className="home-grid">
        <section className="home-panel">
          <div className="home-panel-header">
            <p className="home-panel-kicker">Quick Actions</p>
            <h2>계정 및 인증</h2>
          </div>
          <div className="home-action-grid">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={`home-action-card home-action-card-${action.variant}`}
              >
                <span className="home-action-label">{action.label}</span>
                <span className="home-action-description">{action.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-panel">
          <div className="home-panel-header">
            <p className="home-panel-kicker">Admin Pages</p>
            <h2>운영 바로가기</h2>
          </div>
          <div className="home-link-list">
            {adminLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.onClick}
                className="home-link-card"
              >
                <span className="home-link-title">{link.label}</span>
                <span className="home-link-description">{link.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
