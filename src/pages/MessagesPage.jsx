import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useSidebar } from "../SidebarContext";

export default function MessagesPage() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/conversation", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="messages-page">
      <Sidebar/>
      
      <section className={`${sidebarVisible ? "section-hidden" : ""}`}>
        <div className="messages-header">
          <button onClick={toggleVisibility}>
            <img src="/assets/menu.svg"></img>
          </button>
          <h1>@Username</h1>
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
