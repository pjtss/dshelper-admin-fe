export const KAKAO_CLIENT_ID = "f6e09eeb053caaad27d60a4e451fd9bc";
export const KAKAO_REDIRECT_URI = "https://admin.dshelper.kr/oauth/kakao/callback";
export const KAKAO_LOGIN_URL = "https://server.dshelper.kr/oauth/kakao/login";
export const KAKAO_TOKEN_EXCHANGE_URL = "https://server.dshelper.kr/oauth/kakao/login";

export function getKakaoRedirectUri() {
  return KAKAO_REDIRECT_URI;
}

export function createKakaoLoginUrl() {
  return KAKAO_LOGIN_URL;
}

export function extractKakaoCode(search) {
  const params = new URLSearchParams(search);
  const code = params.get("code");

  if (!code) {
    throw new Error("Kakao authorization code is missing.");
  }

  return code;
}
