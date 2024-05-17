import { create } from "zustand";

type NewTransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening");
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));
