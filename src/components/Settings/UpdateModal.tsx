"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Video } from "../../../typings";
import UpdateForm from "../Forms/UpdateForm";

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
        <UpdateForm video={video} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
