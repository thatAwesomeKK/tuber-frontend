import Image from "next/image";
import React from "react";
import Timeago from "../ui/CustomComponents/Timeago";
import { Video } from "../../../typings";

interface Props {
  video: Video;
}

const VideoComponent = ({ video }: Props) => {
  return (
    <div className="w-[24rem]">
      <div className="relative w-[23.5rem] h-56 rounded-3xl overflow-hidden shadow-xl shadow-secondary/30">
        <Image loading="lazy" fill src={video.thumbnail} alt="" />
      </div>
      <div className="flex gap-3 mt-3">
        <div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden mt-1">
            <Image fill src={video.userId.pfp} alt="" />
          </div>
        </div>
        <div className="whitespace-nowrap w-full">
          <h3 className="font-semibold">{video.title}</h3>
          <p className="font-medium text-sm text-primary/50">
            {video.userId.fullName}
          </p>
          <p className="font-medium text-sm text-primary/50">
            {video.views} {video.views === 1 ? "view" : "views"} •{" "}
            <Timeago createdAt={video.createdAt} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
