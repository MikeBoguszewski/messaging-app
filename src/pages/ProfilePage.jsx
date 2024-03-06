import Sidebar from "../Sidebar";
import { useSidebar } from "../SidebarContext";

export default function ProfilePage() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  return (
    <div className="profile-page">
      <Sidebar />
      <section className={`${sidebarVisible ? "section-hidden" : ""}`}>
        <div className="profile-header">
          <button onClick={toggleVisibility}>
            <img src="/assets/menu.svg"></img>
          </button>
          <div className="profile">
            <img src="/assets/circle.svg"></img>
            <div className="container">
              <h1>@Username</h1>
              <span>United States</span>
            </div>
          </div>
          <button className="edit-button">
            <img src="/assets/pencil.svg"></img>
          </button>
        </div>
        <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eius suscipit officia expedita dolorum reprehenderit nam excepturi ipsa, necessitatibus earum in facilis explicabo beatae enim corporis sequi corrupti perspiciatis facere sunt provident illum atque temporibus. Iste quam distinctio non facilis earum molestiae hic praesentium eaque? Alias recusandae non ad laboriosam.</div>
      </section>
    </div>
  );
}
