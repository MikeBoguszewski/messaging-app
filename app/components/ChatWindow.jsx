"use client";

import { useState, useEffect } from "react";
import { fetchMessages, fetchConversations } from "@/firebase";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversationId }) {
  const [dataLoading, setDataLoading] = useState(true);
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch conversations
      const conversations = await fetchConversations();
      console.log("Conversations:", conversations);

      // Find the conversation based on the conversationId prop
      const conversation = conversations.find((conv) => conv.id == conversationId);
      setConversation(conversation);
      console.log("Current conversation:", conversation);

      // Fetch messages for that conversation
      if (conversation) {
        const messages = await fetchMessages(conversation);
        console.log("Messages:", messages);
        setMessages(messages);
      }

      setDataLoading(false);
    }

    if (conversationId) {
      fetchData();
    }
  }, [conversationId]);

  if (dataLoading) {
    return <div>Select a Conversation!</div>;
  }

  return (
    <div>
      <ul>{messages && messages.map((message) => <li key={message.id}>{message.text}</li>)}</ul>
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
