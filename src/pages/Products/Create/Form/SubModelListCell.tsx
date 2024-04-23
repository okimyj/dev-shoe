import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ModelFormValue } from "./types";
import ProductCell from "./ProductCell";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubModelListCellProps {
  form: UseFormReturn<ModelFormValue>;
  index: number;
}
const SubModelListCell = ({ form, index }: SubModelListCellProps) => {
  const { fields } = useFieldArray<ModelFormValue>({
    name: `subModels.${index}.products`,
    control: form.control,
  });
  return (
    <Accordion className="w-full" type="single" defaultValue={"accordionItem"} collapsible>
      <AccordionItem value="accordionItem">
        <AccordionTrigger>
          <div className="flex w-full items-center">
            <Label className="w-fit px-10pxr">옵션명</Label>
            <div className="flex h-50pxr items-center space-x-10pxr">
              <Input {...form.register(`subModels.${index}.name`)} />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-25pxr py-10pxr">
          {fields.map((el, productIdx) => (
            <ProductCell form={form} subModelIndex={index} index={productIdx} />
          ))}
          <Button
            className="flex w-full items-center justify-center space-x-10pxr border"
            variant={"outline"}
          >
            <Label>사이즈 추가</Label>
            <CirclePlusIcon />
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SubModelListCell;
