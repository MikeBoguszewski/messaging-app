"use client";
import { useState } from "react";
import { login } from "../firebase";
import { validateEmail, validatePassword } from "../validation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <p>{errors.email}</p>}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit">Log In</button>
    </form>
  );
}
