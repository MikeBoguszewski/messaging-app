import Sidebar from "../Sidebar";
import { useSidebar } from "../SidebarContext";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { sidebarVisible, toggleVisibility } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    description: "",
    profilePicture: null,
    profilePictureUrl: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProfileData({ ...profileData, username: data.username, description: data.description, profilePictureUrl: data.profilePictureUrl });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("description", profileData.description);
      formData.append("profilePicture", profileData.profilePicture);
      const response = await fetch("http://localhost:3000/api/user/update-profile", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData({ ...profileData, profilePictureUrl: data.profilePictureUrl });
        setIsEditing(false);
        window.location.reload();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <div className="profile-page">
      <Sidebar username={profileData.username} />
      <section className={`${sidebarVisible ? "section-hidden" : ""}`}>
        <div className="profile-header">
          <button onClick={toggleVisibility}>
            <img src="/assets/menu.svg" alt="Menu" />
          </button>
          <div className="profile">
            {isEditing ? (
              <input type="file" accept="image/*" onChange={(event) => setProfileData({ ...profileData, profilePicture: event.target.files[0] })} />
            ) : (
              <img src={profileData.profilePictureUrl || "/assets/circle.svg"} alt="Profile" />
            )}
            {isEditing ? (
              <input
                type="text"
                value={profileData.username}
                onChange={(event) => {
                  setProfileData({ ...profileData, username: event.target.value });
                }}
              />
            ) : (
              <h1>@{profileData.username}</h1>
            )}
          </div>
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            <img src="/assets/pencil.svg" alt="Edit" />
          </button>
        </div>
        {isEditing ? <textarea value={profileData.description} onChange={(event) => setProfileData({ ...profileData, description: event.target.value })}></textarea> : <div className="description">{profileData.description}</div>}

        {isEditing && <button onClick={handleSave}>Save</button>}
      </section>
    </div>
  );
}
