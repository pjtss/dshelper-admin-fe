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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        color: "#1d4ed8",
        fontSize: "20px",
        fontWeight: 700,
      }}
    >
      {status}
    </div>
  );
}
