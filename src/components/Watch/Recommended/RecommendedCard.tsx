import React from "react";
import Image from "next/image";
import { Video } from "../../../../typings";
import Timeago from "@/components/ui/CustomComponents/Timeago";

interface Props {
  video: Video;
}

const RecommendedCard = ({ video }: Props) => {
  return (
    <div className="flex gap-2 w-96">
      <div>
        <div className="relative w-48 h-28 rounded-lg overflow-hidden shadow-lg">
          <Image fill src={video.thumbnail} alt="" />
        </div>
      </div>
      <div className="flex mt-1">
        <div>
          <h3 className="font-semibold line-clamp-1">{video.title}</h3>
          <div className="font-normal text-xs text-gray-500 mt-1">
            <p>{video.userId.fullName}</p>
            <p>
              {video.views} {video.views === 1 ? "view" : "views"} •{" "}
              <Timeago createdAt={video.createdAt} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
