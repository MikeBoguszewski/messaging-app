"use client";

export default function Sidebar({ conversations }) {
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
