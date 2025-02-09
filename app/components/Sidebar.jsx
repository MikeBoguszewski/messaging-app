"use client";
import SignoutButton from "../components/SignoutButton";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar({ conversations = [], setConversationId, conversationId }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex flex-col bg-federal-blue p-4 w-full md:w-96">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Conversations</h2>
        <button className="md:hidden" onClick={() => setIsVisible(!isVisible)}>
          <Image src="/menu.svg" alt="Menu" width={40} height={40} />
        </button>
      </div>
      <ul className="flex flex-col gap-2 border-t-2 p-3">
        {conversations.length === 0 && <li>No conversations</li>}
        {conversations.map((conversation) => (
          <li key={conversation.id} className="flex flex-col justify-start">
            <button onClick={() => setConversationId(conversation.id)} className={`font-bold block bg-honolulu-blue flex-grow rounded-md shadow-md p-2 mb-2 hover:bg-vivid-sky-blue ${conversationId === conversation.id ? "bg-vivid-sky-blue" : ""}`}>
              {conversation?.otherUserName}
            </button>
          </li>
        ))}
      </ul>
      <SignoutButton />
    </div>
  );
}
