import { create } from "zustand";

type TouchDeviceStore = {
  isTouchDevice: boolean,
  setIsTouchDevice: (isTouchDevice: boolean) => void,
}

const useTouchDeviceStore = create<TouchDeviceStore>((set) => ({
  isTouchDevice: (("ontouchstart" in window) || (navigator.maxTouchPoints > 0)),
  setIsTouchDevice: (isTouchDevice) => set({ isTouchDevice }),
}));

export default useTouchDeviceStore;