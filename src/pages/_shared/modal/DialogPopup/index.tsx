import { useDialogPopupStore } from "@/common/stores/useDialogPopupStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const DialogPopup = () => {
  const { isOpen, title, subTitle, children, close } = useDialogPopupStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        close();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subTitle ?? <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default DialogPopup;
