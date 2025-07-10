import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = "http://localhost:6969";

export const useUserStore = create(
  persist((set) => ({
    user: null,
    token: null,
    loading: false,
    error: null,

    login: async (data) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data);
        const { payload: user, token } = response.data;
        set({ user, token, loading: false, error: null });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return response;
      } catch (err) {
        const errorMessage = err.response.data.message || "Login Failed !";
        // console.log('errorMessage', errorMessage)
        set({ error: errorMessage, loading: false, user: null, token: null });
        throw err
      }
    },

    logout: () => {
      set({ user: null, token: null, error: null });

      delete axios.defaults.headers.common["Authorization"];
    },
  }))
);
