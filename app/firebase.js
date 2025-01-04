import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


