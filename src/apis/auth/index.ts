import { rejects } from "assert";
import FirebaseAuth from "../firebase/firebaseAuth";
import FirebaseDB from "../firebase/firebaseDB";
import { UserData, UserDocumentData } from "./types";
const useAuthAPI = () => {
  const authPlatform = new FirebaseAuth();
  const dbPlatform = new FirebaseDB();

  const signup = ({ email, password, isSeller, nickname }: UserData): Promise<UserDocumentData> => {
    return new Promise((resolve, reject) => {
      authPlatform
        .signup(email, password)
        .then(() => {
          const data: UserDocumentData = {
            email,
            password,
            isSeller,
            nickname,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
          };
          dbPlatform.addData("users", data).then(() => {
            resolve(data);
          });
        })
        .catch((error) => {
          console.log(error);
          reject({ ...error });
        });
    });
  };

  const signin = (email: string, password: string) => {
    // fetch, mutation 따로 만들어야 될 듯.

    return authPlatform.signin(email, password);
  };
  const signout = () => {};

  return { signup, signin, signout };
};
export default useAuthAPI;
