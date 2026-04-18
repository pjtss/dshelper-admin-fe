import { saveAuthTokens } from "./tokenStorage.js";

export function extractAuthTokens(payload) {
  const accessToken = payload?.accessToken;
  const refreshToken = payload?.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new Error("Login response does not include both accessToken and refreshToken.");
  }

  return { accessToken, refreshToken };
}

export function persistAuthTokensFromResponse(payload, storage = globalThis.localStorage) {
  const tokens = extractAuthTokens(payload);
  saveAuthTokens(tokens, storage);
  return tokens;
}
