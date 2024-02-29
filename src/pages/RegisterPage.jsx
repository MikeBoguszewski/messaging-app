import { Link } from "react-router-dom";

export default function RegisterPage() {
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
          <input type="email" name="email" id="email" placeholder="Enter your email" />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Enter your username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" />
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
