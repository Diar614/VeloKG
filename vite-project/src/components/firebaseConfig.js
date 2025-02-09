import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBhcEKqeDKTC0D_-5c0QFTw2juUr31Gbeo",
  authDomain: "velokg-99793.firebaseapp.com",
  projectId: "velokg-99793",
  storageBucket: "velokg-99793.firebasestorage.app",
  messagingSenderId: "900262227758",
  appId: "1:900262227758:web:e77bf269a139b7de1314bf",
  measurementId: "G-03YQDW0H0E"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);  
