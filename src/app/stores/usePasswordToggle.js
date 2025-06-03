import { create } from 'zustand';

export const usePasswordToggle = create((set) => ({
    // State untuk mengatur visibilitas field password
  visibleFields: {},
  toggleVisibility: (field) =>
    set((state) => ({
      visibleFields: {
        ...state.visibleFields,
        [field]: !state.visibleFields[field],
      },
    })),
}));