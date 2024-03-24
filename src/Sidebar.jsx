import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MessageRow from "./MessageRow";
import { useSidebar} from "./SidebarContext";
import ConversationModal from "./ConversationModal";

export default function Sidebar({username}) {
  const navigate = useNavigate();
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [conversationModal, setConversationModal] = useState(false);
  const [conversations, setConversations] = useState([]);
    useEffect(() => {
      const fetchConversations = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/conversation", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          setConversations(data.conversations);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchConversations();
    }, []);
  const toggleConversationModal = () => {
    setConversationModal((prevModalState) => !prevModalState);
  };
  const logout = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/logout");
       if (response.ok) {
         console.log("Logout successful");
         navigate("/login");
       } else {
         console.error("Logout failed:", response.status);
       }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      {conversationModal && <ConversationModal />}
      <div className="header">
        <h2>Hello, {username}</h2>
        <div className="account">
          <Link to={"/profile"}>
            <img src="/assets/circle.svg"></img>
          </Link>
          <button>
            <img src="/assets/square-edit-outline.svg" onClick={toggleConversationModal}></img>
          </button>
          <button>
            <img src="/assets/logout.svg" onClick={logout}></img>
          </button>
          <button onClick={toggleVisibility} className="menu-toggle">
            <img src="/assets/menu.svg"></img>
          </button>
        </div>
      </div>
      <div className="conversations">
        {conversations.map((conversation) => (
          <MessageRow key={conversation._id} conversation={conversation} loggedInUser={username} />
        ))}
      </div>
    </div>
  );
}
