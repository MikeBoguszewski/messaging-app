import { Link } from "react-router-dom";
import MessageRow from "./MessageRow";

export default function Sidebar({isVisible, setSidebarVisible}) {
    const toggleVisibility = () => {
      setSidebarVisible(!isVisible);
    };
  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <div className="header">
        <h2>Hello, username</h2>
        <div className="account">
          <Link>
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
