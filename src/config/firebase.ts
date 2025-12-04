import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { products } from '../data/products';

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcvxODE7i4hCGFRzij-qZd9H652Cnn2NM",
  authDomain: "smart-e-commerce-app-c8c41.firebaseapp.com",
  projectId: "smart-e-commerce-app-c8c41",
  storageBucket: "smart-e-commerce-app-c8c41.firebasestorage.app",
  messagingSenderId: "566229861406",
  appId: "1:566229861406:web:e4656033e16d006bb55a0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const auth = getAuth(app) 

export const db = getFirestore(app)

// async function upload() {
//   for (let item of products) {
//     await addDoc(collection(db, "products"), item);
//   }
//   console.log("Uploaded!");
// }

// upload();

 export const dataUploadInFirebase = async() =>{
  for (let item of products) {
    await setDoc(
      doc(db, "products", item.id.toString()), // document ID = item.id
      item                                     // data
    );
  }
  console.log("Uploaded without duplicates!");
}


// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
