import { UserCredential } from "@firebase/auth";
import { DocumentData } from "@firebase/firestore";
import { CommonResponse, ICustomDocumentData } from "../types";

export interface AuthResponse extends CommonResponse {
  data: UserCredential;
}
export interface AddDocResponse extends CommonResponse {
  data: DocumentData;
}
export interface UserData {
  email: string;
  password: string;
  isSeller: boolean;
  nickname: string;
}

export interface UserDocumentData extends ICustomDocumentData, UserData {
  createdAt?: string;
  updatedAt?: string;
}
