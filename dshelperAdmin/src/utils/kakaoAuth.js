export const KAKAO_CLIENT_ID = "f6e09eeb053caaad27d60a4e451fd9bc";
export const KAKAO_REDIRECT_PATH = "/oauth/kakao/callback";
export const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
export const KAKAO_TOKEN_EXCHANGE_PATH = "/oauth/kakao/login";

export function getKakaoRedirectUri(location = globalThis.location) {
  const origin = location?.origin;

  if (!origin) {
    throw new Error("location.origin is not available.");
  }

  return `${origin}${KAKAO_REDIRECT_PATH}`;
}

export function createKakaoLoginUrl(location = globalThis.location) {
  const redirectUri = getKakaoRedirectUri(location);
  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: redirectUri,
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
