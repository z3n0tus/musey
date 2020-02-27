import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

export const setPersistence = async () => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
