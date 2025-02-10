"use client";
import { signout } from "@/firebase";
import Image from "next/image";

export default function SignoutButton() {
  return <button onClick={signout} className="bg-inherit">
    <Image src="/logout.svg" alt="Sign out" width={40} height={40} />
  </button>;
}
