import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./firebaseApp";
import { AuthResponse } from "../auth/types";

export default class FirebaseAuth {
  signup(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(firebaseApp), email, password)
        .then((credential) => {
          const user = credential;
          console.log(user);
          resolve({ data: credential });
        })
        .catch((error) => {
          reject({ error: error });
        });
    });
  }

  signin(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(firebaseApp), email, password)
        .then((credential) => {
          resolve({ data: credential });
        })
        .catch((error) => {
          reject({ error: error });
        });
    });
  }

  addData() {}
}
