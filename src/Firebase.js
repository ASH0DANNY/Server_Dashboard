import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAexHjzEWlIYxHI3TWa_NdqM23fD4knzxE",
  authDomain: "supermart-722b5.firebaseapp.com",
  databaseURL: "https://supermart-722b5-default-rtdb.firebaseio.com",
  projectId: "supermart-722b5",
  storageBucket: "supermart-722b5.appspot.com",
  messagingSenderId: "288883114231",
  appId: "1:288883114231:web:99ba79ebfca4ad2af813f2",
  measurementId: "G-L37537DZCZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
