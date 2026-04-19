import BaseApi from "../api/BaseApi.jsx";
import { createKakaoLoginUrl } from "../utils/kakaoAuth.js";
import {
  handleKakaoLoginCallback as handleKakaoLoginCallbackFlow,
  requestKakaoTokens as requestKakaoTokensFlow,
} from "../utils/kakaoLoginFlow.js";

export function redirectToKakaoLogin(targetLocation = globalThis.location) {
  const loginUrl = createKakaoLoginUrl();
  targetLocation.href = loginUrl;
  return loginUrl;
}

export async function requestKakaoTokens(
  code,
  apiClient = BaseApi,
  storage = globalThis.localStorage,
) {
  return requestKakaoTokensFlow(apiClient, code, storage);
}

export async function handleKakaoLoginCallback(
  search,
  apiClient = BaseApi,
  storage = globalThis.localStorage,
) {
  return handleKakaoLoginCallbackFlow(search, apiClient, storage);
}
