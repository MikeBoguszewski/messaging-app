import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore"

// Your Firebase config here
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
const db = getFirestore(app);

// Function to add mock users
const addMockUsers = async () => {
  const usersRef = collection(db, "users");

  // Add user 1
  await setDoc(doc(usersRef, "userId1"), {
    username: "john",
    profilePicture: "https://link_to_profile_picture.jpg",
    email: "testuser@example.com",
  });

  // Add user 2
  await setDoc(doc(usersRef, "userId2"), {
    username: "james",
    profilePicture: "https://link_to_profile_picture.jpg",
    email: "testuser2@example.com",
  });
};

// Function to add a mock conversation
const addMockConversation = async () => {
  const conversationsRef = collection(db, "conversations");

  const newConversationRef = doc(conversationsRef, "conversationId1");

  // Add userIds and messages
  await setDoc(newConversationRef, {
    userIds: ["userId1", "userId2"],
  });

  const messagesRef = collection(newConversationRef, "messages");

  // Add message 1
  await addDoc(messagesRef, {
    senderId: "userId1",
    text: "Hey, how's it going?",
    timestamp: 1627564800,
  });

  // Add message 2
  await addDoc(messagesRef, {
    senderId: "userId2",
    text: "I'm good, thanks for asking!",
    timestamp: 1627565400,
  });
};

// Call functions to add dummy data
addMockUsers().then(() => {
  console.log("Mock users added!");
  addMockConversation().then(() => {
    console.log("Mock conversation added!");
  });
});