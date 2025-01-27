import { useState } from "react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
      e.preventDefault();
    };
  return (
    <form>
      <input type="text" id="message " name="message" onChange={(e) => setMessage(e.target.value)} />
    </form>
  );
}
