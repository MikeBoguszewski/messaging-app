import ConversationModal from "./ConversationModal";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import Image from "next/image";

export default function Header({ user, setSidebar, sidebar, setConversationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <header className="w-screen bg-federal-blue p-4 flex justify-between items-center text-xl shadow-lg">
      <h1 className="font-bold">Hello, {user?.email ? user.email : "Anonymous"}</h1>
      <div className="flex items-center">
        <button onClick={() => setIsModalOpen(true)}>
          <Image src="/plus.svg" alt="Create a new conversation" width={50} height={50} />
        </button>
        <button className="md:hidden" onClick={() => setSidebar(!sidebar)}>
          <Image src="/menu.svg" alt="Menu" width={40} height={40} />
        </button>
      </div>
      <ConversationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConversationForm setConversationId={setConversationId} onSubmit={() => setIsModalOpen(false)} />
      </ConversationModal>
    </header>
  );
}