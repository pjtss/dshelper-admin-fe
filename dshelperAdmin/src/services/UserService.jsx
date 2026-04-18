import BaseApi from '@/api/BaseApi.jsx';
import { persistAuthTokensFromResponse } from '@/utils/authResponse.js';
import { clearAuthTokens } from '@/utils/tokenStorage.js';

export const join = async (files) => {
  const dto = {
    email: "test@test.com",
    password: "testtest",
    passwordCheck: "testtest",
    organizationName: "testOrganization",
    organizationPhoneNumber: "010-1234-5678"
  };

  const formData = new FormData();

  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );

  if (files) {
    Array.from(files).forEach((file) => {
      formData.append("certifications", file);
    });
  }

  return await BaseApi.post("/auth/join/organization", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("기관 회원가입 성공", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("기관 회원가입 실패", error);
      throw error;
    });
};

export const login = async () => {
  await BaseApi.post("/auth/login/organization", {
    email: "test@test.com",
    password: "testtest"
  }).then((response) => {
    console.log("로그인 성공", response.data);
    return response.data;
  }).catch((error) => {
    console.error("로그인 실패", error);
    throw error;
  });
};

export const kakaoLogin = async () => {
  try {
    const response = await BaseApi.get("/oauth/kakao/login-url");
    return persistAuthTokensFromResponse(response.data);
  } catch (error) {
    console.error("카카오 로그인 실패", error);
    throw error;
  }
};

export const naverLogin = async () => {
  try {
    const response = await BaseApi.get("/oauth/naver/login-url");
    const naverRedirectUrl = response.data;

    if (naverRedirectUrl) {
      window.location.href = naverRedirectUrl;
    } else {
      console.error("URL 없음");
    }
  } catch (error) {
    console.error("로그인 실패", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await BaseApi.get("/logout");
    clearAuthTokens();
    console.log("로그아웃 성공", response.data);
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};
