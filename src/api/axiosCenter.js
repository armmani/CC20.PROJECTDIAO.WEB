import axios from "axios";
import { useUserStore } from "../stores/userStore";

const BASE_URL = "http://localhost:6969";

const axiosCenter = axios.create({
  baseURL: BASE_URL,
});

axiosCenter.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosCenter