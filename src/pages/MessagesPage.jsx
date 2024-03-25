import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useSidebar } from "../SidebarContext";

export default function MessagesPage() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherParticipant, setOtherParticipant] = useState("");
  const { conversationId } = useParams();
  const [conversationSelected, setConversationSelected] = useState(false);

  useEffect(() => {
    if (conversationId) {
      setConversationSelected(true);
    } else {
      setConversationSelected(false);
    }
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsername();
    if (conversationId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/conversation/${conversationId}`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          setOtherParticipant(data.conversation.participants.find((participant) => participant !== username));
          setMessages(data.conversation.messages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchMessages();
    }
  }, [conversationId, username]);
  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/conversation/${conversationId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: username,
          content: newMessage,
        }),
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  return (
    <div className="messages-page">
      <Sidebar username={username} />
      <section className={`${sidebarVisible ? "section-hidden" : ""}`}>
        <div className="messages-header">
          <button onClick={toggleVisibility}>
            <img src="/assets/menu.svg"></img>
          </button>
          <h1>{otherParticipant ? `@${otherParticipant}`: "Select a Conversation!"}</h1>
          
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message._id} className={`message ${message.sender === username ? "sent" : "received"}`}>
              {message.content}
            </div>
          ))}
        </div>
        {conversationSelected && (
          <form className="send-message" onSubmit={sendMessage}>
            <textarea name="message" id="messsage" placeholder="Enter Message" value={newMessage} onChange={handleChange}></textarea>
            <button type="submit">
              <img src="/assets/send.svg"></img>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
