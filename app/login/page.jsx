import LoginForm from "@/components/LoginForm";
import Logo from "../components/Logo";
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center min-h-screen w-full lg:gap-32">
      <Logo />
      <LoginForm />
    </div>
  );
}