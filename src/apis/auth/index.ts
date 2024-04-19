import { where } from "firebase/firestore";
import FirebaseAuth from "../firebase/firebaseAuth";
import FirebaseDB from "../firebase/firebaseDB";
import { IUserData, UserDocumentData } from "./types";
import { DB_TYPE } from "../firebase/constants";
const useAuthAPI = () => {
  const authPlatform = new FirebaseAuth();
  const dbPlatform = new FirebaseDB();

  const signup = (userData: IUserData): Promise<UserDocumentData> => {
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
  const registerUserData = (userData: IUserData) => {
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

  const getCurrentUser = async (): Promise<UserDocumentData | null> => {
    const currentUser = authPlatform.getCurrentUser();
    if (!currentUser) return null;
    const res = await dbPlatform.getData(DB_TYPE.USERS, where("email", "==", currentUser.email));
    let userData = null;
    res.forEach((doc) => {
      userData = doc.data();
    });
    return userData;
  };

  return { signup, signin, signout, getCurrentUser };
};
export default useAuthAPI;
