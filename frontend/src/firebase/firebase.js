// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSdySwhSPiOAFBlHc1XnT0wU92SJbRUaQ",
  authDomain: "studynova-ai-97313.firebaseapp.com",
  projectId: "studynova-ai-97313",
  storageBucket: "studynova-ai-97313.firebasestorage.app",
  messagingSenderId: "1044584422296",
  appId: "1:1044584422296:web:37fc9a6409454acf4429ed",
  measurementId: "G-3B6K7DVWVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);