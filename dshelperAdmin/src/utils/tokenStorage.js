export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export function getTokenStorage(storage = globalThis.localStorage) {
  if (!storage) {
    throw new Error("localStorage is not available.");
  }

  return storage;
}

export function saveAuthTokens(tokens, storage = globalThis.localStorage) {
  const tokenStorage = getTokenStorage(storage);
  const { accessToken, refreshToken } = tokens ?? {};

  if (!accessToken || !refreshToken) {
    throw new Error("Both accessToken and refreshToken are required.");
  }

  tokenStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  tokenStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(storage = globalThis.localStorage) {
  return getTokenStorage(storage).getItem(ACCESS_TOKEN_KEY);
}

export function clearAuthTokens(storage = globalThis.localStorage) {
  const tokenStorage = getTokenStorage(storage);

  tokenStorage.removeItem(ACCESS_TOKEN_KEY);
  tokenStorage.removeItem(REFRESH_TOKEN_KEY);
}
