import { useDialogPopupStore } from "@/common/stores/useDialogPopupStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import OptionListCell from "./components/OptionListCell";
import useProductCreate from "./hooks";
import OptionList from "./components/OptionList";
export interface ProductCreatePageProps {
  modelId: string;
  isEdit?: boolean;
}
const ProductCreatePage = ({ modelId, isEdit }: ProductCreatePageProps) => {
  const { handleCancel, handleSubmit } = useProductCreate({ modelId, isEdit });
  const { open: dialogOpen } = useDialogPopupStore();
  const onClickAddOption = () => {
    dialogOpen({ title: "dialog", subTitle: "test", children: "dialog children" });
  };
  return (
    <InnerBody>
      <div className="min-w-450pxr max-w-750pxr">
        <h1 className="text-left">상품 등록</h1>
        <div className="my-10pxr grid grid-cols-[100px_300px] items-center gap-x-10pxr gap-y-5pxr">
          <Label className="text-left text-xl">상품명</Label>
          <Input placeholder="Enter Product Name.." />
          <Label className="text-left text-xl">카테고리</Label>
          <Input placeholder="Enter Category Name.." />
        </div>

        <h2 className="text-left">옵션</h2>
        <OptionList />
        <Button className="w-full">옵션 추가</Button>
        <div className="mt-10pxr flex w-full justify-end space-x-10pxr">
          <Button className="w-100pxr" variant={"outline"} onClick={handleCancel}>
            취소
          </Button>
          <Button className="w-100pxr" onClick={handleSubmit}>
            {isEdit ? "수정" : "등록"}
          </Button>
        </div>
      </div>
    </InnerBody>
  );
};

export default ProductCreatePage;
