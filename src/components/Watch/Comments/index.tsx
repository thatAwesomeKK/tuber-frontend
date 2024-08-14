import React from "react";
import { fetchCommentByVideo } from "@/lib/apiCalls/comment";
import CommentForm from "../../Forms/CommentForm";
import CommentCard from "./CommentCard";
import { Separator } from "@/components/ui/separator";
import { Comment } from "../../../../typings";

interface Props {
  videoId: string;
}

const Comments = async ({ videoId }: Props) => {
  const comments: Comment[] = await fetchCommentByVideo(videoId);

  return (
    <div>
      {/* No. of Comments */}
      <h4 className="ml-1 font-bold text-xl mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h4>

      {/* Comment Form */}
      <CommentForm videoId={videoId} />

      {/* All the comments */}
      <div className="flex flex-col gap-4 mt-5">
        {comments.map((comment, i) => (
          <div key={i}>
            {i !== 0 && <Separator />}
            <CommentCard comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
