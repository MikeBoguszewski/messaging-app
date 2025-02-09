import { useState } from "react";
import { createMessage } from "@/firebase";
import Image from "next/image";

export default function MessageInput({ conversationId }) {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    if (message.trim() === "") return;
    e.preventDefault();
    await createMessage(conversationId, message);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 bg-federal-blue rounded-md shadow-md h-15 m-2">
      <textarea id="message " name="message" onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="outline-non-photo-blue bg-inherit w-full h-full rounded-md p-3 resize-none"></textarea>
      <button type="submit" disabled={message.trim() === ""} className="p-5 h-full ">
        <Image src="/send.svg" alt="Send" width={30} height={30} />
      </button>
    </form>
  );
}
