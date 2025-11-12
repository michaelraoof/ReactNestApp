import axios from "axios";
import type {
  AuthReq,
  SignUpData,
  User,
  SignInData,
} from "./interfaces/user.interface";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("userData");
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      const token = parsedData?.state?.token;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      console.error("error with token");
    }
  }
  return config;
});

export const Api = {
  async signIn(payload: SignInData): Promise<AuthReq> {
    const { data } = await api.post<AuthReq>("/auth/signin", payload);
    return data;
  },
  async signUp(payload: SignUpData): Promise<AuthReq> {
    const { data } = await api.post<AuthReq>("/auth/signup", payload);
    return data;
  },
  async getUserData(): Promise<User> {
    const { data } = await api.get<User>("/users/profile");
    return data;
  },
};
