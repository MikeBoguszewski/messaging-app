export default function ChatBox({ message, user }) {
  const isCurrentUser = message?.senderId === user?.uid;
  return (
    <li className={`flex p-2 min-h-10 w-60 md:w-72 lg:w-96 shadow-md rounded-md mb-8  ${isCurrentUser ? "self-end bg-pacific-cyan" : "self-start bg-oceanBlue"}`}>
      {message.text}
    </li>
  );
}