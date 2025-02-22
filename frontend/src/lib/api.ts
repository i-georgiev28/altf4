import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // Change this to your API's base URL
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Or get it from context/state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

export default api;