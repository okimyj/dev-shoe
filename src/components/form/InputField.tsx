import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeHolder: string;
  inputType: string;
  error?: string;
  register?: UseFormRegisterReturn;
}
const InputField = ({
  title,
  placeHolder,
  inputType,
  error,
  register,
  ...rest
}: IInputFieldProps) => {
  return (
    <div className="grid grid-cols-[minmax(100px,auto)_auto] items-center gap-x-10pxr gap-y-5pxr">
      <h3 className="text-right">{title}</h3>
      <Input
        className="w-200pxr"
        placeholder={placeHolder}
        type={inputType}
        {...register}
        {...rest}
      />
      {error && (
        <span className="col-span-2 col-start-2 grid-cols-subgrid text-left text-xs text-destructive">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;