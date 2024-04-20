import { create } from "zustand";
interface StateData {
  title: string;
  contents?: string;
  confirm?: string;
  cancel?: string;
  hasCancel?: boolean;
  onClose?: (confirm: boolean) => void;
}
interface IState extends StateData {
  isOpen: boolean;
  open: (data: StateData) => void;
  close: () => void;
}
export const useAlertPopupStore = create<IState>((set) => ({
  isOpen: false,
  title: "",
  contents: "",
  hasCancel: false,
  confirm: "확인",
  cancel: "취소",
  open: (data: StateData) => set({ isOpen: true, ...data }),
  close: () => set({ isOpen: false }),
}));
