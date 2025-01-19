"use client";
import SignoutButton from "../components/SignoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import Sidebar from "../components/Sidebar";
import { fetchConversations } from "../firebase";
import ChatWindow from "../components/ChatWindow";

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);


  // TODO: Add server side rendering props
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const conversations = await fetchConversations();
      setConversations(conversations);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Messages</h1>
      <Sidebar conversations={conversations} />
      <ChatWindow conversations={conversations} />
      <SignoutButton />
    </div>
  );
}
