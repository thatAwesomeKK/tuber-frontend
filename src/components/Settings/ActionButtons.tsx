"use client";
import { Loader, Pencil, Trash2 } from "lucide-react";
import React from "react";
import UpdateModal from "./UpdateModal";
import { DialogTrigger } from "../ui/dialog";
import { Video } from "../../../typings";
import { deleteVideo } from "@/lib/apiCalls/server/video";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface Props {
  video: Video;
}

const ActionButtons = ({ video }: Props) => {
  return (
    <>
      <UpdateModal video={video}>
        <DialogTrigger>
          <Button variant="outline" className="hover:text-blue-400">
            <Pencil />
          </Button>
        </DialogTrigger>
      </UpdateModal>
      <form action={() => deleteVideo(video._id)}>
        <DeleteButton />
      </form>
    </>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="hover:text-red-400" variant="outline" type="submit" disabled={pending}>
      {pending ? (
        <Loader className="animate-spin" />
      ) : (
        <Trash2 />
      )}
    </Button>
  );
};

export default ActionButtons;
