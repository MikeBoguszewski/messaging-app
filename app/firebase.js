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

export const auth = getAuth(app);

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

/// Log in an existing user
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in:", user);
    return null; 
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("Error:", errorCode, errorMessage);

    let errorResponse = "";

switch (error.code) {
      case "auth/invalid-credential":
        errorResponse = "Invalid credentials provided. Check your email and password.";
        break;
      case "auth/invalid-email":
        errorResponse = "Invalid email format.";
        break;
      case "auth/missing-password":
        errorResponse = "Password is required.";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorResponse = "Invalid email or password.";
        break;
      case "auth/too-many-requests":
        errorResponse = "Too many login attempts. Please try again later.";
        break;
      default:
        errorResponse = "An unknown error occurred during login.";
        break;
    }

    return errorResponse; 
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

