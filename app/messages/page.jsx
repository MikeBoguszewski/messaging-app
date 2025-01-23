"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";
import Sidebar from "@/components/Sidebar";
import { fetchConversations } from "@/firebase";
import Header from "../components/Header";
import SignoutButton from "../components/SignoutButton";
import ChatWindow from "../components/ChatWindow";

export default function MessagesLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dataLoading, setDataLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  // TODO: Add server side rendering props
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const conversations = await fetchConversations();
      setConversations(conversations);
      console.log(conversations);
      setDataLoading(false);
    }
    fetchData();
  }, [loading]);

  if (dataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Messages</h1>
      <Header user={user} />
      <Sidebar conversations={conversations} setConversationId={setConversationId}/>
      <ChatWindow conversationId={conversationId}/>
      <SignoutButton />
      {children}
    </div>
  );
}
