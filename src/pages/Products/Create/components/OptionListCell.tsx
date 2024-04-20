import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SizeOptionCell from "./SizeOptionCell";
import { SquareCheckBigIcon, SquareMinusIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";

interface OptionListCellProps {
  name: string;
  image: string;

  isNew: boolean;
  isEdit: boolean;
}
const OptionListCell = ({ name, image, isNew, isEdit }: OptionListCellProps) => {
  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex w-full items-center justify-between">
            <div className="flex h-50pxr items-center space-x-10pxr">
              <Input value={name} disabled={!isEdit} />
              <img src={image} className="h-50pxr w-50pxr border" alt="대표 이미지" />
            </div>
            <div className="mr-10pxr flex space-x-5pxr">
              {isNew ? <SquarePlusIcon /> : isEdit ? <SquareCheckBigIcon /> : <SquareMinusIcon />}
              {!(isEdit || isNew) && <SquarePenIcon />}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-25pxr py-10pxr">
          <SizeOptionCell
            size="230"
            price="189000"
            quantity={13}
            isNew={false}
            isEdit={true}
            action={() => {}}
          />
          <SizeOptionCell
            size="230"
            price="189000"
            quantity={13}
            isNew={false}
            isEdit={false}
            action={() => {}}
          />
          <SizeOptionCell
            size="230"
            price="189000"
            quantity={13}
            isNew={true}
            isEdit={false}
            action={() => {}}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OptionListCell;
