import React from "react";
import { Video } from "../../../typings";
import Image from "next/image";
import ActionButtons from "./ActionButtons";
import Link from "next/link";

interface Props {
  video: Video;
}

const VideoComponent = ({ video }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between py-4 px-2">
      <div className="flex items-center gap-3">
        <Link
          href={`/watch/${video._id}`}
          className="relative w-24 h-14 rounded-sm overflow-hidden"
        >
          <Image fill src={video.thumbnail} alt="" />
        </Link>
        <div>
          <p className="font-semibold">{video.title}</p>
          <p className="font-light text-sm">{video.description}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <ActionButtons video={video} />
      </div>
    </div>
  );
};

export default VideoComponent;
