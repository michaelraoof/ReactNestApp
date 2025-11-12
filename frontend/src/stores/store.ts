import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthReq, SignUpData, User } from "../interfaces/user.interface";
import { Api } from "../api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  apiErr: string | null;
}

interface UserActions {
  signUp: (data: SignUpData) => Promise<void>;
  loadProfile: () => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}

export const useUserStore = create<AuthState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      apiErr: null,

      clearError: () => set({ apiErr: null }),
      signUp: async (data) => {
        set({ loading: true, apiErr: null });
        try {
          const res: AuthReq = await Api.signUp(data);
          set({ user: res.user, token: res.token, loading: false });
        } catch (e) {
          const err = e as { response?: { data?: { message?: string } } };
          set({
            apiErr: err?.response?.data?.message ?? "error while sign up",
            loading: false,
          });
          throw e;
        }
      },

      loadProfile: async () => {
        set({ loading: true, apiErr: null });
        try {
          const profile = await Api.getUserData();
          set({ user: profile, loading: false });
        } catch {
          set({ loading: false });
        }
      },
      signOut: () => set({ user: null, token: null }),
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
