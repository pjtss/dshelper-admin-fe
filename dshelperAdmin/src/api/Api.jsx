// src/api/api.js
import axios from "axios";
import { applyAuthorizationHeader } from "@/utils/authorizationHeader.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://server.dshelper.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => applyAuthorizationHeader(config),
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
