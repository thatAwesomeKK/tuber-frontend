import React from "react";
import Search from "./Search";
import SignInButton from "./SignInButton";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { ModeToggle } from "./ModeToggle";

const Navbar = async () => {
  const cookiesStore = cookies();
  const user = cookiesStore.get("accessToken")?.value as string;

  return (
    <main className="flex justify-between items-center h-16 bg-background shadow-primary/10 shadow-lg px-10 z-50 fixed top-0 w-full">
      <Link className="flex items-center" href="/">
        <Image
          className="w-8 cursor-pointer"
          src="/images/YT.png"
          alt=""
          width={100}
          height={100}
        />
        <h1 className="font-bold text-2xl ml-2">Tuber</h1>
      </Link>
      <Search />
      <div className="flex items-center space-x-3">
        {user && (
          <Link href={"/upload"}>
            <CloudUpload className="h-7 w-7 text-gray-400" />
          </Link>
        )}
        <ModeToggle />
        <SignInButton />
      </div>
    </main>
  );
};

export default Navbar;
