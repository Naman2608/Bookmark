import { Result } from "postcss";
import firebase_app from "../config";
import { getFirestore, getDocs, collection, query, where,docs } from "firebase/firestore";


const db = getFirestore(firebase_app)
export default async function getData(colllection,inQuery) {
    let result = null;
    let error = null;   
    try{
        const q = query(collection(db, colllection), where(inQuery[0],inQuery[1],inQuery[2]));
        const querySnapshot = await getDocs(q);
        result =  querySnapshot.docs;
    }catch(e){
        error = e;
    }
    // Data Preview
    // console.log(querySnapshot.docs);
    
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.id, " => ", doc.data());
    // })
   return{result,error};
}

