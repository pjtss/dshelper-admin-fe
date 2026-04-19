import { persistAuthTokensFromResponse } from "./authResponse.js";
import {
  KAKAO_TOKEN_EXCHANGE_URL,
  extractKakaoCode,
  getKakaoRedirectUri,
} from "./kakaoAuth.js";

export async function requestKakaoTokens(apiClient, code, storage = globalThis.localStorage) {
  const response = await apiClient.post(KAKAO_TOKEN_EXCHANGE_URL, {
    code,
    redirectUri: getKakaoRedirectUri(),
  });

  return persistAuthTokensFromResponse(response.data, storage);
}

export async function handleKakaoLoginCallback(search, apiClient, storage = globalThis.localStorage) {
  const code = extractKakaoCode(search);
  return requestKakaoTokens(apiClient, code, storage);
}
