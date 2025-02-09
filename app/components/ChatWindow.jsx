"use client";

import { useState, useEffect } from "react";
import { fetchMessages, fetchConversations } from "@/firebase";
import MessageInput from "./MessageInput";
import ChatBox from "./ChatBox";

export default function ChatWindow({ conversationId, user }) {
  const [dataLoading, setDataLoading] = useState(true);
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch conversations
      const conversations = await fetchConversations();
      console.log("Conversations:", conversations);
      if (!conversationId) setConversation[0];

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

    fetchData();
  }, [conversationId]);

  if (dataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ul className="p-5 flex flex-col overflow-y-scroll flex-grow max-h-full">{messages && messages.map((message) => <ChatBox key={message.id} message={message} user={user} />)}</ul>
      <div className="flex w-full mt-auto">
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  );
}
