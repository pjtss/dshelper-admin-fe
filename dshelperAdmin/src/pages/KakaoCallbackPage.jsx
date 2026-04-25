import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleKakaoLoginCallback } from "@/services/KakaoAuthService.js";

export default function KakaoCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("카카오 로그인 처리 중...");

  useEffect(() => {
    let isMounted = true;

    async function run() {
      try {
        await handleKakaoLoginCallback(location.search);

        if (!isMounted) {
          return;
        }

        setStatus("카카오 로그인 완료");
        navigate("/", { replace: true });
      } catch (error) {
        console.error("카카오 로그인 콜백 처리 실패", error);

        if (!isMounted) {
          return;
        }

        setStatus("카카오 로그인 처리에 실패했습니다.");
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [location.search, navigate]);

  return (
    <div className="callback-screen d-flex align-items-center justify-content-center px-3">
      <div className="page-card text-center p-5" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="spinner-border text-primary mb-4" role="status" />
        <h2 className="h4 fw-bold mb-2">카카오 로그인</h2>
        <p className="text-secondary mb-0">{status}</p>
      </div>
    </div>
  );
}
