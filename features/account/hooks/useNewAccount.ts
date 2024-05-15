import { create } from "zustand";

type NewAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening");
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));
