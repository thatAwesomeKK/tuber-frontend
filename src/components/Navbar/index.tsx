import React from "react";
import Search from "./Search";
import SignInButton from "./SignInButton";
import { cookies } from "next/headers";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import Link from "next/link";

const Navbar = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;

  const pfp = cookieStore.get("profilePicture")?.value as string;

  return (
    <main className="flex justify-between items-center h-16 border-b-2 px-10">
      <Link href="/">
        <Image
          className="w-32 cursor-pointer"
          src="/images/YT.svg"
          alt=""
          width={100}
          height={100}
        />
      </Link>
      <Search />
      <div className="flex items-center space-x-3">
        <Link href={"/upload"}>
          <CloudUpload className="h-7 w-7 text-gray-400" />
        </Link>
        <SignInButton accessToken={accessToken} pfp={pfp} />
      </div>
    </main>
  );
};

export default Navbar;
