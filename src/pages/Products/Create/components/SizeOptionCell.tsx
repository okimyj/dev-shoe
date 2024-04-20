import InputNumber from "@/components/form/InputNumber";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquareCheckBigIcon, SquareMinusIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";
interface SizeOptionCellProps {
  size: string;
  quantity: number;
  price: string;
  isNew: boolean;
  isEdit: boolean;
  action: () => void;
}
const SizeOptionCell = ({ size, quantity, price, isNew, isEdit }: SizeOptionCellProps) => {
  const onChangeSize = () => {};
  const onChangePrice = () => {};
  return (
    <div className="flex w-full flex-row items-center space-x-10pxr border-t py-10pxr">
      <Label>사이즈</Label>
      <div className="w-50pxr">
        <Input value={size} onChange={onChangeSize} disabled={!(isEdit || isNew)} />
      </div>
      <Label>수량</Label>
      <InputNumber initValue={quantity} />
      <Label>가격</Label>
      <div className="w-100pxr">
        <Input value={price} onChange={onChangePrice} disabled={!(isEdit || isNew)} />
      </div>
      <div className="flex w-50pxr justify-end space-x-5pxr">
        {isNew ? <SquarePlusIcon /> : !isEdit ? <SquareCheckBigIcon /> : <SquareMinusIcon />}
        {!(isEdit || isNew) && <SquarePenIcon />}
      </div>
    </div>
  );
};
export default SizeOptionCell;
