import Sidebar from "../Sidebar";
import { useState } from "react";

export default function MessagesPage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleVisibility = () => {
    setSidebarVisible(!sidebarVisible)
  }
  return (
    <div className="messages-page">
      <Sidebar isVisible={sidebarVisible} setSidebarVisible={setSidebarVisible}/>
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
          <div className="message sent">You got the stuff?</div>
          <div className="message recieved">Yes!sdfjlsa;fjdjla;sdjf;ljf;dlsajf;dj;lfdja;sldfj;asldjf;aldfsj</div>
          <div className="message sent">Hey man.</div>
          <div className="message received">Yo!</div>
          <div className="message sent">You got the stuff?</div>
          <div className="message recieved">Yes!sdfjlsa;fjdjla;sdjf;ljf;dlsajf;dj;lfdja;sldfj;asldjf;aldfsj</div>
          <div className="message sent">Hey man.</div>
          <div className="message received">Yo!</div>
          <div className="message sent">You got the stuff?</div>
          <div className="message recieved">Yes!sdfjlsa;fjdjla;sdjf;ljf;dlsajf;dj;lfdja;sldfj;asldjf;aldfsjes!sdfjlsa;fjdjla;sdjf;ljf;dlsajf;dj;lfdja;sldfj;asldjf;aldfsj</div>
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
