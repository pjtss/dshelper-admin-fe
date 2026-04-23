import { getAccessToken } from "./tokenStorage.js";

export function applyAuthorizationHeader(config, storage = globalThis.localStorage) {
  const accessToken = getAccessToken(storage);

  if (!accessToken) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...(config?.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
