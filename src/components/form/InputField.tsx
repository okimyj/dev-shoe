import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../ui/label";
import ErrorLabel from "./ErrorLabel";

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
    <div className="grid grid-cols-[100px_auto] items-center gap-x-10pxr gap-y-5pxr">
      <h3 className="text-right">{title}</h3>
      {/* <Label className="border text-right">{title}</Label> */}
      <Input
        className="w-200pxr"
        placeholder={placeHolder}
        type={inputType}
        {...register}
        {...rest}
      />
      <ErrorLabel error={error} classNames="col-span-2 col-start-2 grid-cols-subgrid" />
    </div>
  );
};

export default InputField;
