import BaseApi from "../api/BaseApi.jsx";
import {
  createKakaoLoginUrl,
} from "../utils/kakaoAuth.js";
import {
  handleKakaoLoginCallback as handleKakaoLoginCallbackFlow,
  requestKakaoTokens as requestKakaoTokensFlow,
} from "../utils/kakaoLoginFlow.js";

export function redirectToKakaoLogin(targetLocation = globalThis.location) {
  const loginUrl = createKakaoLoginUrl(targetLocation);
  targetLocation.href = loginUrl;
  return loginUrl;
}

export async function requestKakaoTokens(
  code,
  apiClient = BaseApi,
  location = globalThis.location,
  storage = globalThis.localStorage,
) {
  return requestKakaoTokensFlow(apiClient, code, location, storage);
}

export async function handleKakaoLoginCallback(
  search,
  apiClient = BaseApi,
  location = globalThis.location,
  storage = globalThis.localStorage,
) {
  return handleKakaoLoginCallbackFlow(search, apiClient, location, storage);
}
