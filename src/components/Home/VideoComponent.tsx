import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { Video } from "./VideoFeed";

interface Props {
  video: Video;
}

const VideoComponent = ({ video }: Props) => {
  return (
    <div className="w-[24rem]">
      <div className="relative w-[24rem] h-56 rounded-3xl overflow-hidden">
        <Image fill src={video.thumbnail} alt="" />
      </div>
      <div className="flex mt-3 ml-1">
        <div className="mr-2">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image fill src={video.userId.pfp} alt="" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{video.title}</h3>
          <p className="font-normal text-sm text-gray-500">
            {video.userId.username}
          </p>
          <p className="font-normal text-sm text-gray-500">
            Views . 3 Days Ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
