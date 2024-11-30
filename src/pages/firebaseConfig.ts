// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Importa el servicio de almacenamiento

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaAFDxALiOPc-aXPPdBhBn0iyYylBxc-c",
  authDomain: "propiedapp-b5a7a.firebaseapp.com",
  projectId: "propiedapp-b5a7a",
  storageBucket: "propiedapp-b5a7a.firebasestorage.app",
  messagingSenderId: "83633781100",
  appId: "1:83633781100:web:fcdbd9ac360438b560db49",
  measurementId: "G-1RGXLCTDE0"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Inicializa el servicio de almacenamiento