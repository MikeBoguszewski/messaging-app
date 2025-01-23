"use client";
export default function Sidebar({ conversations = [], setConversationId }) {
  return (
    <div>
      Sidebar conversations:
      <ul>
        {conversations.length === 0 && <li>No conversations</li>}
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <button onClick={() => setConversationId(conversation.id)}>{conversation.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
