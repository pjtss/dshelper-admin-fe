import {join, login, kakaoLogin, naverLogin, logout} from '@/services/UserService.jsx';
import { useNavigate } from 'react-router-dom';

export default function dshelper() {
  const navigate = useNavigate();

  const actionButtons = [
    { label: '?뚯썝媛??', onClick: join, variant: 'secondary' },
    { label: '濡쒓렇??', onClick: login, variant: 'primary' },
    { label: '移댁뭅?ㅻ줈洹몄씤', onClick: kakaoLogin, variant: 'kakao' },
    { label: '?ㅼ씠踰꾨줈洹몄씤', onClick: naverLogin, variant: 'secondary' },
    { label: '濡쒓렇?꾩썐', onClick: logout, variant: 'ghost' },
    { label: '愿由ъ옄 臾몄쓽 愿由??섏씠吏', onClick: () => navigate('/admin/inquiry'), variant: 'secondary' },
    { label: '愿由ъ옄 ?덉빟 愿由??섏씠吏', onClick: () => navigate('/admin/reservations'), variant: 'secondary' },
    { label: '寃뚯떆湲 ?묒꽦 ?섏씠吏', onClick: () => navigate('/admin/create-post'), variant: 'primary' },
  ];

  return (
    <section className="dashboard-shell">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Admin Console</p>
          <h1 className="hero-title">DS Helper</h1>
          <p className="hero-description">
            愿由ъ옄 ?묒뾽 ?댁슜?? 鍮좊Ⅴ寃? 泥섎━?섍퀬, ?덉빟怨? 臾몄쓽瑜? ?? ?뷀뙆?쒖뿉?? 愿由ы븯?몄슂.
          </p>
        </div>
        <div className="hero-accent" />
      </div>

      <div className="dashboard-grid">
        <section className="surface-card action-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Quick Actions</p>
              <h2 className="section-title">諛붾줈 媛湲?</h2>
            </div>
          </div>

          <div className="action-grid">
            {actionButtons.map((button) => (
              <button
                key={button.label}
                type="button"
                onClick={button.onClick}
                className={`action-button action-button-${button.variant}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </section>

        <section className="surface-card info-panel">
          <p className="eyebrow">Workspace</p>
          <h2 className="section-title">?묒뾽 ?곹깭</h2>
          <ul className="info-list">
            <li>?곹깭 踰꾪듉怨? 寃뚯떆湲 ?묒꽦 ?붾옒?? 鍮좊（?쇰줈 ?묎렐?덉뒿?덈떎.</li>
            <li>?앹긽 ?뚮ℓ?? ?흰 諛곌꼍怨? 釉붾（ ?ъ씠?? 諛쒕쭏濡? ?섏젙?섏뿀?듬땲??</li>
            <li>?덉빟 ?? ?쒕퉬?? ?쒗뙋?? ?뺣━?? 醫곗묠?섍쾶 媛쒖꽑?섏뿀?듬땲??</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
