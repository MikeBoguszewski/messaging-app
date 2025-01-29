import { useState } from "react";
import { createMessage } from "@/firebase";

export default function MessageInput({ conversationId }) {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    if (message.trim() === "") return;
    e.preventDefault();
    await createMessage(conversationId, message);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="message " name="message" onChange={(e) => setMessage(e.target.value)} />
      <button type="submit" disabled={message.trim() === ""}>Send</button>
    </form>
  );
}
