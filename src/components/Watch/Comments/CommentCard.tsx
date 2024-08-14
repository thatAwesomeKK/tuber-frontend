import React from "react";
import Image from "next/image";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import CommentActionButtons from "./CommentActionButtons";
import Timeago from "@/components/ui/CustomComponents/Timeago";
import { Comment } from "../../../../typings";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="rounded-md flex justify-between mt-5">
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image fill src={comment.userId.pfp} alt="" />
        </div>
        <div className="">
          <p className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              @{comment.userId.fullName}
            </span>
            <span className="text-xs font-base text-gray-500 mt-[0.1rem]">
              <Timeago createdAt={comment.createdAt} />
            </span>
          </p>
          <p className="text-sm font-medium mt-[0.1rem]">{comment.comment}</p>
          <div className="flex gap-3 mt-2">
            <ThumbsUp className="w-5 h-5 cursor-pointer" />
            <ThumbsDown className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
      <CommentActionButtons comment={comment} />
    </div>
  );
};

export default CommentCard;
