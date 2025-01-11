"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (user) {
        router.push("/messages"); 
      } else {
        router.push("/login"); 
      }
  }, [user]); 

    return <div>Loading...</div>; 
}
