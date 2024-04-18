import { DocumentData } from "@firebase/firestore";
export interface Error {
  code: string;
  message: string;
}
export interface CommonResponse {
  data?: any;
  error?: Error;
}
export interface ICustomDocumentData extends DocumentData {
  id?: string;
}
