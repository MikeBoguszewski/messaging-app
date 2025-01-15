"use client";
import SignoutButton from "../components/SignoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { fetchConversations } from "../firebase";

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    async function fetchData() {
      await fetchConversations();
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <SignoutButton />
    </div>
  );
}
