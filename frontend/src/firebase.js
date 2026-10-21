import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXUIkQh79lUf2YtbtFr8DagebjIf8ugcA",
  authDomain: "smartcv-feb48.firebaseapp.com",
  projectId: "smartcv-feb48",
  storageBucket: "smartcv-feb48.firebasestorage.app",
  messagingSenderId: "56553111860",
  appId: "1:56553111860:web:9c47c7ad0a6bf215f86561",
  measurementId: "G-YPMB56LDTV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
