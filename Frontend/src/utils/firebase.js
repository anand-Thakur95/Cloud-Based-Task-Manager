// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_APP_FIREBASE_API_KEY",
  authDomain: "cloud-task-management-system.firebaseapp.com",
  projectId: "cloud-task-management-system",
  storageBucket: "cloud-task-management-system.firebasestorage.app",
  messagingSenderId: "265684192787",
  appId: "1:265684192787:web:0520781dce37bcdff839e6",
  measurementId: "G-1NLYDD7ZYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);