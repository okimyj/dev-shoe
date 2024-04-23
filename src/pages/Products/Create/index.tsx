import { useDialogPopupStore } from "@/common/stores/useDialogPopupStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InnerBody from "@/pages/layout/body/inner/InnerBody";
import useProductCreate from "./hooks";
import OptionList from "./OptionList";

import { ChangeEvent, useState } from "react";
import useFirebaseStorage from "@/apis/firebase/useFirebaseStorage";
export interface ProductCreatePageProps {
  modelId?: string;
  isEdit?: boolean;
}
const ProductCreatePage = ({ modelId, isEdit }: ProductCreatePageProps) => {
  const {
    name,
    category,
    options,
    handleChangeName,
    handleChangeCategory,
    handleAddOption,
    handleCancel,
    handleSubmit,
    onChangeFile,
  } = useProductCreate({
    modelId,
    isEdit,
  });

  return (
    <InnerBody>
      <div className="min-w-450pxr max-w-750pxr">
        <h1 className="text-left">상품 등록</h1>
        <div className="my-10pxr grid grid-cols-[100px_300px] items-center gap-x-10pxr gap-y-5pxr">
          <Label className="text-left text-xl">상품명</Label>
          <Input placeholder="Enter Product Name.." value={name} onChange={handleChangeName} />
          <Label className="text-left text-xl">카테고리</Label>
          <Input
            placeholder="Enter Category Name.."
            value={category}
            onChange={handleChangeCategory}
          />
        </div>

        <h2 className="text-left">옵션</h2>
        <OptionList list={options} />
        <Button className="w-full" onClick={handleAddOption}>
          옵션 추가
        </Button>
        <div className="mt-10pxr flex w-full justify-end space-x-10pxr">
          <Button className="w-100pxr" variant={"outline"} onClick={handleCancel}>
            취소
          </Button>
          <Button className="w-100pxr" onClick={handleSubmit}>
            {isEdit ? "수정" : "등록"}
          </Button>
        </div>
        <input type="file" multiple onChange={onChangeFile} />
      </div>
    </InnerBody>
  );
};

export default ProductCreatePage;
