"use client";

import { useState, useEffect } from "react";
import { fetchMessages, fetchConversations } from "@/firebase";
import MessageInput from "./MessageInput";
import ChatBox from "./ChatBox";

export default function ChatWindow({ conversationId, user, sidebar }) {
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

  // if (dataLoading) {
  //   return <div className="flex w-full h-full justify-center items-center font-bold text-3xl">Send a Message to Someone!</div>;
  // }

  return (
    <div className={`h-full flex flex-col overflow-scroll w-full ${sidebar ? "invisible w-0" : ""}`}>
      <ul className="p-5 flex flex-1 flex-col overflow-y-scroll w-full">{messages && messages.map((message) => <ChatBox key={message.id} message={message} user={user} />)}</ul>
      <div className="flex w-full mt-auto">
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  );
}
