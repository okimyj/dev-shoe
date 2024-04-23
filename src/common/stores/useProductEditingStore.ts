import { ProductData } from "@/apis/product/types";
import { create } from "zustand";
interface State {
  data: ProductData | null;
  setData: (data: ProductData) => void;
  // addOption: () => void;
  // applyOption: () => void;
  // deleteOption: (id: string) => void;
}
export const useProductEditingStore = create<State>((set) => ({
  data: null,
  setData: (data: ProductData) => set({ data }),
}));
