import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:6969",
});

