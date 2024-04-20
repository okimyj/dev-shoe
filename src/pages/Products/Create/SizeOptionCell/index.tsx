import InputNumber from "@/components/form/InputNumber";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquareCheckBigIcon, SquareMinusIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";
import { ChangeEvent } from "react";
import useSizeOptionCell from "./hooks";
interface SizeOptionCellProps {
  optName: string;
  quantity: number;
  price: number;
  isNew: boolean;
  isEdit: boolean;
  action: () => void;
}
const SizeOptionCell = ({
  optName: initOptName,
  price: initPrice,
  quantity: initQuantity,
  isNew,
  isEdit,
}: SizeOptionCellProps) => {
  const { optName, price, quantity, handleChangeOptName, handleChangePrice } = useSizeOptionCell({
    initOptName,
    initPrice,
    initQuantity,
  });
  return (
    <div className="flex w-full flex-row items-center space-x-10pxr border-t py-10pxr">
      <Label>사이즈</Label>
      <div className="w-50pxr">
        <Input value={optName} onChange={handleChangeOptName} disabled={!(isEdit || isNew)} />
      </div>
      <Label>수량</Label>
      <InputNumber initValue={quantity} />
      <Label>가격</Label>
      <div className="w-100pxr">
        <Input value={price} onChange={handleChangePrice} disabled={!(isEdit || isNew)} />
      </div>
      <div className="flex w-50pxr justify-end space-x-5pxr">
        {isNew ? <SquarePlusIcon /> : !isEdit ? <SquareCheckBigIcon /> : <SquareMinusIcon />}
        {!(isEdit || isNew) && <SquarePenIcon />}
      </div>
    </div>
  );
};
export default SizeOptionCell;
