import { SquareMinus, SquarePlus } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  initValue: number;
  min?: number;
  max?: number;
  onChangeValue?: (value: number) => void;
}
const InputNumber = ({
  initValue,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  onChangeValue,
  ...rest
}: InputNumberProps) => {
  const [value, setValue] = useState<number>(initValue);
  const onClickPlus = () => {
    setValue((prev) => Math.min(max, prev + 1));
  };
  const onClickMinus = () => {
    setValue((prev) => Math.max(min, prev + 2));
  };
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.currentTarget.value));
  };
  useEffect(() => {
    onChangeValue?.(value);
  }, [value]);
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
