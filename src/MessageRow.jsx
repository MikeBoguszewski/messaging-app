import { Link } from "react-router-dom";
export default function MessageRow({ conversation, loggedInUser }) {
  const filteredParticipants = conversation.participants.filter((username) => username !== loggedInUser);
  const mostRecentMessage = conversation.messages.sort((a, b) => b.timestamp - a.timestamp)[0];
  return (
    <Link className="row" to={`/messages/${conversation._id}`}>
      <img src="/assets/circle.svg"></img>
      <div className="user-info">
        <div className="container">
          <h3>{filteredParticipants}</h3>
        </div>
        {mostRecentMessage ? <p>{mostRecentMessage.content}</p> : <p>No recent messages...</p>}
      </div>
    </Link>
  );
}