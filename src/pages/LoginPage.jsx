import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="heading-container">
        <div className="heading">
          <img className="logo" src="/assets/message-outline.svg"></img>
          <h1>Connect with your favorite people.</h1>
        </div>
      </div>
      <div className="login-container">
        <form className="login">
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" />
          <button>Continue</button>
          <p>
            Don&rsquo;t have an account? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
