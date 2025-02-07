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
    <form onSubmit={handleSubmit} noValidate className="bg-federal-blue p-14 rounded-2xl shadow-2xl flex flex-col md:w-96">
      <h1 className="font-bold text-4xl mb-8">Login</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} className="rounded-md bg-inherit shadow-md border border-white p-1 outline-non-photo-blue mb-3" />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="rounded-md bg-inherit shadow-md border border-white p-1 outline-non-photo-blue mb-3" />
        {error && <p>{error}</p>}
      </div>
      <button type="submit" className="font-bold block bg-pacific-cyan flex-grow rounded-md shadow-md p-2 mb-3 hover:bg-vivid-sky-blue">
        Log In
      </button>
      <button type="button" onClick={handleAnonymousLogin} className="font-bold block bg-honolulu-blue flex-grow rounded-md shadow-md p-2 mb-3 hover:bg-vivid-sky-blue">
        Continue as Guest
      </button>
      <span>
        Don't have an account?{" "}
        <Link href={"/signup"} className="font-bold hover:underline">
          Sign Up.
        </Link>
      </span>
    </form>
  );
}
