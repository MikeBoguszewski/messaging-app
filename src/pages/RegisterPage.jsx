import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const onChange = (event, inputName) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [inputName]: event.target.value,
    }));
    console.log(credentials);
  };
  const register = async () => {
    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        console.log("Register successful");
      } else {
        console.log("Register unsuccessful");
      }
    } catch (error) {
      console.error("Error during register", error);
    }
  };
  return (
    <div className="register-page">
      <div className="heading-container">
        <div className="heading">
          <img className="logo" src="/assets/message-outline.svg"></img>
          <h1>Connect with your favorite people.</h1>
        </div>
      </div>
      <div className="register-container">
        <form className="register">
          <h2>Register</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={credentials.email} onChange={(event) => onChange(event, "email")} />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Enter your username" value={credentials.username} onChange={(event) => onChange(event, "username")} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" value={credentials.password} onChange={(event) => onChange(event, "password")} />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm your password" />
          <button>Continue</button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
