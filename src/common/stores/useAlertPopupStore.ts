import { create } from "zustand";
interface IState {
  isOpen: boolean;
  title: string;
  contents: string;
  confirm: string;
  cancel: string;
  onClose?: (confirm: boolean) => void;
  open: (
    title: string,
    contents: string,
    onClose?: (confirm: boolean) => void,
    confirm?: string,
    cancel?: string,
  ) => void;
  close: () => void;
}
export const useAlertPopupStore = create<IState>((set) => ({
  isOpen: false,
  title: "",
  contents: "",
  confirm: "확인",
  cancel: "취소",
  open: (title: string, contents: string, onClose?: (confirm: boolean) => void) =>
    set({ isOpen: true, title, contents, onClose }),
  close: () => set({ isOpen: false }),
}));
