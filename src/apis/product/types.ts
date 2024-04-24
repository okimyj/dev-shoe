import { ICustomDocumentData } from "../firebase/types";

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
