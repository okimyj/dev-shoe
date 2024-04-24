import { ICustomDocumentData } from "../firebase/types";

export interface ModelDocumentData extends ICustomDocumentData {
  sellerId: string;
  name: string;
  category: string;
  image: ImageStorageData;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
export interface ImageStorageData extends ICustomDocumentData {
  storePath: string;
  downloadURL: string;
}

export interface SubModelDocumentData extends ICustomDocumentData {
  modelId: string;
  name: string;
  images?: ImageStorageData[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
export interface ProductDocumentData extends ICustomDocumentData {
  modelId: string; // model 먼저 addDoc 하고...
  subModelId: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
