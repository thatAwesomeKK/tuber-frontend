"use client";
import { handlePlaylist } from "@/lib/apiCalls/server/playlist";
import { Loader, X } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface Props {
  playlistId: string;
  videoId: string;
}

const DeleteFromPlaylist = ({ playlistId, videoId }: Props) => {
  return (
    <form
      className="absolute top-2 right-4"
      action={() => handlePlaylist({ playlistId, videoId })}
    >
      <DeleteButton />
    </form>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="hover:text-red-400 cursor-pointer hover:scale-150 transition-all ease-in-out"
      variant="link"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <Loader className="animate-spin" />
      ) : (
        <X className="h-6 w-6 text-white " />
      )}
    </Button>
  );
};

export default DeleteFromPlaylist;
