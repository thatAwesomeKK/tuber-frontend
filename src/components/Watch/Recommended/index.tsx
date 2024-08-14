import { fetchVideosByTag } from "@/lib/apiCalls/video";
import React from "react";
import RecommendedCard from "./RecommendedCard";
import Link from "next/link";
import { Video } from "../../../../typings";

interface Props {
  videoId: string;
}

const Recommended = async ({ videoId }: Props) => {
  const videos: Video[] = await fetchVideosByTag(videoId);

  return (
    <div className="flex flex-col gap-4">
      {videos.map((video, i) => (
        <Link href={`/watch/${video._id}`} key={i}>
          <RecommendedCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
