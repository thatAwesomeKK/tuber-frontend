"use client";
import { deleteVideo } from "@/lib/apiCalls/video";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import UpdateModal from "./UpdateModal";
import { DialogTrigger } from "../ui/dialog";
import { Video } from "../../../typings";

interface Props {
  video: Video;
}

const ActionButtons = ({ video }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    const payload = await deleteVideo(video._id);
  };
  const handleEdit = () => {};
  return (
    <>
      <UpdateModal video={video}>
        <DialogTrigger>
          <Pencil
            onClick={handleEdit}
            className="hover:text-blue-400 cursor-pointer"
          />
        </DialogTrigger>
      </UpdateModal>
      <Trash2
        onClick={handleDelete}
        className="hover:text-red-400 cursor-pointer"
      />
    </>
  );
};

export default ActionButtons;
