import * as zod from "zod";
export const PRODUCT_FORM_DEFAULT_VALUE: ProductFormValue = {
  id: "",
  name: "",
  price: 0,
  quantity: 0,
};
export const SUB_MODEL_FORM_DEFAULT_VALUE: SubModelFormValue = {
  id: "",
  name: "",
  images: [],
  products: [PRODUCT_FORM_DEFAULT_VALUE],
};
export const MODEL_FORM_DEFAULT_VALUE: ModelFormValue = {
  id: "",
  name: "",
  category: "",
  subModels: [SUB_MODEL_FORM_DEFAULT_VALUE],
};
export interface ModelFormValue {
  id: string;
  name: string;
  category: string;
  subModels: SubModelFormValue[];
}

export interface SubModelFormValue {
  id: string;
  name: string;
  images: { src: string; storePath: string }[];
  products: ProductFormValue[];
}

export interface ProductFormValue {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export const imagesSchema = zod.object({
  src: zod.string(),
  storePath: zod.string(),
});
export const productSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1, "상품명을 입력하세요."),
  price: zod.string().min(1, "가격을 입력하세요."),
  quantity: zod.string().min(1, "수량을 입력하세요."),
});
export const subModelSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1, "옵션명을 입력하세요."),
  products: zod.array(productSchema),
  images: zod
    .array(imagesSchema)
    .refine((images) => images.length > 0, { message: "이미지를 추가하세요." }),
});
export const modelSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(1, "모델명을 입력하세요."),
  category: zod.string().min(1, "카테고리를 입력하세요."),
  subModels: zod.array(subModelSchema),
});
