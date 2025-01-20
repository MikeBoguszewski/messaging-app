import { useState, useEffect } from "react";
import { fetchMessages } from "@/firebase";

export default function ChatWindow({ conversations }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!conversations) {
      return;
    }
    async function fetchData() {
      console.log("Conversations", conversations);
      const messages = await fetchMessages(conversations[0]);
      console.log(messages);
      setMessages(messages);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h2>Chat Window</h2>
      <ul>
        {messages && messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}