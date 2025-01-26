import { fetchUsersExcludingCurrent } from "../firebase";
import { useState, useEffect } from "react";
import { createConversation } from "../firebase";

export default function ConversationForm({ onSubmit }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createConversation(selectedUserId);
    onSubmit();
  };

  useEffect(() => {
    async function fetchData() {
      const users = await fetchUsersExcludingCurrent();
      setUsers(users);
    }
    fetchData();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setSelectedUser(e.target.value)} defaultValue={""}>
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user?.email ? user.email : "Anonymous"}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}