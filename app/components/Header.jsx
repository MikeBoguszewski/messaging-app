import ConversationModal from "./ConversationModal";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import Image from "next/image";

export default function Header({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <header className="w-full bg-federal-blue p-4 flex justify-between items-center text-xl shadow-lg">
      <h1 className="font-bold">Hello, {user?.email ? user.email : "Anonymous"}</h1>
      <button onClick={() => setIsModalOpen(true)}>
        <Image src="/plus.svg" alt="Create a new conversation" width={50} height={50} />
      </button>
      <ConversationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConversationForm onSubmit={() => setIsModalOpen(false)} />
      </ConversationModal>
    </header>
  );
}