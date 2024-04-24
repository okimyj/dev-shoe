import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ModelFormValue, SUB_MODEL_FORM_DEFAULT_VALUE } from "./types";
import { Button } from "@/components/ui/button";
import SubModelListCell from "./SubModelListCell";
import { CirclePlusIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";

interface SubModelListProps {
  form: UseFormReturn<ModelFormValue>;
}
const SubModelList = ({ form }: SubModelListProps) => {
  const { fields, append, remove } = useFieldArray<ModelFormValue>({
    name: "subModels",
    control: form.control,
  });
  const onClickAppend = () => {
    append(SUB_MODEL_FORM_DEFAULT_VALUE);
  };
  const handleRemoveSubmodel = (index: number) => {
    remove(index);
  };
  return (
    <div>
      {fields.map((el, index) => (
        <SubModelListCell key={index} form={form} index={index} />
      ))}
      <Button
        className="mt-10pxr w-full space-x-10pxr"
        variant={"secondary"}
        onClick={onClickAppend}
      >
        <Label>옵션 추가</Label>
        <CirclePlusIcon />
      </Button>
    </div>
  );
};
export default SubModelList;
