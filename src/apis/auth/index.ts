import { where } from "firebase/firestore";
import FirebaseAuth from "../firebase/firebaseAuth";
import FirebaseDB from "../firebase/firebaseDB";
import { UserData, UserDocumentData } from "./types";
import { DB_TYPE } from "../firebase/constants";
const useAuthAPI = () => {
  const authPlatform = new FirebaseAuth();
  const dbPlatform = new FirebaseDB();

  const signup = (userData: UserData): Promise<UserDocumentData> => {
    return new Promise((resolve, reject) => {
      authPlatform
        .signup(userData.email, userData.password)
        .then(() => {
          registerUserData(userData).then(() => {
            resolve(userData);
          });
        })
        .catch((error) => {
          console.log(error);
          reject({ ...error });
        });
    });
  };
  const registerUserData = (userData: UserData) => {
    const data: UserDocumentData = {
      ...userData,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    console.log("registerUserData : ", data);
    return dbPlatform.addData(DB_TYPE.USERS, data);
  };

  const signin = (email: string, password: string) => {
    // fetch, mutation 따로 만들어야 될 듯.

    return authPlatform.signin(email, password);
  };
  const signout = () => {};

  const getCurrentUser = async (): Promise<UserData | null> => {
    const currentUser = authPlatform.getCurrentUser();
    if (!currentUser) return null;
    const res = await dbPlatform.getData(DB_TYPE.USERS, where("email", "==", currentUser.email));
    res.forEach((doc) => {
      console.log(doc.data());
      return doc.data();
    });

    return null;
  };

  return { signup, signin, signout, getCurrentUser };
};
export default useAuthAPI;
