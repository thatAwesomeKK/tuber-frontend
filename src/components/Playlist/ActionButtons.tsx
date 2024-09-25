"use client";
import { Loader, Trash2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { deletePlaylist } from "@/lib/apiCalls/server/playlist";

interface Props {
  playlistId: string;
}

const ActionButtons = ({ playlistId }: Props) => {
  return (
    <form action={() => deletePlaylist(playlistId)}>
      <DeleteButton />
    </form>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="hover:text-red-400"
      variant="outline"
      type="submit"
      disabled={pending}
    >
      {pending ? <Loader className="animate-spin" /> : <Trash2 />}
    </Button>
  );
};

export default ActionButtons;
