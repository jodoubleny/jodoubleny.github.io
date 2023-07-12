import { create } from "zustand";

type PortfolioStore = {
  isActive: boolean,
  setIsActive: (current: boolean | ((prev: boolean) => boolean)) => void,
  // setIsOpen: (new: boolean | ((prevC: boolean) => boolean)) => void,
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  isActive: false,
  setIsActive: (current) => {
    set((state) => {
      const update = ( typeof current === "function" ) ? current(state.isActive) : current;
      return { isActive: update };
    });
  },
}));

export default usePortfolioStore;