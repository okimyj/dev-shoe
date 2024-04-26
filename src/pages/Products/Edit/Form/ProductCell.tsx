import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ModelFormValue } from "./types";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/form/InputNumber";

interface ProductCellProps {
  form: UseFormReturn<ModelFormValue>;
  subModelIndex: number;
  index: number;
}
const ProductCell = ({ form, subModelIndex, index }: ProductCellProps) => {
  const formError = form.formState.errors.subModels?.[subModelIndex]?.products?.[index];
  return (
    <div className="flex w-full flex-row items-center space-x-10pxr border-t py-10pxr">
      <Label>사이즈</Label>
      <div className="w-50pxr">
        <Input
          isError={Boolean(formError?.name?.message)}
          {...form.register(`subModels.${subModelIndex}.products.${index}.name`)}
        />
      </div>
      <Label>수량</Label>
      <div className="w-50pxr">
        <Input {...form.register(`subModels.${subModelIndex}.products.${index}.quantity`)} />
      </div>

      {/* <InputNumber initValue={initQuantity} onChangeValue={handleChangeQuantity} /> */}
      <Label>가격</Label>
      <div className="w-100pxr">
        <Input {...form.register(`subModels.${subModelIndex}.products.${index}.price`)} />
      </div>
    </div>
  );
};

export default ProductCell;
