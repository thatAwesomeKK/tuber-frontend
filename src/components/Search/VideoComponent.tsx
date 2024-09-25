import Image from "next/image";
import React from "react";
import Timeago from "../ui/CustomComponents/Timeago";
import { Video } from "../../../typings";

interface Props {
  video: Video;
}

const VideoComponent = ({ video }: Props) => {
  return (
    <div className="flex space-x-6">
      <div className="relative w-[42rem] h-96 rounded-3xl overflow-hidden shadow-xl shadow-secondary/30">
        <Image loading="lazy" fill src={video.thumbnail} alt="" />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="whitespace-nowrap w-full">
          <h3 className="font-semibold text-3xl">{video.title}</h3>
          <p className="font-medium text-base text-primary/50">
            {video.views} {video.views === 1 ? "view" : "views"} •{" "}
            <Timeago createdAt={video.createdAt} />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-14 h-14 rounded-full overflow-hidden mt-1">
            <Image fill src={video.userId.pfp} alt="" />
          </div>
          <p className="font-medium text-lg text-primary/50">
            {video.userId.fullName}
          </p>
        </div>
        <p className="text-base line-clamp-1">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoComponent;
