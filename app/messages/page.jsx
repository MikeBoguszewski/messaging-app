"use client";
import SignoutButton from "../components/SignoutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
useEffect(() => { 
  if (!user) { 
    router.push("/login"); 
  } 
}, [user]);

  return (
    <div>
      <h1>Messages</h1>
      <SignoutButton />
    </div>
  );
}
