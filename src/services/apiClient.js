import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// Inyecta Authorization automáticamente desde localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Normaliza errores + maneja 401 global
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:logout"));
    }

    const message =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      (status === 401 ? "Sesión expirada. Iniciá sesión nuevamente." : null) ||
      err?.message ||
      "Error desconocido";

    return Promise.reject(new Error(message));
  }
);

export default apiClient;