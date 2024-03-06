import { Link } from "react-router-dom";
import MessageRow from "./MessageRow";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      <div className="header">
        <h2>Hello, username</h2>
        <div className="account">
          <Link to={"/profile"}>
            <img src="/assets/circle.svg"></img>
          </Link>
          <button>
            <img src="/assets/square-edit-outline.svg"></img>
          </button>
          <Link>
            <img src="/assets/logout.svg"></img>
          </Link>
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
