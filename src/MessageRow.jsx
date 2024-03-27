import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MessageRow({ conversation, loggedInUser }) {
  const filteredParticipants = conversation.participants.filter((username) => username !== loggedInUser);
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/api/user/profile/${filteredParticipants}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setProfileData(data);
    };
    fetchUser();
  }, []);

  const mostRecentMessage = conversation.messages.map((message) => ({ ...message, timestamp: new Date(message.timestamp) })).sort((a, b) => b.timestamp - a.timestamp)[0];
  return (
    <Link className="row" to={`/messages/${conversation._id}`}>
      <img src={profileData.profilePictureUrl || "/assets/circle.svg"}></img>
      <div className="user-info">
        <div className="container">
          <h3>{filteredParticipants[0]}</h3>
        </div>
        {mostRecentMessage ? <p>{mostRecentMessage.content}</p> : <p>No recent messages...</p>}
      </div>
    </Link>
  );
}
