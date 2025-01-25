import { fetchUsersExcludingCurrent } from "../firebase";
import { useState, useEffect } from "react";

export default function ConversationForm() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedUser);
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
      <select onChange={(e) => setSelectedUser(users.find((user) => user.id === e.target.value))}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user?.email ? user.email : "Anonymous"}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
