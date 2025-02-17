import { fetchUsersExcludingCurrent } from "../firebase";
import { useState, useEffect } from "react";
import { createConversation } from "../firebase";

export default function ConversationForm({ onSubmit, setConversationId }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createConversation(selectedUserId);
    setConversationId(id);
    onSubmit();
  };

  useEffect(() => {
    async function fetchData() {
      let users = await fetchUsersExcludingCurrent();
      users = users.filter((user) => user.email !== undefined);
      setUsers(users);
    }
    fetchData();
  }, []);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="font-bold text-4xl mb-8">New Conversation</h1>
      <select onChange={(e) => setSelectedUserId(e.target.value)} defaultValue={""} className="bg-inherit border rounded-md shadow-md p-2 mb-3">
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user?.email ? user.email : "Anonymous"}
          </option>
        ))}
      </select>
      <button type="submit" className="font-bold block bg-pacific-cyan flex-grow rounded-md shadow-md p-2 mb-3 hover:bg-vivid-sky-blue">
        Submit
      </button>
    </form>
  );
}