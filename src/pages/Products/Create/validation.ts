import * as yup from "yup";
export interface IProductFormData {
  name: string;
  description: string;
  image: File;
}

interface IFieldData {
  title: string;
  placeHolder: string;
  validationKey: keyof IProductFormData;
  inputType: string;
}
export const schema = yup.object({
  name: yup.string().min(2, "최소 2자 이상").required("상품명을 입력해주세요. (2자 이상)"),
});
export const FieldData: IFieldData[] = [
  {
    title: "상품명",
    placeHolder: "Enter ProductName...",
    validationKey: "name",
    inputType: "text",
  },
  {
    title: "설명",
    placeHolder: "Enter Description...",
    validationKey: "description",
    inputType: "text",
  },
];
