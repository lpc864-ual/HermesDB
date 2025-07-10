import { create } from "zustand";

type AuthScreen = "sign-in" | "sign-up" | "forgot-password";

interface AuthState {
  screen: AuthScreen;
  setScreen: (screen: AuthScreen) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  screen: "sign-in",
  setScreen: (screen) => set({ screen }),
}));