import { useAlertPopupStore } from "@/common/stores/useAlertPopupStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MouseEvent } from "react";
const AlertPopup = () => {
  const { isOpen, title, contents, close, onClose, confirm, cancel } = useAlertPopupStore();
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    close();
    onClose?.(Boolean(e.currentTarget.value));
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{contents}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel value={0} onClick={handleClose}>
            {cancel}
          </AlertDialogCancel>
          <AlertDialogAction value={1} onClick={handleClose}>
            {confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
