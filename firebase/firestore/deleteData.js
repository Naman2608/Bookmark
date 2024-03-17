import {  getFirestore,doc, deleteDoc } from "firebase/firestore";
import firebase_app from "../config";
import EventBus from "/lib/EventBus.ts";

const db = getFirestore(firebase_app)


export default async function deleteData(colllection,id) {

    try {
        const newRef = doc(db,colllection,id);
        await deleteDoc(newRef);    
        EventBus.getInstance().fireEvent('refereshData');

    } catch (e) {
        return 0;
    }
    return 1;
}
