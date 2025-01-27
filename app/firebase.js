import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";

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

// Sign in anonymously
export async function anonymousLogin() {
  const auth = getAuth();
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log("Logged in:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error ", errorCode, errorMessage);
  }
}

// Connect to Firestore Database
const db = getFirestore();

// Fetch Firestore data for the logged in user
export async function fetchCurrentUserData() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("User data:", userDocSnap.data());
    } else {
      console.log("No user data found.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Fetch Firestore data for conversations
export async function fetchConversations() {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is currently signed in.");
      return [];
    }

    const userId = user.uid;
    console.log("User ID:", userId);

    const conversationsRef = collection(db, "conversations");
    const q = query(conversationsRef, where("userIds", "array-contains", userId));
    const conversationsSnap = await getDocs(q);

    if (conversationsSnap.empty) {
      console.log("No conversations found.");
      return [];
    }

    conversationsSnap.forEach((doc) => {
      console.log("Document ID:", doc.id);
      console.log("Document Data:", doc.data());
    });

    const conversations = conversationsSnap.docs.map((doc) => {
      const data = doc.data();
      const otherUserId = data.userIds.filter((id) => id !== userId)[0];
      return {
        id: doc.id,
        ...data,
        title: otherUserId,
      };
    });
    return conversations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch Firestore data for messages
export async function fetchMessages(conversation) {
  try {
    const messagesRef = collection(db, "conversations", conversation.id, "messages");
    const messagesSnap = await getDocs(messagesRef);

    if (messagesSnap.empty) {
      console.log("No messages found.");
    }

    messagesSnap.forEach((doc) => {
      console.log("Document ID:", doc.id);
      console.log("Document Data:", doc.data());
    });

    const messages = messagesSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    console.log(messages);
    return messages;
  } catch (error) {
    console.error(error);
  }
}

// Create Conversation in Firebase
export async function createConversation(otherUserId) {
  const user = auth.currentUser;
  const userId = user.uid;
  try {
    const conversationsRef = collection(db, "conversations");
    const newConversationRef = doc(conversationsRef);
    await setDoc(newConversationRef, {
      userIds: [userId, otherUserId],
    });
  } catch (error) {
    console.error(error);
  }
}

// Fetch users from Firebase
export async function fetchUsersExcludingCurrent() {
  const user = auth.currentUser;
  const userId = user.uid;
  try {
    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);
    console.log(userId);
    console.log(usersSnap.docs);
    const users = usersSnap.docs
      .filter((doc) => doc.id !== userId)
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
  }
}

// Create message in firebase
export async function createMessage(conversationId, text) {
    const user = auth.currentUser;
    const userId = user.uid;
  try {
    const messagesRef = collection(db, "conversations", conversationId, "messages");
    await addDoc(messagesRef, {
      senderId: userId,
      text: text,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(error);
  }
}

// TODO: live updates for messages and conversations
