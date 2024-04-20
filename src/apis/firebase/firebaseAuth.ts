import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
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

  const signUp = async (email: string, password: string): Promise<FirebaseSigninResponse> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { data: res };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: { code: e.code, message: e.message } };
      else return { error: { code: "", message: "회원가입 실패" } };
    }
  };
  const signIn = async (email: string, password: string): Promise<FirebaseSigninResponse> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { data: res };
    } catch (e) {
      if (e instanceof FirebaseError) return { error: { code: e.code, message: e.message } };
      else return { error: { code: "", message: "로그인 실패" } };
    }
  };
  const signOut = async () => {
    firebaseSignOut(auth);
  };

  const getCurrentUser = () => {
    return getAuth(firebaseApp).currentUser;
  };
  return { signIn, signUp, signOut, getCurrentUser };
};
export default useFirebaseAuth;
