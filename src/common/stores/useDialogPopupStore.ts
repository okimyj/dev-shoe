import { create } from "zustand";
interface IState {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  open: ({
    title,
    subTitle,
    children,
  }: {
    title: string;
    subTitle?: string;
    children: React.ReactNode;
  }) => void;
  close: () => void;
}
export const useDialogPopupStore = create<IState>((set) => ({
  isOpen: false,
  title: "",
  subTitle: "",
  children: undefined,
  open: ({
    title,
    children,
    subTitle,
  }: {
    title: string;
    subTitle?: string;
    children: React.ReactNode;
  }) => set({ isOpen: true, title, subTitle, children }),
  close: () => set({ isOpen: false }),
}));
