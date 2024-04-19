import {
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "./firebaseApp";
import { AuthResponse } from "../auth/types";

export default class FirebaseAuth {
  private auth = getAuth(firebaseApp);
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
      signInWithEmailAndPassword(this.auth, email, password)
        .then((credential) => {
          resolve({ data: credential });
        })
        .catch((error) => {
          reject({ error: error });
        });
    });
  }

  getCurrentUser() {
    return getAuth(firebaseApp).currentUser;
  }

  addData() {}
}
