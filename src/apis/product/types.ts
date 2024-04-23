import { ICustomDocumentData } from "../firebase/types";
export const convertClientToDBData = (
  modelData: ProductModelData,

  sellerId: string,
) => {
  const subModelDBDatas: SubModelDocumentData[] = [];
  const productDBDatas: ProductDocumentData[] = [];
  let image: string = modelData.subModels[0].images?.[0] ?? "";
  const modelDBData = convertModelDBData(modelData, sellerId, image);
  modelData.subModels.forEach((subModel) => {
    subModelDBDatas.push(convertSubModelDBData(subModel, modelData.id));
    subModel.products.forEach((product) => {
      productDBDatas.push(convertProductDBData(product, modelData.id, subModel.id));
    });
  });
  return { modelDBData, subModelDBDatas, productDBDatas };
};
const TEMP_ID_PREFIX = "temp_";
export const isTempID = (id: string) => {
  return id.includes(TEMP_ID_PREFIX);
};
export const convertModelDBData = (model: ProductModelData, sellerId: string, image: string) => {
  // const pickModel: Omit<ProductModelData, "subModels"> = { ...model };
  // console.log("pickModel : ", pickModel);
  const data: ModelDocumentData = {
    id: model.id,
    name: model.name,
    category: model.category,
    sellerId,
    image,
  };
  return data;
};
export const convertSubModelDBData = (subModel: ProductSubModelData, modelId: string) => {
  // const pickSubModel: Pick<ProductSubModelData, "id" | "name" | "images"> = { ...subModel };
  // console.log("pickSubModel : ", pickSubModel);
  const data: SubModelDocumentData = {
    id: subModel.id,
    name: subModel.name,
    images: subModel.images,
    modelId,
  };
  return data;
};
export const convertProductDBData = (product: ProductData, modelId: string, subModelId: string) => {
  // const pickProduct: Pick<ProductData, "name" | "desc" | "price" | "quantity"> = { ...product };
  const data: ProductDocumentData = {
    name: product.name,
    desc: product.desc,
    price: product.price,
    quantity: product.quantity,
    modelId,
    subModelId,
  };
  return data;
};

export type ModelDocumentData = ICustomDocumentData & {
  sellerId: string;
  name: string;
  category: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
export type SubModelDocumentData = ICustomDocumentData & {
  modelId: string;
  name: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
export type ProductDocumentData = ICustomDocumentData & {
  modelId: string; // model 먼저 addDoc 하고...
  subModelId: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
// for ui --

export type ProductModelData = {
  id: string;
  name: string;
  category: string;
  subModels: ProductSubModelData[];
};
export type ProductSubModelData = {
  id: string;
  name: string;
  imageFiles?: File[];
  images?: string[];
  products: ProductData[];
};
export type ProductData = {
  id: string;
  name: string;
  desc: string;
  quantity: number;
  price: number;
};
