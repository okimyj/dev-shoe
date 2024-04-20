import { useDialogPopupStore } from "@/common/stores/useDialogPopupStore";
import InputField from "@/components/form/InputField";
import InputNumber from "@/components/form/InputNumber";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import { SquarePlus } from "lucide-react";
import SizeOptionCell from "./components/SizeOptionCell";
import OptionListCell from "./components/OptionListCell";

const ProductCreatePage = () => {
  const { open: dialogOpen } = useDialogPopupStore();
  const onClickAddOption = () => {
    dialogOpen({ title: "dialog", subTitle: "test", children: "dialog children" });
  };
  return (
    <InnerBody>
      <div className="w-750pxr">
        <h1 className="text-left">상품 등록</h1>
        <div className="my-10pxr grid grid-cols-[100px_300px] items-center gap-x-10pxr gap-y-5pxr">
          <Label className="text-left text-xl">상품명</Label>
          <Input placeholder="Enter Product Name.." />
          <Label className="text-left text-xl">카테고리</Label>
          <Input placeholder="Enter Category Name.." />
        </div>

        <h2 className="text-left">옵션</h2>
        <OptionListCell name="서밋화이트" image="" isNew={false} isEdit={false} />
        <OptionListCell name="서밋화이트" image="" isNew={false} isEdit={true} />
        <OptionListCell name="서밋화이트" image="" isNew={true} isEdit={false} />
        <Button className="w-full">옵션 추가</Button>
      </div>
    </InnerBody>
  );
};

export default ProductCreatePage;
