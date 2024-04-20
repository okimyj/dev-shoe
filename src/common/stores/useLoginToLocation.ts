import { create } from "zustand";
interface IState {
  path: string;
  setPath: (path: string) => void;
}
export const useLoginToLocation = create<IState>((set) => ({
  path: "",
  setPath: (path) => {
    set({ path });
  },
}));
