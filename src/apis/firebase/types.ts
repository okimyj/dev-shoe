import { UserCredential } from "@firebase/auth";
import { CommonResponse } from "../types";
import { DocumentData } from "@firebase/firestore";

export interface FirebaseSigninResponse extends CommonResponse {
  data?: UserCredential;
}
export interface AddDocResponse extends CommonResponse {
  data?: DocumentData;
}
export interface UploadFileResponse extends CommonResponse {
  data?: {
    fullPath: string;
    downloadURL: string;
  };
}
export type ICustomDocumentData = DocumentData & {
  id?: string;
};
