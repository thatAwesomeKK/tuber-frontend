import React from "react";
import VideoComponent from "./VideoComponent";
import { fetchAllVideos } from "@/lib/apiCalls/video";
import Link from "next/link";
import { Video } from "../../../typings";

type User = {
  _id: string;
  username: string;
  pfp: string;
};

const VideoFeed = async () => {
  const videos: Video[] = await fetchAllVideos();

  return (
    <main className="flex justify-center items-center my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-[87.1%] gap-7">
        {videos.length <= 0 ? (
          <></>
        ) : (
          videos?.map((video, i) => (
            <Link
              className="flex justify-center items-center"
              href={`/watch/${video._id}`}
              key={video._id}
            >
              <VideoComponent video={video} />
            </Link>
          ))
        )}
      </div>
    </main>
  );
};

export default VideoFeed;
