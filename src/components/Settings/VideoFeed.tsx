import { fetchVideos } from "@/lib/apiCalls/profile";
import { cookies } from "next/headers";
import React from "react";
import VideoComponent from "./VideoComponent";
import { Video } from "../../../typings";

const VideoFeed = async () => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;
  const vids: Video[] = await fetchVideos(accessToken);

  return (
    <div className="flex flex-col divide-y-2 px-5 border rounded-md">
      {vids.map((vid) => (
        <VideoComponent key={vid._id} video={vid} />
      ))}
    </div>
  );
};

export default VideoFeed;
