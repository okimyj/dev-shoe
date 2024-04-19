import { ICustomDocumentData } from "../types";

export interface IModelData extends ICustomDocumentData {
  sellerId: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}
export interface IProductData extends ICustomDocumentData {
  modelId: string; // model 먼저 addDoc 하고...
  price: number;
  quantity: number;
  color: string;
  size: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
