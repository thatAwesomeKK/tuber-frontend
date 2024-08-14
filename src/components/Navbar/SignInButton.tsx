"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signIn } from "@thatawesomekk/single-sign-on";
import { useUserStore } from "@/lib/store";

const SignInButton = () => {
  const { user } = useUserStore();

  return (
    <>
      {user ? (
        <UserDropdown>
          <DropdownMenuTrigger>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={user?.pfp || "https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </UserDropdown>
      ) : (
        <Button className="w-32" onClick={() => signIn()}>
          SignIn
        </Button>
      )}
    </>
  );
};

export default SignInButton;
