import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  socialType: 'kakao';
  iat: number;
  exp: number;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
