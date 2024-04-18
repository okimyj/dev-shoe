// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebasePlatform implements Platform {
  // Initialize Firebase
  constructor() {
    console.log(firebaseConfig);
  }
  private app = !firebase.apps.length
    ? initializeApp(firebaseConfig, "dev-shoe")
    : getApp("dev-shoe");

  signup(email: string, password: string): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(this.app), email, password)
        .then((credential) => {
          const user = credential;
          console.log(user);
          resolve({});
        })
        .catch((error) => {
          reject({ error });
        });
    });
  }

  signin(email: string, password: string): Promise<CommonResponse> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(this.app), email, password)
        .then((credential) => {
          resolve({
            data: credential,
          });
        })
        .catch((error) => {
          reject({ error });
        });
    });
  }

  addDoc() {}
}

export default FirebasePlatform;
