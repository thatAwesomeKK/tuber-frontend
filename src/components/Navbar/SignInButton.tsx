"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { fetchProfilePfp } from "@/lib/apiCalls/profile";
import UserDropdown from "./UserDropdown";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SignIn } from "@thatawesomekk/single-sign-on";

const host_url = process.env.NEXT_PUBLIC_AUTH_URL;

interface Props {
  accessToken: string;
  pfp: string;
}

const SignInButton = ({ accessToken, pfp }: Props) => {
  const [newPfp, setNewPfp] = useState(pfp);

  useEffect(() => {
    const fetchPfp = async () => {
      if (!newPfp) {
        console.log("fetching pfp");
        setNewPfp(await fetchProfilePfp(accessToken));
      }
    };
    fetchPfp();
  }, []);

  return (
    <>
      {accessToken ? (
        <UserDropdown user={accessToken}>
          <DropdownMenuTrigger>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={newPfp || "https://github.com/shadcn.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </UserDropdown>
      ) : (
        <Button className="w-32" onClick={() => SignIn()}>
          SignIn
        </Button>
      )}
    </>
  );
};

export default SignInButton;
