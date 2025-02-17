"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { listenForMessages } from "@/firebase";
import MessageInput from "./MessageInput";
import ChatBox from "./ChatBox";

export default function ChatWindow({ conversationId, user, sidebar, conversations }) {
  const [dataLoading, setDataLoading] = useState(true);
  const [conversation, setConversation] = useState();
  const [messages, setMessages] = useState([]);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      // Find the conversation based on the conversationId prop
      const currentConversation = conversations.find((conv) => conv.id == conversationId);
      setConversation(currentConversation);
    }
  }, [conversationId]);
  

  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = listenForMessages(setMessages, conversation);
    unsubscribeRef.current = unsubscribe;
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [conversation]);

  

  // if (dataLoading) {
  //   return <div className="flex w-full h-full justify-center items-center font-bold text-3xl">Send a Message to Someone!</div>;
  // }

  return (
    <div className={`flex flex-col sm:w-full sm:visible ${sidebar ? "invisible w-0" : "w-full visible"}`}>
      <ul className={`p-5 flex flex-auto flex-col overflow-y-scroll w-full h-96 ${!conversationId && "justify-center"}`}>
        {messages && messages.map((message) => <ChatBox key={message.id} message={message} user={user} />)}
        {!conversationId && (
          <li className="flex w-full justify-center items-center font-bold text-3xl flex-col text-center">
            <Image src="/logo.svg" alt="Send" width={100} height={100} className="pb-3" />
            <span>Send a message to someone!</span>
          </li>
        )}
      </ul>
      {conversationId && (
        <div className="flex w-full mt-auto">
          <MessageInput conversationId={conversationId} />
        </div>
      )}
    </div>
  );
}
