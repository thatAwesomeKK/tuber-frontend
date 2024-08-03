"use client";
import React, { FC, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogInIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { SignOut } from "@thatawesomekk/single-sign-on";

interface Props {
  children: ReactNode;
  user: String;
}

const UserDropdown = ({ children, user }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Your Loving Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="flex items-center" href={"/settings"}>
              <SettingsIcon className="h-4 w-4 mr-2" /> Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user ? (
            <DropdownMenuItem onClick={() => SignOut()}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              SignOut
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => router.push("/signin")}>
              <LogInIcon className="h-4 w-4 mr-2" />
              SignIn
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
