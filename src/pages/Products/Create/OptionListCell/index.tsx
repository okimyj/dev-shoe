import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SizeOptionCell from "../SizeOptionCell";
import { SquareCheckBigIcon, SquareMinusIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";
import useOptionListCell from "./hooks";
import { ProductData, ProductSubModelData } from "@/apis/product/types";

interface OptionListCellProps extends ProductSubModelData {
  isEdit: boolean;
  handleConfirm: (id: string) => void;
  handleDelete: (id: string) => void;
}
const OptionListCell = ({
  id,
  name,
  images,
  products: subOptions,
  isEdit,
  handleConfirm,
  handleDelete,
}: OptionListCellProps) => {
  const { handleChangeName } = useOptionListCell();
  const isNew = !name;
  const ConfirmButton = () => {
    return (
      <SquareCheckBigIcon
        onClick={() => {
          handleConfirm(id);
        }}
      />
    );
  };
  const DeleteButton = () => {
    return (
      <SquareMinusIcon
        onClick={() => {
          handleDelete(id);
        }}
      />
    );
  };

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex w-full items-center justify-between">
            <div className="flex h-50pxr items-center space-x-10pxr">
              <Input value={name} disabled={!(isNew || isEdit)} onChange={handleChangeName} />
              {/* todo : swiper slide */}
              <img
                src={images && images.length > 0 ? images[0] : ""}
                className="h-50pxr w-50pxr border"
                alt="대표 이미지"
              />
            </div>
            <div className="mr-10pxr flex space-x-5pxr">
              {isNew || isEdit ? <ConfirmButton /> : <DeleteButton />}
              {!(isEdit || isNew) && <SquarePenIcon />}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-25pxr py-10pxr">
          {subOptions.map((el) => (
            <SizeOptionCell
              optName="230"
              price={189000}
              quantity={13}
              id={"1"}
              isEdit={true}
              action={() => {}}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OptionListCell;
