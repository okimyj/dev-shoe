import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import useProductCreate from "./hooks";
import SubModelList from "./Form/SubModelList";

export interface ProductCreatePageProps {
  modelId?: string;
  isEdit?: boolean;
}
const ProductCreatePage = ({ modelId, isEdit }: ProductCreatePageProps) => {
  const { handleCancel, handleSubmit } = useProductCreate({
    modelId,
    isEdit,
  });
  const { form } = useProductCreate({ modelId, isEdit });

  return (
    <InnerBody>
      <div className="min-w-450pxr max-w-750pxr">
        <h1 className="text-left">상품 등록</h1>
        <div className="my-10pxr grid grid-cols-[100px_300px] items-center gap-x-10pxr gap-y-5pxr">
          <Label className="text-left text-xl">상품명</Label>
          <Input placeholder="Enter Product Name.." {...form.register("name")} />
          <Label className="text-left text-xl">카테고리</Label>
          <Input placeholder="Enter Category Name.." {...form.register("category")} />
        </div>

        <h2 className="text-left">옵션</h2>
        <SubModelList form={form} />

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
