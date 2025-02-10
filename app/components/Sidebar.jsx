"use client";
import SignoutButton from "../components/SignoutButton";

export default function Sidebar({ conversations = [], setConversationId, conversationId, sidebar }) {
  return (
    <div className={`md:flex flex-col bg-federal-blue md:w-96 overflow-y-scroll border-r ${sidebar ? "w-screen" : "hidden"}`}>
        <h2 className="font-bold text-xl text-center mb-2">Conversations</h2>
      <ul className="flex flex-col border-t-2 overflow-y-auto">
        {conversations.length === 0 && <li className="m-2">No conversations</li>}
        {conversations.map((conversation) => (
          <li key={conversation.id} className="flex flex-col justify-start">
            <button onClick={() => setConversationId(conversation.id)} className={`font-bold flex bg-honolulu-blue flex-grow border-b shadow-md p-3 hover:bg-vivid-sky-blue  ${conversationId === conversation.id ? "bg-vivid-sky-blue" : ""}`}>
              {conversation?.otherUserName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
