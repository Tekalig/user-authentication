import { create } from "zustand";
import axios from "axios";

const url = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

const AuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isChackingAuth: false,

  signup: async (email, password, confirmPassword, userName) => {
    set({ isLoading: true, error: null });
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(`${url}/signup`, {
        userName,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.date.message || "Error on signing up",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  verifyEmail: async (verificationToken) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${url}/verify`, {
        verificationToken,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on verifying email",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${url}/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on logining",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get(`${url}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error on logouting",
        isLoading: false,
      });
      throw new Error(error);
    }
  },

  checkAuth: async () => {
    set({ isChackingAuth: true });
    try {
      const response = await axios.get(`${url}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({
        error: error.response.data.message,
        user: null,
        isAuthenticated: false,
      });
    }
    set({ isChackingAuth: false });
  },
}));

export default AuthStore;
