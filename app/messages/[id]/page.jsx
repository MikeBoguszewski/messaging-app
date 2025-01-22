import ChatWindow from "@/components/ChatWindow";
export default async function MessageDetailPage({ params }) {
  const id = (await params).id
  return (
    <div>
      <span>{id}</span>
      <ChatWindow />
    </div>
  );
}
