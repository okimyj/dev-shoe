import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { ICustomDocumentData } from "../types";

export default class FirebaseDB {
  private db;
  constructor() {
    this.db = getFirestore(firebaseApp);
  }
  addData(dbName: string, data: ICustomDocumentData) {
    return addDoc(collection(this.db, dbName), data);
  }
}
