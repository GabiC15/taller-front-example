// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYnhancbB0zVpNB0PVjY9-U7JNjhaBdBo",
  authDomain: "taller-example.firebaseapp.com",
  projectId: "taller-example",
  storageBucket: "taller-example.appspot.com",
  messagingSenderId: "14888055138",
  appId: "1:14888055138:web:6f9acb9e944ef8424bfc3b",
  measurementId: "G-41BXKSEMHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;