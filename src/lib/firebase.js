// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (tu config)
const firebaseConfig = {
  apiKey: "AIzaSyCrb2d0zy_5H_0i_BvvoxLIPtfGGa4GPNM",
  authDomain: "portfolio-59af9.firebaseapp.com",
  projectId: "portfolio-59af9",
  storageBucket: "portfolio-59af9.firebasestorage.app",
  messagingSenderId: "694790409131",
  appId: "1:694790409131:web:625cf7b52014d616cfe0ee",
  measurementId: "G-8FR8Y3SCZE"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que vamos a usar
export const auth = getAuth(app);
export const db = getFirestore(app);
