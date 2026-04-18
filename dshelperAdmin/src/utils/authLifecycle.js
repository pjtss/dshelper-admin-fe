import { clearAuthTokens } from "./tokenStorage.js";

export function initializeAuthLifecycle(targetWindow = window, storage = globalThis.localStorage) {
  const clearTokensOnClose = () => clearAuthTokens(storage);

  targetWindow.addEventListener("beforeunload", clearTokensOnClose);
  targetWindow.addEventListener("pagehide", clearTokensOnClose);

  return () => {
    targetWindow.removeEventListener("beforeunload", clearTokensOnClose);
    targetWindow.removeEventListener("pagehide", clearTokensOnClose);
  };
}
