export default function Header({ user }) {
  return (
    <header>
      <h1>Hello, {user?.email}</h1>
    </header>
  );
}