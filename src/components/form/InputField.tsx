import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputFieldProps {
  title: string;
  placeHolder: string;
  inputType: string;
  error?: string;
  register: UseFormRegisterReturn;
}
const InputField = ({ title, placeHolder, inputType, error, register }: IInputFieldProps) => {
  return (
    <div className="grid grid-cols-[100px_auto] items-center gap-x-10pxr gap-y-5pxr">
      <span className="text-right">{title}</span>
      <Input className="w-200pxr" placeholder={placeHolder} type={inputType} {...register} />
      {error && (
        <span className="col-span-2 col-start-2 grid-cols-subgrid text-left text-xs text-destructive">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
