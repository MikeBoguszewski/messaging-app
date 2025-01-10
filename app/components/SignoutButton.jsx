"use client";
import { signout } from "../firebase";

export default function SignoutButton() {
  return <button onClick={signout}>Sign out</button>;
}
