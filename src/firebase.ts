import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUrN5TXszdYbA6FEb8jVyL5IPp8Ux9M9s",
  authDomain: "pantry-scout.firebaseapp.com",
  projectId: "pantry-scout",
  storageBucket: "pantry-scout.appspot.com",
  messagingSenderId: "150173536730",
  appId: "1:150173536730:web:2adceca1ca1878a17730e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
