// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDblOmmtr2olqhFetYFz07brAN9y62v7PM",
  authDomain: "clone-fac54.firebaseapp.com",
  projectId: "clone-fac54",
  storageBucket: "clone-fac54.firebasestorage.app",
  messagingSenderId: "752299208518",
  appId: "1:752299208518:web:2389aeb58290a10c9d3f47",
  measurementId: "G-YQDHNB8ZYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();