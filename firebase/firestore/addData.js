import firebase_app from "../config";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function AddData(colllection, data) {
  let result = null;
  let error = null;

  try {
    const newRef = doc(collection(db, colllection));
    result = await setDoc(newRef, data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addDataWithId(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    const newRef = doc(db, colllection, id);
    result = await setDoc(newRef, data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
