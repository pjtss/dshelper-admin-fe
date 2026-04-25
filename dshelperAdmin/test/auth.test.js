import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

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
import {
  KAKAO_AUTHORIZE_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  KAKAO_TOKEN_EXCHANGE_URL,
  createKakaoLoginUrl,
  extractKakaoCode,
  getKakaoRedirectUri,
} from "../src/utils/kakaoAuth.js";
import {
  handleKakaoLoginCallback,
  requestKakaoTokens,
} from "../src/utils/kakaoLoginFlow.js";

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

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

await runTest("saveAuthTokens stores accessToken and refreshToken in localStorage", async () => {
  const storage = createStorageMock();

  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), "access-token");
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), "refresh-token");
});

await runTest("applyAuthorizationHeader sets Authorization header from localStorage", async () => {
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
    Authorization: "Bearer header-token",
  });
});

await runTest("extractAuthTokens parses kakao login response tokens", async () => {
  const tokens = extractAuthTokens({
    accessToken: "parsed-access-token",
    refreshToken: "parsed-refresh-token",
  });

  assert.deepEqual(tokens, {
    accessToken: "parsed-access-token",
    refreshToken: "parsed-refresh-token",
  });
});

await runTest("persistAuthTokensFromResponse saves login response tokens in localStorage", async () => {
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

await runTest("initializeAuthLifecycle clears tokens when browser close event fires", async () => {
  const storage = createStorageMock();
  const targetWindow = createWindowMock();

  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);
  initializeAuthLifecycle(targetWindow, storage);

  targetWindow.dispatch("beforeunload");

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), null);
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), null);
});

await runTest("clearAuthTokens removes tokens explicitly", async () => {
  const storage = createStorageMock();
  saveAuthTokens({ accessToken: "access-token", refreshToken: "refresh-token" }, storage);

  clearAuthTokens(storage);

  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), null);
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), null);
});

await runTest("createKakaoLoginUrl builds the Kakao authorize URL in the frontend", async () => {
  const loginUrl = createKakaoLoginUrl();
  const parsedUrl = new URL(loginUrl);

  assert.equal(`${parsedUrl.origin}${parsedUrl.pathname}`, KAKAO_AUTHORIZE_URL);
  assert.equal(parsedUrl.searchParams.get("client_id"), KAKAO_CLIENT_ID);
  assert.equal(parsedUrl.searchParams.get("redirect_uri"), KAKAO_REDIRECT_URI);
  assert.equal(parsedUrl.searchParams.get("response_type"), "code");
});

await runTest("getKakaoRedirectUri returns the fixed production callback URL", async () => {
  assert.equal(getKakaoRedirectUri(), KAKAO_REDIRECT_URI);
});

await runTest("extractKakaoCode reads authorization code from callback query", async () => {
  assert.equal(extractKakaoCode("?code=test-kakao-code"), "test-kakao-code");
});

await runTest("requestKakaoTokens sends only code to backend and stores tokens", async () => {
  const storage = createStorageMock();
  const requests = [];
  const apiClient = {
    async post(url, body) {
      requests.push({ url, body });
      return {
        data: {
          accessToken: "backend-access-token",
          refreshToken: "backend-refresh-token",
        },
      };
    },
  };

  const tokens = await requestKakaoTokens(apiClient, "callback-code", storage);

  assert.deepEqual(tokens, {
    accessToken: "backend-access-token",
    refreshToken: "backend-refresh-token",
  });
  assert.deepEqual(requests, [{
    url: KAKAO_TOKEN_EXCHANGE_URL,
    body: {
      code: "callback-code",
    },
  }]);
  assert.equal(storage.getItem(ACCESS_TOKEN_KEY), "backend-access-token");
  assert.equal(storage.getItem(REFRESH_TOKEN_KEY), "backend-refresh-token");
});

await runTest("handleKakaoLoginCallback extracts code and exchanges it for tokens", async () => {
  const storage = createStorageMock();
  const apiClient = {
    async post() {
      return {
        data: {
          accessToken: "callback-access-token",
          refreshToken: "callback-refresh-token",
        },
      };
    },
  };

  const tokens = await handleKakaoLoginCallback("?code=callback-code", apiClient, storage);

  assert.deepEqual(tokens, {
    accessToken: "callback-access-token",
    refreshToken: "callback-refresh-token",
  });
});

await runTest("admin reservation page uses BaseApi instead of raw axios", async () => {
  const source = readFileSync(new URL("../src/services/PersonalReservationService.jsx", import.meta.url), "utf8");

  assert.match(source, /import BaseApi from "@\/api\/BaseApi\.jsx"/);
  assert.doesNotMatch(source, /import axios from "axios"/);
  assert.doesNotMatch(source, /axios\.(get|post|patch|put|delete)\(/);
  assert.match(source, /BaseApi\.(get|patch)\(/);
});

await runTest("inquiry pages use BaseApi instead of raw axios", async () => {
  const listSource = readFileSync(new URL("../src/components/admin/InquiryList.jsx", import.meta.url), "utf8");
  const itemSource = readFileSync(new URL("../src/components/admin/InquiryItem.jsx", import.meta.url), "utf8");

  assert.match(listSource, /import BaseApi from "@\/api\/BaseApi\.jsx"/);
  assert.doesNotMatch(listSource, /import axios from "axios"/);
  assert.doesNotMatch(listSource, /axios\.(get|post|patch|put|delete)\(/);
  assert.match(listSource, /BaseApi\.get\(/);

  assert.match(itemSource, /import BaseApi from "@\/api\/BaseApi\.jsx"/);
  assert.doesNotMatch(itemSource, /import axios from "axios"/);
  assert.doesNotMatch(itemSource, /axios\.(get|post|patch|put|delete)\(/);
  assert.match(itemSource, /BaseApi\.(post|patch)\(/);
});

await runTest("main entry imports bootstrap and project styles", async () => {
  const source = readFileSync(new URL("../src/main.jsx", import.meta.url), "utf8");

  assert.match(source, /bootstrap\/dist\/css\/bootstrap\.min\.css/);
  assert.match(source, /\.\/index\.css/);
});

await runTest("Pages.md documents every current route", async () => {
  const pagesPath = new URL("../Pages.md", import.meta.url);
  assert.equal(existsSync(pagesPath), true);

  const source = readFileSync(pagesPath, "utf8");
  assert.match(source, /`\/`/);
  assert.match(source, /`\/oauth\/kakao\/callback`/);
  assert.match(source, /`\/admin\/inquiry`/);
  assert.match(source, /`\/admin\/reservations`/);
  assert.match(source, /`\/admin\/create-post`/);
});

await runTest("Bootstrap-based classes are applied to home, inquiry, reservation, and post pages", async () => {
  const homeSource = readFileSync(new URL("../src/components/Dshelper.jsx", import.meta.url), "utf8");
  const inquirySource = readFileSync(new URL("../src/components/admin/InquiryItem.jsx", import.meta.url), "utf8");
  const reservationSource = readFileSync(new URL("../src/services/PersonalReservationService.jsx", import.meta.url), "utf8");
  const postSource = readFileSync(new URL("../src/components/posts/PostCreateForm.jsx", import.meta.url), "utf8");
  const buttonSource = readFileSync(new URL("../src/components/common/Button.jsx", import.meta.url), "utf8");

  assert.match(homeSource, /btn btn-light btn-lg/);
  assert.match(homeSource, /btn btn-outline-primary btn-lg/);
  assert.match(inquirySource, /form-control/);
  assert.match(inquirySource, /btn btn-primary/);
  assert.match(reservationSource, /table table-hover align-middle/);
  assert.match(postSource, /form-control form-control-lg/);
  assert.match(buttonSource, /btn btn-primary btn-lg/);
});
