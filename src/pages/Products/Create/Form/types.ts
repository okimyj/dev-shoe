export const PRODUCT_FORM_DEFAULT_VALUE: ProductFormValue = { name: "", price: 0, quantity: 0 };
export const SUBMODEL_FORM_DEFAULT_VALUE: SubModelFormValue = {
  name: "",
  products: [PRODUCT_FORM_DEFAULT_VALUE],
};
export const MODEL_FORM_DEFAULT_VALUE: ModelFormValue = {
  name: "",
  category: "",
  subModels: [SUBMODEL_FORM_DEFAULT_VALUE],
};
export interface ModelFormValue {
  name: string;
  category: string;
  subModels: SubModelFormValue[];
}

export interface SubModelFormValue {
  name: string;
  imageFiles?: File[];
  images?: string[];
  products: ProductFormValue[];
}

export interface ProductFormValue {
  name: string;
  price: number;
  quantity: number;
}
