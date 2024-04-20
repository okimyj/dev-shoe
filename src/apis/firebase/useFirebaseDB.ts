import {
  QueryConstraint,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { ICustomDocumentData } from "./types";
const useFirebaseDB = () => {
  const db = getFirestore(firebaseApp);
  const addData = (dbName: string, data: ICustomDocumentData) => {
    return addDoc(collection(db, dbName), data);
  };
  const getData = (dbName: string, ...queryConstraints: QueryConstraint[]) => {
    const q = query(collection(db, dbName), ...queryConstraints);
    return getDocs(q);
  };
  return { addData, getData };
};
export default useFirebaseDB;
