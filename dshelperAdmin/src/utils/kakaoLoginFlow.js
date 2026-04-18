import { persistAuthTokensFromResponse } from "./authResponse.js";
import {
  KAKAO_TOKEN_EXCHANGE_PATH,
  extractKakaoCode,
  getKakaoRedirectUri,
} from "./kakaoAuth.js";

export async function requestKakaoTokens(apiClient, code, location = globalThis.location, storage = globalThis.localStorage) {
  const redirectUri = getKakaoRedirectUri(location);
  const response = await apiClient.post(KAKAO_TOKEN_EXCHANGE_PATH, {
    code,
    redirectUri,
  });

  return persistAuthTokensFromResponse(response.data, storage);
}

export async function handleKakaoLoginCallback(search, apiClient, location = globalThis.location, storage = globalThis.localStorage) {
  const code = extractKakaoCode(search);
  return requestKakaoTokens(apiClient, code, location, storage);
}
