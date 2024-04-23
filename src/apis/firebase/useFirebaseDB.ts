import {
  QueryConstraint,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { AddDocResponse, ICustomDocumentData } from "./types";
import { FirebaseError } from "firebase/app";
const useFirebaseDB = () => {
  const db = getFirestore(firebaseApp);
  const addData = async (dbName: string, data: ICustomDocumentData): Promise<AddDocResponse> => {
    console.log("addData  dbName : ", dbName, " data : ", data);
    try {
      const res = await addDoc(collection(db, dbName), data);
      console.log(res);
      return { data: res };
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) return { error: e };
      else return { error: { code: "", message: "데이터 등록 실패" } };
    }
  };
  // const updateData = async (dbName:string, )
  const getData = (dbName: string, ...queryConstraints: QueryConstraint[]) => {
    const q = query(collection(db, dbName), ...queryConstraints);
    return getDocs(q);
  };
  return { addData, getData };
};
export default useFirebaseDB;
