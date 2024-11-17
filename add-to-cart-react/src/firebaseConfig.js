// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd_wgigaf1hwbH2rmuQ8eCzvIfdtlj5TU",
  authDomain: "online-shopping-4f987.firebaseapp.com",
  projectId: "online-shopping-4f987",
  storageBucket: "online-shopping-4f987.firebasestorage.app",
  messagingSenderId: "1022846677093",
  appId: "1:1022846677093:web:dbfbae697b0902ce26d68c",
  measurementId: "G-LYQ5KEXHG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };