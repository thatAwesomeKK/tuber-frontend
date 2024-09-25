import { searchVideos } from "@/lib/apiCalls/video";
import React from "react";
import { Video } from "../../../../typings";
import VideoComponent from "@/components/Search/VideoComponent";
import Link from "next/link";

interface Props {
  params: {
    s: string;
  };
}

const SearchPage = async ({ params: { s } }: Props) => {
  const videos: Video[] = await searchVideos(s);
  return (
    <main className="max-w-[90vw] mx-auto">
      <div className="flex flex-col space-y-14">
        {videos.map((video, i) => (
          <Link
            className="flex justify-center items-center"
            href={`/watch/${video._id}`}
            key={video._id}
          >
            <VideoComponent video={video} key={i} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
