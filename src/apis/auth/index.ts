import { where } from "firebase/firestore";
import FirebaseDB from "../firebase/firebaseDB";
import { UserData, SigninResponse, UserDocumentData, AuthData } from "./types";
import { DB_TYPE } from "../firebase/constants";
import useFirebaseAuth from "../firebase/firebaseAuth";
import { useAuthStore } from "@/common/stores/useAuthStore";
import { User } from "@firebase/auth";
const useAuthAPI = () => {
  const { userData, setData: setUserData } = useAuthStore();
  const onAuthStateChanged = async (data: User | null) => {
    console.log("onAuthStateChanged - data : ", data);
    if (userData?.email !== data?.email) {
      const data = await getCurrentUser();
      setUserData(data);
    }
  };

  const firebaseAuth = useFirebaseAuth(onAuthStateChanged);
  const dbPlatform = new FirebaseDB();

  const signUp = async (userData: UserData): Promise<SigninResponse> => {
    const signupRes = await firebaseAuth.signUp(userData.email, userData.password);
    if (signupRes.error) {
      return { error: signupRes.error };
    }
    const res = await registerUserData(userData);
    return { data: userData };
  };
  const registerUserData = (userData: UserData) => {
    const data: UserDocumentData = {
      ...userData,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    return dbPlatform.addData(DB_TYPE.USERS, data);
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
    const res = await dbPlatform.getData(DB_TYPE.USERS, where("email", "==", currentUser.email));
    let userData = null;
    res.forEach((doc) => {
      userData = doc.data();
    });
    return userData;
  };

  return { signUp, signIn, signOut };
};
export default useAuthAPI;
