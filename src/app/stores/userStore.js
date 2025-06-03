import { create } from 'zustand';

export const useUserStore = create((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
}));
