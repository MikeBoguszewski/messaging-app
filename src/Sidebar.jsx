import { Link } from "react-router-dom";
import { useState } from "react";
import MessageRow from "./MessageRow";
import { useSidebar } from "./SidebarContext";
import ConversationModal from "./ConversationModal";

export default function Sidebar() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [conversationModal, setConversationModal] = useState(false);
  const toggleConversationModal = () => {
    setConversationModal((prevModalState) => !prevModalState);
  };
  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      {conversationModal && <ConversationModal />}
      <div className="header">
        <h2>Hello, username</h2>
        <div className="account">
          <Link to={"/profile"}>
            <img src="/assets/circle.svg"></img>
          </Link>
          <button>
            <img src="/assets/square-edit-outline.svg" onClick={toggleConversationModal}></img>
          </button>
          <button>
            <img src="/assets/logout.svg"></img>
          </button>
          <button onClick={toggleVisibility} className="menu-toggle">
            <img src="/assets/menu.svg"></img>
          </button>
        </div>
      </div>
      <div className="users">
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
        <MessageRow />
      </div>
    </div>
  );
}
