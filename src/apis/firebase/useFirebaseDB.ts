import {
  DocumentData,
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { AddDocResponse, GetDocResponse, ICustomDocumentData } from "./types";
import { FirebaseError } from "firebase/app";
const useFirebaseDB = () => {
  const db = getFirestore(firebaseApp);

  const addData = async (dbName: string, data: ICustomDocumentData): Promise<AddDocResponse> => {
    console.log("addData  dbName : ", dbName, " data : ", data);
    try {
      if (data.id) {
        console.log("setDoc - data : ", data);
        const res = await setDoc(doc(db, dbName, data.id), data);
        console.log(res);
        return { data };
      } else {
        const res = await addDoc(collection(db, dbName), data);
        console.log(res);
        return { data: res };
      }
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) return { error: e };
      else return { error: { code: "", message: "데이터 등록 실패" } };
    }
  };
  const getDataByDocId = async <T extends ICustomDocumentData>(
    dbName: string,
    docId: string,
  ): Promise<GetDocResponse<T>> => {
    try {
      const res = await getDoc(doc(db, dbName, docId));
      return { data: res.data() as T };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: e };
      else
        return {
          error: {
            code: "",
            message: `getDataByDocId failed. dbName : ${dbName}, docId : ${docId}`,
          },
        };
    }
  };
  // const updateData = async (dbName:string, )
  const getDatas = (dbName: string, ...queryConstraints: QueryConstraint[]) => {
    const q = query(collection(db, dbName), ...queryConstraints);
    return getDocs(q);
  };
  return { addData, getDatas, getDataByDocId };
};
export default useFirebaseDB;
