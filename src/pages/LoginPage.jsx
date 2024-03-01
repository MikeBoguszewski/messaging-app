import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const onChange = (event, inputName) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [inputName]: event.target.value,
    }));
    console.log(credentials);
  };

  const login = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="heading-container">
        <div className="heading">
          <img className="logo" src="/assets/message-outline.svg"></img>
          <h1>Connect with your favorite people.</h1>
        </div>
      </div>
      <div className="login-container">
        <form className="login" onSubmit={login}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={credentials.email} onChange={(event) => onChange(event, "email")} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" value={credentials.password} onChange={(event) => onChange(event, "password")} />
          <button>Continue</button>
          <p>
            Don&rsquo;t have an account? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
