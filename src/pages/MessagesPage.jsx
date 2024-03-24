import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useSidebar } from "../SidebarContext";

export default function MessagesPage() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUsername(data.username);
    };
    fetchUsername()
  }, []);
  return (
    <div className="messages-page">
      <Sidebar username={username}/>

      <section className={`${sidebarVisible ? "section-hidden" : ""}`}>
        <div className="messages-header">
          <button onClick={toggleVisibility}>
            <img src="/assets/menu.svg"></img>
          </button>
          <h1>@{username}</h1>
        </div>
        <div className="messages">
          <div className="message sent">Hey man.</div>
          <div className="message received">Yo!</div>
        </div>
        <form className="send-message">
          <textarea name="message" id="messsage" placeholder="Enter Message"></textarea>
          <button>
            <img src="/assets/send.svg"></img>
          </button>
        </form>
      </section>
    </div>
  );
}
