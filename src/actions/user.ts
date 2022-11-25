import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in");
  } catch (err) {
    console.error("Error logging in", err);
  }
};

export const signout = () => signOut(auth);
