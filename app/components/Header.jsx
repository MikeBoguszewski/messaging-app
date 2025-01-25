import ConversationModal from "./ConversationModal";
import { useState } from "react";
import ConversationForm from "./ConversationForm";

export default function Header({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <header>
      <h1>Hello, {user?.email ? user.email : "Anonymous"}</h1>
      <button onClick={() => setIsModalOpen(true)}>New Conversation</button>
      <ConversationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConversationForm />
      </ConversationModal>
    </header>
  );
}