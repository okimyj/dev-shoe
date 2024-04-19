import { UserCredential } from "@firebase/auth";
import { CommonResponse, ICustomDocumentData } from "../types";
export interface AuthResponse extends CommonResponse {
  data: UserCredential;
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
