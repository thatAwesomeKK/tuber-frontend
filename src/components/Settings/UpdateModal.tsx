"use client";
import React from "react";
import UploadForm from "../Forms/UploadForm";
import { fetchVideoMetadata } from "@/lib/apiCalls/video";
import { cookies } from "next/headers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Video } from "../../../typings";

interface Props {
  video: Video;
  children: React.ReactNode;
}

const UpdateModal = ({ video, children }: Props) => {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Video Data</DialogTitle>
        </DialogHeader>
        <UploadForm video={video} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
