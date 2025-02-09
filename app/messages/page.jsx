"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";
import Sidebar from "@/components/Sidebar";
import { fetchConversations } from "@/firebase";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dataLoading, setDataLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [sidebar, setSidebar] = useState(false);

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
    <div className="flex flex-col h-screen">
      <Header user={user} setSidebar={setSidebar} sidebar={sidebar} setConversationId={setConversationId} />
      <div className="flex flex-1">
        <Sidebar conversations={conversations} setConversationId={setConversationId} conversationId={conversationId} sidebar={sidebar} />
        <ChatWindow conversationId={conversationId} user={user} sidebar={sidebar} />
      </div>
    </div>
  );
}
