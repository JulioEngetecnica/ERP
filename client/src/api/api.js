// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de resposta (tratamento global de erros)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Erro inesperado na comunicação com o servidor";

    return Promise.reject({
      status: error.response?.status,
      message,
    });
  }
);

export default api;
