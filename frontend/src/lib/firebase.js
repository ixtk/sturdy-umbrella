// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { setPersistence, getAuth, browserLocalPersistence } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUX-JvXDhNo6ecM_uG5NIaomE9n5bo3cI",
  authDomain: "fluffy-umbrella-f13c2.firebaseapp.com",
  projectId: "fluffy-umbrella-f13c2",
  storageBucket: "fluffy-umbrella-f13c2.firebasestorage.app",
  messagingSenderId: "56453816350",
  appId: "1:56453816350:web:acb431882737a763ae8e0f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider()

await setPersistence(auth, browserLocalPersistence)
