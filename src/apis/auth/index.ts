import { where } from "firebase/firestore";

import { UserData, SigninResponse, UserDocumentData } from "./types";
import { DBTypes } from "../firebase/constants";
import { useAuthStore } from "@/common/stores/useAuthStore";
import { User } from "@firebase/auth";
import useFirebaseAuth from "../firebase/useFirebaseAuth";
import useFirebaseDB from "../firebase/useFirebaseDB";

const useAuthAPI = () => {
  const { userData, setData: setUserData } = useAuthStore();
  const onAuthStateChanged = async (data: User | null) => {
    if (userData?.uid !== data?.uid) {
      const data = await getCurrentUser();
      setUserData(data);
    } else {
      setUserData(null);
    }
  };

  const firebaseAuth = useFirebaseAuth(onAuthStateChanged);
  const firebaseDB = useFirebaseDB();

  const signUp = async (userData: UserData): Promise<SigninResponse> => {
    const signupRes = await firebaseAuth.signUp(userData.email, userData.password);
    if (signupRes.error) {
      return { error: signupRes.error };
    }
    userData.uid = signupRes.data?.user.uid ?? "";
    const res = await registerUserData(userData);
    return { data: userData };
  };
  const registerUserData = (userData: UserData) => {
    const data: UserDocumentData = {
      ...userData,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    return firebaseDB.addData(DBTypes.USERS, { id: data.uid, ...data });
  };

  const signIn = (email: string, password: string) => {
    // fetch, mutation 따로 만들어야 될 듯.

    return firebaseAuth.signIn(email, password);
  };
  const signOut = () => {
    firebaseAuth.signOut();
  };

  const getCurrentUser = async (): Promise<UserDocumentData | null> => {
    const currentUser = firebaseAuth.getCurrentUser();
    if (!currentUser) return null;
    const res = await firebaseDB.getDataByDocId<UserDocumentData>(DBTypes.USERS, currentUser.uid);

    return res.data ?? null;
  };

  return { signUp, signIn, signOut };
};
export default useAuthAPI;
