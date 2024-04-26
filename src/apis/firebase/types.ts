import { UserCredential } from "@firebase/auth";
import { CommonResponse } from "../types";
import { DocumentData } from "@firebase/firestore";

export interface FirebaseSigninResponse extends CommonResponse {
  data?: UserCredential;
}
export interface AddDocResponse extends CommonResponse {
  data?: ICustomDocumentData;
}
export interface GetDocResponse<T extends ICustomDocumentData> extends CommonResponse {
  data?: T;
}
export interface UploadDataURLData {
  name: string;
  dataURL: string;
}
export interface UploadFileResponse extends CommonResponse {
  data?: {
    storePath: string;
    name: string;
    downloadURL: string;
  };
}
export type ICustomDocumentData = DocumentData & {
  id?: string;
};
