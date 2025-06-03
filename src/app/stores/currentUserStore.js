import { create } from 'zustand';

export const useCurrentUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));
