"use client";
import { useState } from "react";
import { signup } from "../firebase";
import { validateEmail, validatePassword } from "../validation";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <p>{errors.email}</p>}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
