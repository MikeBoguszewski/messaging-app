import { useEffect, useState } from "react";

export default function ConversationModal({ setConversationModal }) {
  const [users, setUsers] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data.formattedUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  const createConversation = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/conversation", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otherParticipant: selectedParticipant,
        }),
      });
      if (response.ok) {
        setConversationModal(false);
      }
    } catch (error) {
      console.error("Error creating conversation", error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={createConversation}>
        <h2>Start Conversation</h2>
        <select value={selectedParticipant} onChange={handleSelectChange}>
          <option value="">Select a participant</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedParticipant}>
          Start
        </button>
      </form>
    </div>
  );
}
