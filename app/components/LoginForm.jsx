"use client";
import { useState } from "react";
import { anonymousLogin, login } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = await login(email, password);
    if (error) {
      setError(error);
      return;
    }

    router.push("/messages");
  };

  const handleAnonymousLogin = async () => {
    await anonymousLogin();
    router.push("/messages");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button type="submit">Log In</button>
      <button type="button" onClick={handleAnonymousLogin}>
        Demo Account
      </button>
      <span>
        Don't have an account? <Link href={"/signup"}>Sign Up.</Link>
      </span>
    </form>
  );
}
