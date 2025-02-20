"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";
import Sidebar from "@/components/Sidebar";
import { listenForConversations, filterConversations } from "@/firebase";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dataLoading, setDataLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const [conversationsDocs, setConversationsDocs] = useState([]);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const unsubscribe = listenForConversations(setConversationsDocs);
    unsubscribeRef.current = unsubscribe;
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [user, loading]);

  useEffect(() => {
    async function fetchData() {
      if (conversationsDocs.length == 0) return;
      const conversations = await filterConversations(conversationsDocs);
      setConversations(conversations);
    }
    fetchData();
    setDataLoading(false);
  }, [conversationsDocs, loading]);

  if (dataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen box-border">
      <Header user={user} setSidebar={setSidebar} sidebar={sidebar} setConversationId={setConversationId} />
      <div className="flex flex-1 h-11/12">
        <Sidebar conversations={conversations} setConversationId={setConversationId} conversationId={conversationId} sidebar={sidebar} />
        <ChatWindow conversationId={conversationId} user={user} sidebar={sidebar} conversations={conversations} />
      </div>
    </div>
  );
}
