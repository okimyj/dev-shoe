import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ModelFormValue, PRODUCT_FORM_DEFAULT_VALUE } from "./types";
import ProductCell from "./ProductCell";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorLabel from "@/components/form/ErrorLabel";
import { ChangeEvent, MouseEvent, useCallback } from "react";
import { imagesToDataURL } from "@/common/utils";
import ThumbnailPreview from "@/components/form/ThumbnailPreview";

interface SubModelListCellProps {
  form: UseFormReturn<ModelFormValue>;
  index: number;
}
const SubModelListCell = ({ form, index }: SubModelListCellProps) => {
  const { fields: productFields, append } = useFieldArray<ModelFormValue>({
    name: `subModels.${index}.products`,
    control: form.control,
  });

  const { fields: imageFields, append: appendImageField } = useFieldArray({
    name: `subModels.${index}.images`,
    control: form.control,
  });

  const onClickAppend = useCallback(() => {
    append(PRODUCT_FORM_DEFAULT_VALUE);
  }, [append]);

  const onChangeImageFileField = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files) return;

      const images = await imagesToDataURL(Object.values(e.currentTarget.files));
      images.forEach((src) => {
        appendImageField({ src });
      });
    },
    [form, index, imageFields],
  );

  const handleRemoveImage = useCallback(
    (imageIdx: number) => {
      console.log("handleRemoveImage - ", imageIdx);
      const copy = [...imageFields];
      copy.splice(imageIdx, 1);

      form.setValue(`subModels.${index}.images`, copy);
      form.trigger(`subModels.${index}.images`);
    },
    [form, index, imageFields],
  );

  const formError = form.formState.errors.subModels?.[index];
  return (
    <Accordion className="w-full" type="single" defaultValue={"accordionItem"} collapsible>
      <AccordionItem value="accordionItem">
        <AccordionTrigger>
          <div className="flex w-full items-center">
            <Label className="w-fit cursor-pointer px-10pxr">옵션명</Label>
            <div className="flex h-50pxr items-center space-x-10pxr">
              <div className="w-150pxr">
                <Input
                  isError={Boolean(formError?.name?.message)}
                  {...form.register(`subModels.${index}.name`)}
                  onClick={(e: MouseEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                  }}
                />
              </div>
              <ErrorLabel error={form.formState.errors.subModels?.[index]?.name?.message ?? ""} />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-5pxr flex-col">
            <Label className="flex cursor-pointer items-center space-x-5pxr">
              <span>상품 이미지 추가</span>
              <CirclePlusIcon />
              <input
                type="file"
                multiple
                className="hidden"
                accept=".jpg, .jpeg, .png .webp"
                onChange={onChangeImageFileField}
              />
            </Label>
            {imageFields.length > 0 && (
              <ul className="h-80pxr my-10pxr space-x-5pxr">
                {imageFields.map((el, imageIdx) => (
                  <li className="float-left" key={imageIdx}>
                    <ThumbnailPreview
                      className="w-80pxr"
                      src={el.src}
                      data={imageIdx}
                      onDelete={handleRemoveImage}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-25pxr py-10pxr">
            {productFields.map((el, productIdx) => (
              <ProductCell key={el.id} form={form} subModelIndex={index} index={productIdx} />
            ))}
          </div>
          <Button
            className="flex w-full items-center justify-center space-x-10pxr border"
            variant={"outline"}
            onClick={onClickAppend}
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
