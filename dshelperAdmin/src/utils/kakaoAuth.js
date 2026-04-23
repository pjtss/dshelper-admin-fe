export const KAKAO_CLIENT_ID = "f6e09eeb053caaad27d60a4e451fd9bc";
export const KAKAO_REDIRECT_URI = "https://admin.dshelper.kr/oauth/kakao/callback";
export const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
export const KAKAO_TOKEN_EXCHANGE_URL = "https://server.dshelper.kr/oauth/kakao/login";

export function getKakaoRedirectUri() {
  return KAKAO_REDIRECT_URI;
}

export function createKakaoLoginUrl() {
  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: "code",
  });

  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
}

export function extractKakaoCode(search) {
  const params = new URLSearchParams(search);
  const code = params.get("code");

  if (!code) {
    throw new Error("Kakao authorization code is missing.");
  }

  return code;
}
