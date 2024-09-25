"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ListPlus, ThumbsDown, ThumbsUp } from "lucide-react";
import { handleDislike, handleLike } from "@/lib/apiCalls/video";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/lib/store";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlaylistForm from "@/components/Forms/PlaylistForm";
import ExistingPlaylistResult from "./ExistingPlaylistResult";

const MetadataActionButtons = ({
  videoId,
  initialLikes,
  initialDislikes,
}: {
  videoId: string;
  initialLikes: Array<string>;
  initialDislikes: Array<string>;
}) => {
  const [openModal, setOpenModal] = useState(false);
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
    if (!user)
      return toast.error("You need to be signed in to dislike a video");
    const payload = await handleDislike(videoId);
    setDislikes(payload.dislikes);
    setLikes(payload.likes);
  };

  return (
    <>
      <Dialog open={openModal}>
        <DialogTrigger onClick={() => setOpenModal(!openModal)} asChild>
          <Button className="rounded-lg">
            <ListPlus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>New Playlist</DialogHeader>
          <PlaylistForm videoId={videoId} setOpenModal={setOpenModal} />
          <Separator className="my-2" />
          <DialogHeader>Existing Playlist</DialogHeader>
          <ExistingPlaylistResult videoId={videoId} />
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => setOpenModal(!openModal)}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default MetadataActionButtons;
