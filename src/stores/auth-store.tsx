import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    // Clear any auth tokens or session data here
    sessionStorage.removeItem("dummyAuth");
    
    // Clear the dummyAuth cookie by setting it with max-age=0, effectively deleting it
    document.cookie = "dummyAuth=; path=/; max-age=0";
    set({ isLoggedIn: false });
  },
}));
