import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA74ynuDzxFXKIaqC1M1_z77HbbUUwiBFI",
  authDomain: "messaging-app-659f0.firebaseapp.com",
  projectId: "messaging-app-659f0",
  storageBucket: "messaging-app-659f0.firebasestorage.app",
  messagingSenderId: "464429347729",
  appId: "1:464429347729:web:2851dbfc0f9fffbb162030",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Sign up a new user
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signed up:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error:", errorCode, errorMessage);
  }
}

// Log in an existing user
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error:", errorCode, errorMessage);
  }
}

// Sign out the current user
export async function signout() {
  try {
    await signOut(auth);
    console.log("Signed out");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error ", errorCode, errorMessage);
  }
}

