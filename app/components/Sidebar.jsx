"use client";
import { useState } from "react";
import { useEffect } from "react";
import { fetchConversations } from "../firebase";

export default function Sidebar() {
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
      <ul>
        {conversations.length === 0 && <li>No conversations</li>}
        {conversations.map((conversation) => (
          <li key={conversation.id}>{conversation.title}</li>
        ))}
      </ul>
    </div>
  );
}
