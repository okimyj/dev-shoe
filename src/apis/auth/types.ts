import { UserCredential } from "@firebase/auth";
import { CommonResponse, ICustomDocumentData } from "../types";
export type AuthResponse = CommonResponse & {
  data: UserCredential;
};

export interface IUserData {
  email: string;
  password: string;
  isSeller: boolean;
  nickname: string;
}

export type UserDocumentData = ICustomDocumentData &
  IUserData & {
    createdAt?: string;
    updatedAt?: string;
  };
