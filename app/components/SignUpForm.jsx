"use client";
import { useState } from "react";
import { signup } from "@/firebase";
import { validateEmail, validatePassword } from "@/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) {
      return;
    }

    await signup(email, password);
    router.push("/messages");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-federal-blue p-14 rounded-2xl shadow-2xl flex flex-col md:w-96">
      <h1 className="font-bold text-4xl mb-8">Signup</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} className="rounded-md bg-inherit shadow-md border border-white p-1 outline-non-photo-blue mb-3" />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="rounded-md bg-inherit shadow-md border border-white p-1 outline-non-photo-blue mb-3" />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit" className="font-bold block bg-pacific-cyan flex-grow rounded-md shadow-md p-2 mb-3 hover:bg-vivid-sky-blue">
        Sign Up
      </button>
      <span className="block">
        Already have an account?{" "}
        <Link href={"/login"} className="font-bold hover:underline">
          Log In.
        </Link>
      </span>
    </form>
  );
}
