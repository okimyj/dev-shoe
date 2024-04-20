import { CommonResponse } from "../types";
import { ICustomDocumentData } from "../firebase/types";
export type AuthData = {
  email?: string;
  uid?: string;
};
export type UserData = {
  email: string;
  password: string;
  isSeller: boolean;
  nickname: string;
};
export type SigninResponse = CommonResponse & {
  data?: UserDocumentData;
};

export type UserDocumentData = ICustomDocumentData &
  UserData & {
    createdAt?: string;
    updatedAt?: string;
  };
