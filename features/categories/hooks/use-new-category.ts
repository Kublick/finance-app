import { create } from "zustand";

type NewCategoryState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewCategory = create<NewCategoryState>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening");
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));
