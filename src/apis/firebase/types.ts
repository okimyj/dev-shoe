import { UserCredential } from "@firebase/auth";
import { CommonResponse } from "../types";
import { DocumentData } from "@firebase/firestore";

export type FirebaseSigninResponse = CommonResponse & {
  data?: UserCredential;
};
export type AddDocResponse = CommonResponse & {
  data: DocumentData;
};
export type ICustomDocumentData = DocumentData & {
  id?: string;
};
