import { create } from "zustand";

type NavStore = {
  isOpen: boolean,
  setIsOpen: (current: boolean | ((prev: boolean) => boolean)) => void,
  // setIsOpen: (new: boolean | ((prevC: boolean) => boolean)) => void,
}

// const useNavStore = create<NavStore>((set) => ({
//   isOpen: false,
//   setIsOpen: (isOpen) => set((prev?) => ({ isOpen: isOpen })),
// }));

const useNavStore = create<NavStore>((set) => ({
  isOpen: false,
  setIsOpen: (current) => {
    set((state) => {
      const update = ( typeof current === "function" ) ? current(state.isOpen) : current;
      return { isOpen: update };
    });
  },
}));

export default useNavStore;