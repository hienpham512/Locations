import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ILocation } from "../pages/Table";

export const addToDB = async (
  collectionName: string,
  data: ILocation,
  id: string
) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const updateLocationById = async (
  collectionName: string,
  data: ILocation,
  id: string
) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (err) {
    console.error("Error updating document: ", err);
  }
};

export const deleteLocationId = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
};

export const getAllDataFromCollection = async (collectionName: string) => {
  const docSnap = await getDocs(collection(db, collectionName));
  if (docSnap) {
    const result: ILocation[] = [];
    docSnap.docs.map((doc) =>
      result.push({ ...doc.data(), id: doc.id } as ILocation)
    );
    return result;
  } else {
    return [];
  }
};
