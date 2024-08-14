"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteComment } from "@/lib/apiCalls/server/comment";
import { useUserStore } from "@/lib/store";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Comment } from "../../../../typings";
import CommentForm from "@/components/Forms/CommentForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CommentActionButtons = ({ comment }: { comment: Comment }) => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUserStore();

  if (user?.uid !== comment?.userId.uid) return null;

  return (
    <div className="flex gap-2">
      <Dialog open={openModal}>
        <DialogTrigger onClick={() => setOpenModal(!openModal)} asChild>
          <Pencil className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Edit Comment</DialogHeader>
          <CommentForm
            initialValues={{ values: comment, setOpenModal, openModal }}
          />
        </DialogContent>
      </Dialog>
      <form action={() => deleteComment(comment.videoId)}>
        <DeleteButton />
      </form>
    </div>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-400" />
      )}
    </button>
  );
};

export default CommentActionButtons;
