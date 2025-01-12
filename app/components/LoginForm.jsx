"use client";
import { useState } from "react";
import { login } from "../firebase";
import { useRouter } from "next/navigation";

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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
}
