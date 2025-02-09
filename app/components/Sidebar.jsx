"use client";
import SignoutButton from "../components/SignoutButton";

export default function Sidebar({ conversations = [], setConversationId, conversationId, sidebar }) {
  return (
    <div className={`md:flex flex-col bg-federal-blue p-4 md:w-96 ${sidebar ? "w-full" : "hidden"}`}>
        <h2 className="font-bold text-xl text-center mb-2">Conversations</h2>
      <ul className="flex flex-col gap-2 border-t-2 p-3 overflow-y-auto">
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
