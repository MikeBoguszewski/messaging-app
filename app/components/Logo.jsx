import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-7 p-10">
      <Image src="/logo.svg" alt="logo" width={125} height={125} />
      <h1 className="font-bold text-5xl text-center w-96">Connect with your favorite people.</h1>
    </div>
  );
}