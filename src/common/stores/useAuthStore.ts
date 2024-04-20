import { UserData } from "@/apis/auth/types";
import { create } from "zustand";

interface IState {
  userData: UserData | null;
  setData: (data: UserData | null) => void;
}
export const useAuthStore = create<IState>((set) => ({
  userData: null,
  setData: (userData: UserData | null) => set({ userData }),
}));
