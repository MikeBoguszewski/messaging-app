import { useEffect, useState } from "react";

export default function ConversationModal() {
  const [users, setUsers] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data.formattedUsers);
    };
    fetchUsers();
  }, []);

  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedParticipants([...selectedParticipants, user.username]);
    } else {
      setSelectedParticipants(selectedParticipants.filter((username) => username !== user.username));
    }
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
          otherParticipants: selectedParticipants,
        }),
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={(event) => createConversation(event)}>
        <h2>Start Conversation</h2>
        {users.map((user) => (
          <div key={user._id}>
            <label htmlFor={user._id}>{user.username} </label>
            <input type="checkbox" id={user._id} onChange={(event) => handleCheckboxChange(event, user)}></input>
          </div>
        ))}
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
