import { useState } from 'react';
import { join, login, kakaoLogin, naverLogin, logout } from '@/services/UserService.jsx';
import { ACCESS_TOKEN_KEY, getAccessToken, getTokenStorage } from '@/utils/tokenStorage.js';
import { useNavigate } from 'react-router-dom';

export default function Dshelper() {
  const navigate = useNavigate();
  const storage = getTokenStorage();
  const [accessTokenInput, setAccessTokenInput] = useState(getAccessToken(storage) ?? '');

  const quickActions = [
    { label: '가입', onClick: join, variant: 'secondary' },
    { label: '로그인', onClick: login, variant: 'primary' },
    { label: '카카오', onClick: kakaoLogin, variant: 'kakao' },
    { label: '네이버', onClick: naverLogin, variant: 'secondary' },
    { label: '로그아웃', onClick: logout, variant: 'ghost' },
  ];

  const adminLinks = [
    { label: '문의', onClick: () => navigate('/admin/inquiry') },
    { label: '예약', onClick: () => navigate('/admin/reservations') },
    { label: '게시글', onClick: () => navigate('/admin/create-post') },
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
          <h1 className="home-title">관리자 홈</h1>
        </div>
        <div className="home-hero-badge">BLUE</div>
      </div>

      <section className="home-token-panel">
        <div className="home-panel-header home-token-header">
          <div>
            <p className="home-panel-kicker home-panel-kicker-light">Access Token</p>
            <h2>토큰 저장</h2>
          </div>
        </div>
        <div className="home-token-row">
          <input
            type="text"
            value={accessTokenInput}
            onChange={(event) => setAccessTokenInput(event.target.value)}
            placeholder="accessToken"
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
            <p className="home-panel-kicker">Auth</p>
            <h2>계정</h2>
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
              </button>
            ))}
          </div>
        </section>

        <section className="home-panel">
          <div className="home-panel-header">
            <p className="home-panel-kicker">Admin</p>
            <h2>관리</h2>
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
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
