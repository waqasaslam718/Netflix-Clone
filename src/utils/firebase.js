// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2IG5zrl3HxeZ_ro8hJR5JKGdXOpFcTLo",
  authDomain: "netflix-clone-f8afd.firebaseapp.com",
  projectId: "netflix-clone-f8afd",
  storageBucket: "netflix-clone-f8afd.appspot.com", // ✅ Fixed `.app` to `.appspot.com`
  messagingSenderId: "589419375709",
  appId: "1:589419375709:web:3f18bec492792024d3f1b4",
  measurementId: "G-YHKGM1Y990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ✅ Add this line to export auth
