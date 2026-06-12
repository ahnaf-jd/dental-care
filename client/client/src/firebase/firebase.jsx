// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjBuaaAZWQ4bUZT8O9tFbSDC7av78bIB4",
  authDomain: "dental-admin-auth.firebaseapp.com",
  projectId: "dental-admin-auth",
  storageBucket: "dental-admin-auth.firebasestorage.app",
  messagingSenderId: "446678695540",
  appId: "1:446678695540:web:28cc3657c867582ab0db21",
  measurementId: "G-D42XE5QFQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);