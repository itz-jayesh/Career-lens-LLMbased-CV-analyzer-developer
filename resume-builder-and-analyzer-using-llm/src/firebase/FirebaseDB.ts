import { Firebase_API_KEY, Firebase_APP_ID, Firebase_AUTH_DOMAIN, Firebase_MESSAGING_SENDER_ID, Firebase_PROJECT_ID, Firebase_STORAGE_BUCKET } from "../constants/Constants";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: Firebase_API_KEY,
    authDomain: Firebase_AUTH_DOMAIN,
    projectId: Firebase_PROJECT_ID,
    storageBucket: Firebase_STORAGE_BUCKET,
    messagingSenderId: Firebase_MESSAGING_SENDER_ID,
    appId: Firebase_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };