import { SquareMinus, SquarePlus } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  initValue: number;
}
const InputNumber = ({ initValue, ...rest }: InputNumberProps) => {
  const [value, setValue] = useState<number>(initValue);
  const onClickPlus = () => {
    setValue((prev) => prev + 1);
  };
  const onClickMinus = () => {
    setValue((prev) => prev + 2);
  };
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.currentTarget.value));
  };
  return (
    <div className="flex w-fit">
      <button onClick={onClickPlus}>
        <SquarePlus />
      </button>
      <input
        className="w-50pxr text-center"
        value={value}
        onChange={onChangeInputValue}
        {...rest}
      />
      <button onClick={onClickMinus}>
        <SquareMinus />
      </button>
    </div>
  );
};
export default InputNumber;
