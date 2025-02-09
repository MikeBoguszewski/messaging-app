export default function ChatBox({ message, user }) {
  const isCurrentUser = message?.senderId === user?.uid;
  console.log("isCurrentUser", isCurrentUser);
  console.log(message.senderId, user.uid);
  return (
    <li className={`flex p-2 min-h-14 md:w-72 shadow-md rounded-md mb-8  ${isCurrentUser ? "items-end bg-pacific-cyan" : "items-start bg-oceanBlue"}`}>
      <div>{message.text}</div>
    </li>
  );
}