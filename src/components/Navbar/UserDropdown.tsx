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
import { ListVideo, LogInIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "@thatawesomekk/single-sign-on";
import { useUserStore } from "@/lib/store";

interface Props {
  children: ReactNode;
}

const UserDropdown = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useUserStore();
  return (
    <DropdownMenu>
      {children}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Your Loving Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/settings"}>
            <DropdownMenuItem>
              <SettingsIcon className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
          </Link>
          <Link href="/playlist">
            <DropdownMenuItem>
              <ListVideo className="h-4 w-4 mr-2" />
              Playlist
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user ? (
            <DropdownMenuItem onClick={() => signOut()}>
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
