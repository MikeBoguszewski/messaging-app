"use client";
import SignoutButton from "../components/SignoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import Sidebar from "../components/Sidebar";
import { fetchConversations } from "../firebase";

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const conversations = await fetchConversations();
      setConversations(conversations);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <Sidebar conversations={conversations} />
      <SignoutButton />
    </div>
  );
}
