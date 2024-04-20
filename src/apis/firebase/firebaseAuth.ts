import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "./firebaseApp";

import { FirebaseSigninResponse } from "./types";
import { FirebaseError } from "@firebase/util";
import { useEffect } from "react";

const useFirebaseAuth = (handleAuthStateChanged: (data: User | null) => void) => {
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      handleAuthStateChanged?.(currentUser);
    });
  }, []);

  const signup = async (email: string, password: string): Promise<FirebaseSigninResponse> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { data: res };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: { code: e.code, message: e.message } };
      else return { error: { code: "", message: "회원가입 실패" } };
    }

    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          const user = credential;
          console.log(user);
          resolve({ data: credential });
        })
        .catch((error) => {
          reject({ error: error });
        });
    });
  };
  const signin = (email: string, password: string): Promise<FirebaseSigninResponse> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          resolve({ data: credential });
        })
        .catch((error) => {
          reject({ error: error });
        });
    });
  };

  const getCurrentUser = () => {
    return getAuth(firebaseApp).currentUser;
  };
  return { signin, signup, getCurrentUser };
};
export default useFirebaseAuth;
