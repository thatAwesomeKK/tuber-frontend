import React from "react";
import VideoComponent from "./VideoComponent";
import { fetchAllVideos } from "@/lib/apiCalls/video";
import Link from "next/link";

type User = {
  _id: string;
  username: string;
  pfp: string;
};

export type Video = {
  _id: string;
  videoId: string;
  userId: User;
  thumbnail: string;
  title: number;
};

const VideoFeed = async () => {
  const videos: Video[] = await fetchAllVideos();
  
  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-wrap gap-10 w-[87.1%]">
        {videos?.map((video, i) => (
          <Link href={`/watch/${video._id}`} key={video._id}>
            <VideoComponent video={video} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default VideoFeed;
