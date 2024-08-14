"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { handleDislike, handleLike } from "@/lib/apiCalls/video";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";

const MetadataActionButtons = ({
  videoId,
  initialLikes,
  initialDislikes,
}: {
  videoId: string;
  initialLikes: Array<string>;
  initialDislikes: Array<string>;
}) => {
  const [likes, setLikes] = useState<number>(initialLikes.length);
  const [dislikes, setDislikes] = useState<number>(initialDislikes.length);
  const { user } = useUserStore();

  const onHandleLike = async () => {
    if (!user) return toast.error("You need to be signed in to like a video");
    const payload = await handleLike(videoId);
    setLikes(payload.likes);
    setDislikes(payload.dislikes);
  };

  const onHandleDislike = async () => {
    if (!user) return toast.error("You need to be signed in to dislike a video");
    const payload = await handleDislike(videoId);
    setDislikes(payload.dislikes);
    setLikes(payload.likes);
  };
  return (
    <div className="flex items-center rounded-full overflow-hidden h-10">
      <div
        onClick={onHandleLike}
        className={cn(
          buttonVariants(),
          "flex gap-3 cursor-pointer rounded-none w-20"
        )}
      >
        <ThumbsUp className="w-5 h-5" />
        <p>{likes}</p>
      </div>
      <div className="bg-primary h-full flex items-center justify-center">
        <Separator className="h-[80%]" orientation="vertical" />
      </div>
      <div
        onClick={onHandleDislike}
        className={cn(
          buttonVariants(),
          "flex gap-3 cursor-pointer rounded-none w-20"
        )}
      >
        <ThumbsDown className="w-5 h-5" />
        <p>{dislikes}</p>
      </div>
    </div>
  );
};

export default MetadataActionButtons;
