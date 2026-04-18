import assert from "node:assert/strict";

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  clearAuthTokens,
  saveAuthTokens,
} from "../src/utils/tokenStorage.js";
import { applyAuthorizationHeader } from "../src/utils/authorizationHeader.js";
import {
  extractAuthTokens,
  persistAuthTokensFromResponse,
} from "../src/utils/authResponse.js";
import { initializeAuthLifecycle } from "../src/utils/authLifecycle.js";

function createStorageMock() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

function createWindowMock() {
  const listeners = new Map();

  return {
    addEventListener(eventName, handler) {
      listeners.set(eventName, handler);
    },
    removeEventListener(eventName) {
      listeners.delete(eventName);
    },
    dispatch(eventName) {
      const handler = listeners.get(eventName);
      if (handler) {
        handler();
      }
    },
  };
}

function runTest(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("saveAuthTokens stores accessToken and refreshToken in localStorage", () => {
  const storage = createStorageMock();

  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), "access-token");
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), "refresh-token");
});

runTest("applyAuthorizationHeader sets Authorization header from localStorage", () => {
  const storage = createStorageMock();
  saveAuthTokens({ accessToken: "header-token", refreshToken: "refresh-token" }, storage);

  const config = applyAuthorizationHeader(
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    storage,
  );

  assert.deepEqual(config.headers, {
    "Content-Type": "application/json",
    Authorization: "header-token",
  });
});

runTest("extractAuthTokens parses kakao login response tokens", () => {
  const tokens = extractAuthTokens({
    accessToken: "parsed-access-token",
    refreshToken: "parsed-refresh-token",
  });

  assert.deepEqual(tokens, {
    accessToken: "parsed-access-token",
    refreshToken: "parsed-refresh-token",
  });
});

runTest("persistAuthTokensFromResponse saves login response tokens in localStorage", () => {
  const storage = createStorageMock();

  const tokens = persistAuthTokensFromResponse(
    {
      accessToken: "stored-access-token",
      refreshToken: "stored-refresh-token",
    },
    storage,
  );

  assert.deepEqual(tokens, {
    accessToken: "stored-access-token",
    refreshToken: "stored-refresh-token",
  });
  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), "stored-access-token");
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), "stored-refresh-token");
});

runTest("initializeAuthLifecycle clears tokens when browser close event fires", () => {
  const storage = createStorageMock();
  const targetWindow = createWindowMock();

  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);
  initializeAuthLifecycle(targetWindow, storage);

  targetWindow.dispatch("beforeunload");

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), null);
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), null);
});

runTest("clearAuthTokens removes tokens explicitly", () => {
  const storage = createStorageMock();
  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);

  clearAuthTokens(storage);

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), null);
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), null);
});
