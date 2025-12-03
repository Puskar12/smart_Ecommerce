import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
