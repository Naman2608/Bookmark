import firebase_app from "../config";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getData(colllection) {


    const querySnapshot = await getDocs(collection(db, colllection));

    // Data Preview
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    })
        ;
    let result = null;
    let error = null;

    try {
        result = querySnapshot;
    } catch (e) {
        error = e;
    }

    return { result, error };
}

