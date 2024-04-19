import {
  QueryConstraint,
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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
  getData(dbName: string, ...queryConstraints: QueryConstraint[]) {
    const q = query(collection(this.db, dbName), ...queryConstraints);
    return getDocs(q);
  }
}
