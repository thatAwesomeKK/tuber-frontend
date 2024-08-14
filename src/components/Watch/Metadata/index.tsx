import { getVideoMetadata } from "@/lib/apiCalls/video";
import Image from "next/image";
import React from "react";
import MetadataActionButtons from "./MetadataActionButtons";
import Timeago from "@/components/ui/CustomComponents/Timeago";
import { Video } from "../../../../typings";

interface PageProps {
  videoId: string;
}

const Metadata = async ({ videoId }: PageProps) => {
  const payload = await getVideoMetadata(videoId);
  const video: Video = payload.video;

  return (
    <section className="mt-4">
      <div className="ml-2">
        <h1 className="font-bold text-xl">{video.title}</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex mt-3 ml-1 items-center">
          <div className="mr-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image fill src={video.userId.pfp} alt="" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{video.userId.fullName}</h3>
            <p className="font-normal text-sm text-primary/50">
              Subscribers 100k
            </p>
          </div>
        </div>
        <MetadataActionButtons
          videoId={videoId}
          initialLikes={video.likes}
          initialDislikes={video.dislikes}
        />
      </div>
      <div className="my-3 bg-foreground/10 rounded-lg px-3 py-2">
        <div>
          <p className="flex gap-1 font-semibold text-sm">
            <span>
              {video.views} {video.views === 1 ? "view" : "views"}
            </span>
            •
            <span>
              <Timeago createdAt={video.createdAt} />
            </span>
          </p>
        </div>
        <p className="font-medium text-sm">{video.description}</p>
      </div>
    </section>
  );
};

export default Metadata;
