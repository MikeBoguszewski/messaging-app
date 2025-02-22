import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc, addDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA74ynuDzxFXKIaqC1M1_z77HbbUUwiBFI",
  authDomain: "messaging-app-659f0.firebaseapp.com",
  projectId: "messaging-app-659f0",
  storageBucket: "messaging-app-659f0.firebasestorage.app",
  messagingSenderId: "464429347729",
  appId: "1:464429347729:web:2851dbfc0f9fffbb162030",
};

// test user
// alice@messagingapp.com
// password

// test user
// bob@messagingapp.com
// password

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Sign up a new user
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error:", errorCode, errorMessage);
  }
}

/// Log in an existing user
export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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
    await setDoc(doc(db, "users", user.uid), {
      anonymous: true,
    });
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
    console.error(error);
  }
}

// Fetch Firestore data for conversations
export function listenForConversations(setConversationsDocs) {
  try {
    const user = auth.currentUser;
    if (!user) {
      setConversationsDocs([]);
      return () => {};
    }

    const userId = user.uid;
    const conversationsRef = collection(db, "conversations");
    const q = query(conversationsRef, where("userIds", "array-contains", userId));

    // Subscribe to live updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setConversationsDocs([]);
        return;
      }
      setConversationsDocs(snapshot.docs);
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error in listenForConversations:", error);
    setConversationsDocs([]);
    return () => {};
  }
}

export async function filterConversations(docs) {
  const user = auth.currentUser;
  const userId = user.uid;
  // Process all documents in parallel

  const conversationsPromises = await docs.map(async (doc) => {
    const data = doc.data();
    const otherUserId = data.userIds.find((id) => id !== userId);

    try {
      const otherUserSnap = await fetchUser(otherUserId);
      const otherUserData = otherUserSnap.data();

      let otherUserName = "Anonymous";
      if (otherUserData?.anonymous === undefined && otherUserData?.email) {
        const name = otherUserData.email.split("@")[0];
        otherUserName = name.charAt(0).toUpperCase() + name.slice(1);
      }

      return {
        id: doc.id,
        ...data,
        otherUserId,
        otherUserName,
      };
    } catch (error) {
      console.error(`Error fetching user ${otherUserId}:`, error);
      return {
        id: doc.id,
        ...data,
        otherUserId,
        otherUserName: "Unknown User",
      };
    }
  });

  // Wait for all promises to resolve
  const conversations = await Promise.all(conversationsPromises);
  return conversations;
}

export async function fetchUser(userId) {
  const userDocRef = doc(db, "users", userId);
  const userSnap = await getDoc(userDocRef);
  return userSnap;
}

// Fetch Firestore data for messages
export function listenForMessages(setMessages, conversation) {
  try {
    const messagesRef = collection(db, "conversations", conversation.id, "messages");
    // const messagesSnap = await getDocs(messagesRef);

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setMessages(messages.sort((a, b) => a.timestamp - b.timestamp));
    });
    return unsubscribe;
  } catch (error) {
    console.error(error);
    return () => {};
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
    const conversationId = newConversationRef.id;
    return conversationId;
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
    const users = usersSnap.docs
      .filter((doc) => doc.id !== userId)
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

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
