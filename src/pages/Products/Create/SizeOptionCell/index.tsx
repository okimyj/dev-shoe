import InputNumber from "@/components/form/InputNumber";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquareCheckBigIcon, SquareMinusIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";
import useSizeOptionCell from "./hooks";

interface SizeOptionCellData {
  id?: string; // 수정 모드인 경우 id가 있겠지.
  optName: string;
  quantity: number;
  price: number;
}
interface SizeOptionCellProps extends SizeOptionCellData {
  isEdit: boolean;
  action: (data: SizeOptionCellData) => void;
}
const SizeOptionCell = ({
  id,
  optName: initOptName,
  price: initPrice,
  quantity: initQuantity,
  isEdit,
}: SizeOptionCellProps) => {
  const { optName, price, handleChangeOptName, handleChangePrice, handleChangeQuantity } =
    useSizeOptionCell({
      initOptName,
      initPrice,
      initQuantity,
    });
  const isNew = !id;

  return (
    <div className="flex w-full flex-row items-center space-x-10pxr border-t py-10pxr">
      <Label>사이즈</Label>
      <div className="w-50pxr">
        <Input value={optName} onChange={handleChangeOptName} disabled={!(isEdit || isNew)} />
      </div>
      <Label>수량</Label>
      <InputNumber initValue={initQuantity} onChangeValue={handleChangeQuantity} />
      <Label>가격</Label>
      <div className="w-100pxr">
        <Input value={price} onChange={handleChangePrice} disabled={!(isEdit || isNew)} />
      </div>
      <div className="flex w-50pxr justify-end space-x-5pxr">
        {isNew ? <SquarePlusIcon /> : !isEdit ? <SquareMinusIcon /> : <SquareCheckBigIcon />}
        {!(isEdit || isNew) && <SquarePenIcon />}
      </div>
    </div>
  );
};
export default SizeOptionCell;
