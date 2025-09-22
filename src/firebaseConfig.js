// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWp9cFRYUomr9oXtO1lMGco2I9g9xTwUg",
  authDomain: "evaluacion-react-6931a.firebaseapp.com",
  projectId: "evaluacion-react-6931a",
  storageBucket: "evaluacion-react-6931a.firebasestorage.app",
  messagingSenderId: "195850387803",
  appId: "1:195850387803:web:7962b11bce663923fb1a7e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };